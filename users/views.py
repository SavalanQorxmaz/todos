from rest_framework import generics, status,views, permissions,viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer,LogoutSerializer



class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

class LoginAPIView(generics.GenericAPIView):
    permission_classes = (AllowAny, )
    serializer_class = LoginSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        print(request.headers)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'data': 'success'},status=status.HTTP_204_NO_CONTENT)