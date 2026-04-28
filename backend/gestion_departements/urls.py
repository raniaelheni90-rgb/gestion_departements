from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as authtoken_views
from .views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('enseignants.urls')),
    path('api/', include('etudiants.urls')),
    path('api/', include('pfes.urls')),
    path('api/', include('academique.urls')),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('api-auth/', include('rest_framework.urls')),
]
