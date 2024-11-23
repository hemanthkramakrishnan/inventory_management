# inventory/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import Category, Product, Tailor, Warehouse, Stock, OutgoingStock, IncomingStock, OutgoingLog


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    first_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    photo = forms.ImageField(required=False, widget=forms.FileInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'password1', 'password2', 'photo')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control'})
        self.fields['password1'].widget.attrs.update({'class': 'form-control'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control'})

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        if commit:
            user.save()
            if 'photo' in self.cleaned_data:
                user.userprofile.photo = self.cleaned_data['photo']
                user.userprofile.save()
        return user


class CategoryForm(forms.ModelForm):
    name = forms.CharField(max_length="25")
    description = forms.Textarea()

    class Meta:
        model = Category
        fields = ('name', 'description')


class ProductForm(forms.ModelForm):
    code = forms.CharField(max_length=20)
    description = forms.Textarea()
    price = forms.FloatField()
    cost = forms.FloatField()

    class Meta:
        model = Product
        fields = ('category', 'code', 'size', 'description', 'price')


class TailorForm(forms.ModelForm):
    class Meta:
        model = Tailor
        fields = ['name', 'code', 'phone', 'address']


class WarehouseForm(forms.ModelForm):
    class Meta:
        model = Warehouse
        fields = ['name', 'code', 'phone', 'location']


class StockForm(forms.ModelForm):
    class Meta:
        model = Stock
        fields = ['product', 'quantity', 'warehouse']


class OutgoingStockForm(forms.ModelForm):
    class Meta:
        model = OutgoingStock
        fields = ['product', 'quantity', 'tailor', 'warehouse', 'batch_code']


class IncomingStockForm(forms.ModelForm):
    class Meta:
        model = IncomingStock
        fields = ['outgoing_stock', 'quantity']
