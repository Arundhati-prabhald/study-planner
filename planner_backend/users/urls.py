from django.urls import path
from .views import (
    register_api,
    dashboard_api,
    add_subject,
    generate_plan,
    delete_subject
)

urlpatterns = [
    path('register/', register_api),
    path('dashboard/', dashboard_api),
    path('add-subject/', add_subject),
    path('generate-plan/', generate_plan),
    path('delete-subject/<int:subject_id>/', delete_subject),
]
