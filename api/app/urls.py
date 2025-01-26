from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/tasks/', views.TaskList.as_view(), name='tasks'),
    path('api/tasks/<int:id>/', views.TaskDetail.as_view(), name='update'),
    path('api/user/register/', views.CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
]