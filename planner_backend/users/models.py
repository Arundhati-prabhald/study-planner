from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any additional profile fields if needed

class Subject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    syllabus_size = models.IntegerField()  # e.g., number of topics or pages
    exam_date = models.DateField()
    priority = models.IntegerField(choices=[(1, 'Low'), (2, 'Medium'), (3, 'High')])
    difficulty = models.IntegerField(choices=[(1, 'Easy'), (2, 'Medium'), (3, 'Hard')])

class StudyPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    daily_study_hours = models.FloatField()
    study_style = models.CharField(max_length=20, choices=[('continuous', 'Continuous'), ('mixed', 'Mixed')])
    max_focus_time = models.FloatField()  # in hours
    study_start_time = models.TimeField(default='09:00:00')  # Store the start time
    created_at = models.DateTimeField(default=timezone.now)
    plan_data = models.JSONField()  # Store the generated plan as JSON
