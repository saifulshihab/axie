from django.urls import path
from . import views
from graphene_django.views import GraphQLView
from myapp.schema import schema

urlpatterns = [
    path('', views.index, name="index"),    
    path('graphql', GraphQLView.as_view(graphiql=True, schema=schema))
]