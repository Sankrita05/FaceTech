import os
import cv2
import numpy as np
from django.conf import settings
from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage
from fer import FER
from PIL import Image
import io
from .utils import detect_emotion



class VideoFaceDetectionAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        video_file = request.FILES.get('video')
        if not video_file:
            return Response({"error": "No video uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        # Save uploaded video temporarily
        video_path = default_storage.save('temp/input_video.mp4', video_file)
        input_path = os.path.join(settings.MEDIA_ROOT, video_path)
        output_path = os.path.join(settings.MEDIA_ROOT, 'temp/output_video.mp4')

        # Load Haar cascade
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Open video
        cap = cv2.VideoCapture(input_path)
        fourcc = cv2.VideoWriter_fourcc(*'avc1')  # Use 'mp4v' for .mp4 files
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)

            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            out.write(frame)

        cap.release()
        out.release()

        return FileResponse(open(output_path, 'rb'), content_type='video/mp4')


class ExpressionDetectionView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'error': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert image to OpenCV format
            image_bytes = image_file.read()
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            open_cv_image = np.array(image)
            open_cv_image = open_cv_image[:, :, ::-1].copy()

            # Detect emotion
            detector = FER(mtcnn=True)
            results = detector.detect_emotions(open_cv_image)

            if results:
                top_emotion = max(results[0]['emotions'], key=results[0]['emotions'].get)
                return Response({'expression': top_emotion}, status=status.HTTP_200_OK)
            else:
                return Response({'expression': 'No face detected'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


