# inventory/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import SignUpForm
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Category, Product, Tailor, Warehouse, Stock, OutgoingStock, IncomingStock, OutgoingLog
from .forms import CategoryForm, ProductForm, TailorForm, WarehouseForm, StockForm, OutgoingStockForm, IncomingStockForm


def home(request):
    return render(request, 'inventory/home.html')


def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'inventory/signup.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'inventory/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('home')


def category_list(request):
    categories = Category.objects.all()
    return render(request, 'inventory/category_list.html', {'categories': categories})


@login_required
def category_add(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('category_list')
    else:
        form = CategoryForm()
    return render(request, 'inventory/category_form.html', {'form': form})


def category_edit(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        form = CategoryForm(request.POST, instance=category)
        if form.is_valid():
            form.save()
            return redirect('category_list')
    else:
        form = CategoryForm(instance=category)
    return render(request, 'inventory/category_form.html', {'form': form})


def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        category.delete()
        return redirect('category_list')
    return render(request, 'inventory/category_confirm_delete.html', {'category': category})


def product_list(request):
    products = Product.objects.all()
    return render(request, 'inventory/product_list.html', {'products': products})


def product_add(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm()
    return render(request, 'inventory/product_form.html', {'form': form})


def product_edit(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        form = ProductForm(instance=product)
    return render(request, 'inventory/product_form.html', {'form': form})


def product_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        product.delete()
        return redirect('product_list')
    return render(request, 'inventory/product_confirm_delete.html', {'product': product})


def tailor_list(request):
    tailors = Tailor.objects.all()
    return render(request, 'inventory/tailor_list.html', {'tailors': tailors})


def tailor_add(request):
    if request.method == 'POST':
        form = TailorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('tailor_list')
    else:
        form = TailorForm()
    return render(request, 'inventory/tailor_form.html', {'form': form})


def tailor_edit(request, pk):
    tailor = get_object_or_404(Tailor, pk=pk)
    if request.method == 'POST':
        form = TailorForm(request.POST, instance=tailor)
        if form.is_valid():
            form.save()
            return redirect('Tailor_list')
    else:
        form = TailorForm(instance=tailor)
    return render(request, 'inventory/tailor_form.html', {'form': form})


def tailor_delete(request, pk):
    tailor = get_object_or_404(Tailor, pk=pk)
    if request.method == 'POST':
        tailor.delete()
        return redirect('tailor_list')
    return render(request, 'inventory/tailor_confirm_delete.html', {'tailor': tailor})


def warehouse_list(request):
    warehouses = Warehouse.objects.all()
    return render(request, 'inventory/warehouse_list.html', {'warehouses': warehouses})


def warehouse_add(request):
    if request.method == 'POST':
        form = WarehouseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('warehouse_list')
    else:
        form = WarehouseForm()
    return render(request, 'inventory/warehouse_form.html', {'form': form})


def warehouse_edit(request, pk):
    warehouse = get_object_or_404(Warehouse, pk=pk)
    if request.method == 'POST':
        form = WarehouseForm(request.POST, instance=warehouse)
        if form.is_valid():
            form.save()
            return redirect('warehouse_list')
    else:
        form = WarehouseForm(instance=warehouse)
    return render(request, 'inventory/warehouse_form.html', {'form': form})


def warehouse_delete(request, pk):
    warehouse = get_object_or_404(Warehouse, pk=pk)
    if request.method == 'POST':
        warehouse.delete()
        return redirect('warehouse_list')
    return render(request, 'inventory/warehouse_confirm_delete.html', {'warehouse': warehouse})


def stock_list(request):
    stocks = Stock.objects.all()
    return render(request, 'inventory/stock_list.html', {'stocks': stocks})


def stock_add(request):
    if request.method == 'POST':
        form = StockForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('stock_list')
    else:
        form = StockForm()
    return render(request, 'inventory/stock_form.html', {'form': form})


def stock_edit(request, pk):
    stock = get_object_or_404(Stock, pk=pk)
    if request.method == 'POST':
        form = StockForm(request.POST, instance=stock)
        if form.is_valid():
            form.save()
            return redirect('stock_list')
    else:
        form = StockForm(instance=stock)
    return render(request, 'inventory/stock_form.html', {'form': form})


def stock_delete(request, pk):
    stock = get_object_or_404(Stock, pk=pk)
    if request.method == 'POST':
        stock.delete()
        return redirect('stock_list')
    return render(request, 'inventory/stock_confirm_delete.html', {'stock': stock})


@login_required
def outgoing_stock_list(request):
    selected_tailor = request.GET.get('tailor')
    if selected_tailor:
        stocks = OutgoingStock.objects.filter(tailor_id=selected_tailor)
    else:
        stocks = OutgoingStock.objects.all()
    tailors = Tailor.objects.all()
    context = {
        'stocks': stocks,
        'tailors': tailors,
        'selected_tailor': selected_tailor,
    }
    return render(request, 'inventory/outgoing_stock_list.html', context)


@login_required
def outgoing_stock_add(request):
    if request.method == 'POST':
        form = OutgoingStockForm(request.POST)
        if form.is_valid():
            outgoing_stock = form.save(commit=False)
            outgoing_stock.save()  # This will trigger the generation of batch_code
            print(outgoing_stock)

            # Create a log entry
            OutgoingLog.objects.create(
                product=outgoing_stock.product,
                quantity=outgoing_stock.quantity,
                tailor=outgoing_stock.tailor,
                warehouse=outgoing_stock.warehouse,
                date_created=outgoing_stock.date_created,
                batch_code=outgoing_stock.batch_code
            )

            return redirect('outgoing_stock_list')
    else:
        form = OutgoingStockForm()
    return render(request, 'inventory/outgoing_stock_form.html', {'form': form})


def outgoing_stock_edit(request, pk):
    outgoing_stock = get_object_or_404(OutgoingStock, pk=pk)
    if request.method == 'POST':
        form = OutgoingStockForm(request.POST, instance=outgoing_stock)
        if form.is_valid():
            form.save()
            return redirect('outgoing_stock_list')
    else:
        form = OutgoingStockForm(instance=outgoing_stock)
    return render(request, 'inventory/outgoing_stock_form.html', {'form': form})


def outgoing_stock_delete(request, pk):
    outgoing_stock = get_object_or_404(OutgoingStock, pk=pk)
    if request.method == 'POST':
        outgoing_stock.delete()
        return redirect('outgoing_stock_list')
    return render(request, 'inventory/outgoing_stock_confirm_delete.html', {'outgoing_stock': outgoing_stock})


@login_required
def incoming_stock_add(request):
    if request.method == 'POST':
        form = IncomingStockForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect('incoming_stock_log')
    else:
        form = IncomingStockForm()

    stocks = OutgoingStock.objects.all()

    return render(request, 'inventory/incoming_stock_form.html', {'form': form, 'stocks': stocks})


@login_required
def incoming_stock_log(request):
    logs = IncomingStock.objects.all()
    return render(request, 'inventory/incoming_stock_log.html', {'logs': logs})


@login_required
def outgoing_stock_log(request):
    logs = OutgoingLog.objects.all()
    return render(request, 'inventory/outgoing_stock_log.html', {'logs': logs})
