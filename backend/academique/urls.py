from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartementViewSet, LicenceViewSet, SpecialiteViewSet, ModuleViewSet

router = DefaultRouter()
router.register(r'departements', DepartementViewSet)
router.register(r'licences', LicenceViewSet)
router.register(r'specialites', SpecialiteViewSet)
router.register(r'modules', ModuleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
