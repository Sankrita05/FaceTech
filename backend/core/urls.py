from django.urls import path
from .views import VideoFaceDetectionAPIView, ExpressionDetectionView


urlpatterns = [
    path('face-detection/', VideoFaceDetectionAPIView.as_view(), name='video-face-detection'),
    # path('emotion-detection/', EmotionDetectionView.as_view(), name='emotion-detection'),
    path('emotion-detection/', ExpressionDetectionView.as_view(), name='expression-detection'),
]