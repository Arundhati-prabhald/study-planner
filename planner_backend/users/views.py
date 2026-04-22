from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Subject, StudyPlan
from datetime import date, time
import json

@api_view(['POST'])
def register_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password
    )

    return Response({'message': 'User registered successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_api(request):
    user = request.user
    subjects = Subject.objects.filter(user=user).values()
    study_plan = StudyPlan.objects.filter(user=user).last()
    plan_data = study_plan.plan_data if study_plan else None
    return Response({
        "subjects": list(subjects),
        "study_plan": plan_data
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_subject(request):
    user = request.user
    data = request.data
    subject = Subject.objects.create(
        user=user,
        name=data['name'],
        syllabus_size=data['syllabus_size'],
        exam_date=data['exam_date'],
        priority=data['priority'],
        difficulty=data['difficulty']
    )
    return Response({'message': 'Subject added successfully'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_subject(request, subject_id):
    try:
        subject = Subject.objects.get(id=subject_id, user=request.user)
        subject.delete()
        return Response({'message': 'Subject deleted successfully'})
    except Subject.DoesNotExist:
        return Response({'error': 'Subject not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_plan(request):
    user = request.user
    data = request.data
    daily_hours = float(data['daily_study_hours'])
    study_style = data['study_style']
    max_focus_time = float(data['max_focus_time'])
    study_start_time = data.get('study_start_time', '09:00')

    # Parse start time
    start_hour, start_minute = map(int, study_start_time.split(':'))
    start_time_decimal = start_hour + start_minute / 60.0

    subjects = Subject.objects.filter(user=user)
    if not subjects:
        return Response({'error': 'No subjects found'}, status=400)

    # Calculate weights
    total_weight = 0
    subject_weights = []
    today = date.today()
    for subj in subjects:
        days_to_exam = (subj.exam_date - today).days
        urgency = max(1, 30 - days_to_exam)  # Simple urgency calculation
        weight = (subj.priority * 1) + (subj.difficulty * 1) + (urgency * 1)  # P, D, U factors assumed 1
        subject_weights.append({
            'subject': subj,
            'weight': weight,
            'allocated_time': 0
        })
        total_weight += weight

    # Allocate time
    for sw in subject_weights:
        sw['allocated_time'] = (sw['weight'] / total_weight) * daily_hours

    # Structure sessions
    plan = []
    if study_style == 'continuous':
        # One subject per block, block <= max_focus_time
        for sw in subject_weights:
            time_left = sw['allocated_time']
            while time_left > 0:
                block_time = min(time_left, max_focus_time)
                plan.append({
                    'subject': sw['subject'].name,
                    'duration': block_time,
                    'start_time': None  # Will set later
                })
                time_left -= block_time
    else:  # mixed
        # Rotate subjects in blocks
        block_time = max_focus_time
        num_sessions = int(daily_hours / block_time)
        session_time = daily_hours / num_sessions if num_sessions > 0 else daily_hours
        for i in range(num_sessions):
            for sw in subject_weights:
                if sw['allocated_time'] > 0:
                    alloc = min(sw['allocated_time'], session_time / len(subject_weights))
                    plan.append({
                        'subject': sw['subject'].name,
                        'duration': alloc,
                        'start_time': None
                    })
                    sw['allocated_time'] -= alloc

    # Simple scheduling: start at user-specified time, add breaks
    current_time = start_time_decimal
    scheduled_plan = []
    for session in plan:
        start_hour = int(current_time)
        start_min = int((current_time - start_hour) * 60)
        end_time = current_time + session['duration']
        end_hour = int(end_time)
        end_min = int((end_time - end_hour) * 60)
        scheduled_plan.append({
            'subject': session['subject'],
            'time': f"{start_hour:02d}:{start_min:02d} - {end_hour:02d}:{end_min:02d}"
        })
        current_time = end_time + 0.25  # 15 min break

    # Save plan
    study_plan = StudyPlan.objects.create(
        user=user,
        daily_study_hours=daily_hours,
        study_style=study_style,
        max_focus_time=max_focus_time,
        study_start_time=time(start_hour, start_minute),
        plan_data=scheduled_plan
    )

    return Response({'plan': scheduled_plan})