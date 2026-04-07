from rest_framework.routers import DefaultRouter
from .views import PFEViewSet, JuryViewSet

router = DefaultRouter()
router.register(r'pfes', PFEViewSet, basename='pfe')
router.register(r'jurys', JuryViewSet, basename='jury')

urlpatterns = router.urls
