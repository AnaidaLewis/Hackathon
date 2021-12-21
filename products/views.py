from django.shortcuts import render
from rest_framework import (mixins, generics, status, permissions)
from rest_framework.views import APIView
from django.http.response import Http404, HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated
from products.serializers import ProductSerializer, AddressSerializer
from .models import Product,Address
from django.contrib.auth import get_user_model
from .models import Product,Address,Cart,CartItem
from .serializers import CartSerializer,CartItemSerializer,DisplayCartItemSerializer,SellerAllOrdersViewSerializer,ResetProductsOrderedSerializer,ProductInCartSerializer

#for most common in set
from collections import Counter

# Create your views here.



User = get_user_model()

#GET ALL PRODUCTS
class AllProducts(generics.ListAPIView):
    serializer_class = ProductSerializer
    def list(self,request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many = True)
        return JsonResponse(serializer.data,safe = False, status = status.HTTP_200_OK)







#PRODUCTS ***********************************************************************
class ProductList(APIView):
    
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    # when pk == 0 then u get all the items and pk == any other number then individual item
    def get(self,request,pk):
        user = User.objects.get(email = request.user)
        # try:
        if Product.objects.filter(user = user.id).exists():
            try:
	            address = Address.objects.get(user = user.id)
            except Address.DoesNotExist:
                content = {'detail': 'Address not created, First create address then add Products'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
            if pk == 0:
                product = Product.objects.filter(user = user.id)
                serializer = ProductSerializer(product, many=True)
                return JsonResponse(serializer.data, safe=False, status = status.HTTP_200_OK)
            else:
                product = Product.objects.get(id = pk)
                serializer = ProductSerializer(product, many=False)
                return JsonResponse(serializer.data, status = status.HTTP_200_OK)
        content = {'detail': 'No products created'}
        return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)


    def post(self,request,pk):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created, First create address then add Products'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        product_user = Product(user = user)
        serializer = ProductSerializer(product_user,data=request.data)
        if serializer.is_valid():
            user_product = serializer.save()
            # user_product.published = True
            user_product.save()
            return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
        return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



    def put(self, request,pk):
        user = User.objects.get(email = request.user)
        try:
	        product = Product.objects.get(id = pk)
        except Product.DoesNotExist:
            content = {'detail': 'No such product available, which is created by this seller','message':'remember to pass pk'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        # if product.published:
        #     content = {'detail': 'Once published NO changes can be made in Product'}
        #     return JsonResponse(content, status = status.HTTP_400_BAD_REQUEST)
        serializer = ProductSerializer(instance = product, data=request.data, partial = True)
        if serializer.is_valid():
            user_product = serializer.save()
            # user_product.published = True
            user_product.save()
            return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
        return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, pk):
        user = User.objects.get(email = request.user)
        try:
	        product = Product.objects.get(id = pk)
        except Product.DoesNotExist:
            content = {'detail': 'No such product available, which is created by this seller','message':'remember to pass pk'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        # if product.published:
        #     content = {'detail': 'Once published Product cannot be deleted'}
        #     return JsonResponse(content, status = status.HTTP_400_BAD_REQUEST)
        product.delete()
        return JsonResponse({'Response': 'Product succsesfully delete!'},status = status.HTTP_200_OK)










#ADDRESS************************************************************************************************
class AddressList(APIView):
    
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        serializer = AddressSerializer(address, many=False)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK)
        

    def post(self,request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            address_user = Address(user = user)
            serializer = AddressSerializer(address_user,data=request.data)
            if serializer.is_valid():
                user_address = serializer.save()
                return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
            return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        content = {'detail': 'Address already created'}
        return JsonResponse(content, status = status.HTTP_200_OK)


    def put(self, request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)

        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        serializer = AddressSerializer(instance = address, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
        return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        address.delete()
        return JsonResponse({'Response': 'Address succsesfully delete!'},status = status.HTTP_200_OK)












# BUYER POV********************************************************************
class BuyerCart(APIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request,pk):
        user = User.objects.get(email = request.user)
        # try:
        try:
            address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created, First create address then create cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            user_cart = Cart(user = user)
            serializer = CartSerializer(user_cart,data=request.data)
            if serializer.is_valid():
                created_cart = serializer.save()
                content = {'detail': 'User does not have a cart hence new cart created', 'New Cart':serializer.data}
                return JsonResponse(content, status = status.HTTP_202_ACCEPTED)
            return JsonResponse('new cart not created', status = status.HTTP_404_NOT_FOUND)
        all_cart_items = CartItem.objects.filter(cart = cart.id, fixed = False)
        displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)
        return JsonResponse({'Cart':user.email, 'cartItems':displaySerializer.data}, status = status.HTTP_200_OK )
            

    # 'message':'dont forget to pass qty'
    def post(self,request,pk): #send the pk of the product you want to add
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            user_cart = Cart(user = user)
            serializer = CartSerializer(user_cart,data=request.data)
            if serializer.is_valid():
                created_cart = serializer.save()
                content = {'detail': 'User does not have a cart hence new cart created', 'New Cart':serializer.data}
                return JsonResponse(content, status = status.HTTP_202_ACCEPTED)
            return JsonResponse('new cart not created', status = status.HTTP_404_NOT_FOUND)
        try:
            item = Product.objects.get(id = pk)
        except Product.DoesNotExist:
            content = {'detail': 'No such product Available'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            is_item_in_cart = CartItem.objects.get(cart = cart, item = item, fixed = False)
        except CartItem.DoesNotExist:
            if item.total_stock == 0:
                content = {'Sorry': 'No more items left in Stock'}
                return JsonResponse(content, status = status.HTTP_204_NO_CONTENT)
            cart_item = CartItem(cart = cart, item = item, price = item.price)
            serializer = CartItemSerializer(cart_item,data=request.data)
            if serializer.is_valid(raise_exception=True):
                cart_item_saved = serializer.save()
                cart.totalCartItem += 1
                cart.save()
                product = Product.objects.get(id = pk)
                print(serializer.data)
                # product.products_ordered += serializer.data['qty']
                product.total_stock -= serializer.data['qty']
                product.save() 
                return JsonResponse({'Message': 'Item added to cart'}, status = status.HTTP_200_OK )
            return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)       
        content = {'detail': 'This item is already added to cart, to update item quantity go to PUT','message':'dont forget to pass qty'}
        return JsonResponse(content, status = status.HTTP_405_METHOD_NOT_ALLOWED)


    def put(self, request,pk):
        user = User.objects.get(email = request.user)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            content = {'detail': 'User does not have a cart hence create new cart in POST'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart_item = CartItem.objects.get(cart = cart, item = pk, fixed = False)
        except CartItem.DoesNotExist:
            content = {'detail': 'No such item added to this cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        if not cart_item.fixed :
            product = Product.objects.get(id = pk)
            serializer = CartItemSerializer(instance = cart_item, data=request.data, partial = True)
            if serializer.is_valid():
                # product.products_ordered -= cart_item.qty
                product.total_stock += cart_item.qty
                product.save()
                serializer.save()
                # product.products_ordered += cart_item.qty
                product.total_stock -= cart_item.qty
                product.save()
                return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
            content = {'detail': 'Serializer not valid'}
            return JsonResponse(content, status = status.HTTP_400_BAD_REQUEST)
        return JsonResponse({'Response': 'Order Placed cannot be editted '},status = status.HTTP_503_SERVICE_UNAVAILABLE)
    

    def delete(self, request, pk):
        user = User.objects.get(email = request.user)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            content = {'detail': 'User does not have a cart hence create new cart in POST'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart_item = CartItem.objects.get(cart = cart, item = pk, fixed = False)
        except CartItem.DoesNotExist:
            content = {'detail': 'No such item added to this cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        if not cart_item.fixed :
            cart.totalCartItem -= 1
            cart.save()
            product = Product.objects.get(id = cart_item.item.id)
            # product.products_ordered -= cart_item.qty
            product.total_stock += cart_item.qty
            product.save() 
            cart_item.delete()
            return JsonResponse({'Response': 'Item Successfully deleted from Cart'},status = status.HTTP_200_OK)
        return JsonResponse({'Response': 'Order Placed cannot be editted '},status = status.HTTP_503_SERVICE_UNAVAILABLE)









#BUYER HISTORY*********************************************************
class BuyerHistory(APIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = User.objects.get(email = request.user)
        # try:
        try:
            address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created, First create address then create cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            user_cart = Cart(user = user)
            serializer = CartSerializer(user_cart,data=request.data)
            if serializer.is_valid():
                created_cart = serializer.save()
                content = {'detail': 'User does not have a cart hence new cart created', 'New Cart':serializer.data}
                return JsonResponse(content, status = status.HTTP_202_ACCEPTED)
            return JsonResponse('new cart not created', status = status.HTTP_404_NOT_FOUND)
        all_cart_items = CartItem.objects.filter(cart = cart.id, fixed = True)
        displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)
        # ************************************
        data = []
        for i in range(len(displaySerializer.data)):
            products = Product.objects.get(id = displaySerializer.data[i]['item']) #getting all products
            productSerializer = ProductSerializer(products, many = False)
            perUserInfo = {}
            perUserInfo['ProductInCart'] = productSerializer.data
            data.append(perUserInfo)
        productListSerializer = ProductInCartSerializer(data, many = True)
        # ************************************

        return JsonResponse({'Cart':user.email, 'cartItems':displaySerializer.data, 'Products':productListSerializer.data}, status = status.HTTP_200_OK )

        







#BUYER CONFIRM ORDER*****************************************************************
class PlaceOrder(APIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(email = request.user)
        try:
            address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created, First create address then create cart then place order'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            content = {'detail': 'No items Added to cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        
        all_cart_items = CartItem.objects.filter(cart = cart.id, fixed = False)
        displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)
        manufactures = []
        print(len(displaySerializer.data))
        cart.final_price = 0 #so that we dont keep adding up the price of already added items
        cart.save()
        if len(displaySerializer.data) > 0:
            
            cart.final_price = 0 #so that we dont keep adding up the price of already added items
            cart.save()

            data = []

            for i in range(len(displaySerializer.data)):
                products = Product.objects.get(id = displaySerializer.data[i]['item']) #getting all products
                # print(products.user)
                product_owner = User.objects.get(email = products.user) #getting all the owners of the product
                manufactures.append(product_owner.id) #appending in manufacturers
                print(products)
                cart_item = CartItem.objects.get(item = products,cart = cart,fixed = False)
                if products.products_ordered > products.min_order:
                    cart_item.wholesale_price = True
                    cart_item.price = products.wholesale_price #DISCOUNT1
                    cart_item.save()
                
                cart.final_price += cart_item.price*cart_item.qty
                cart.save()


                # ***************************
                productSerializer = ProductSerializer(products, many = False)
                perUserInfo = {}
                perUserInfo['ProductInCart'] = productSerializer.data
                data.append(perUserInfo)
                # **************************
                # ifPlaceOrder = products.products_ordered + cart_item.qty #
                # if ifPlaceOrder > products.min_order:
                #     message = {'message': 'If you place you order for this item you will get it at wholesale price'}
                #     displaySerializer.data[i]['message'] = message
            print(manufactures) 
            c = Counter(manufactures)
            print(c)
            print(c.most_common(1)[0])
            maxNumofItemsFromSameManufacturer = c.most_common(1)[0][1]
            #give discount if more than half products are from same manufacturer
            if maxNumofItemsFromSameManufacturer > cart.totalCartItem/2:
                cart.manufacturer_name = User.objects.get(id = c.most_common(1)[0][0]).email
                cart.totalCartItemFromSameManufacturer = maxNumofItemsFromSameManufacturer
                cart.final_price -= maxNumofItemsFromSameManufacturer*2 #DISCOUNT2
                cart.save()
            displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)

            # ***************************
            # print(displaySerializer.data)
            productListSerializer = ProductInCartSerializer(data, many = True)
            # ***************************
            return JsonResponse({'Cart':user.email, 'cartItems':displaySerializer.data, 'total Price':cart.final_price, 'tax Price': cart.taxPrice, 'Products':productListSerializer.data}, status = status.HTTP_200_OK )
        content = {'detail': 'No new items Added to cart'}
        return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)



    def post(self, request):
        user = User.objects.get(email = request.user)
        try:
            address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created, First create address then create cart then place order'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        try:
            cart = Cart.objects.get(user = user.id)
        except Cart.DoesNotExist:
            content = {'detail': 'No items Added to cart'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        
        all_cart_items = CartItem.objects.filter(cart = cart.id, fixed = False)
        displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)
        manufactures = []
        print(len(displaySerializer.data))
        if len(displaySerializer.data) > 0:
            cart.final_price = 0 #so that we dont keep adding up the price of already added items
            for i in range(len(displaySerializer.data)):
                products = Product.objects.get(id = displaySerializer.data[i]['item']) #getting all products
                print(products.user)
                product_owner = User.objects.get(email = products.user) #getting all the owners of the product
                manufactures.append(product_owner.id) #appending in manufacturers
                print(products)
                cart_item = CartItem.objects.get(item = products, cart = cart, fixed = False)
                products.products_ordered += cart_item.qty
                products.save()
                if products.products_ordered > products.min_order:
                    cart_item.wholesale_price = True
                    cart_item.price = products.wholesale_price
                    cart_item.save()
                cart_item.fixed = True
                cart_item.save()
                cart.final_price += cart_item.price*cart_item.qty
                cart.save()
            (manufactures)
            c = Counter(manufactures)
            print(c)
            print(c.most_common(1)[0])
            maxNumofItemsFromSameManufacturer = c.most_common(1)[0][1]
            #give discount if more than half products are from same manufacturer
            if maxNumofItemsFromSameManufacturer > cart.totalCartItem/2:
                cart.manufacturer_name = User.objects.get(id = c.most_common(1)[0][0]).email
                cart.totalCartItemFromSameManufacturer = maxNumofItemsFromSameManufacturer
                cart.final_price -= maxNumofItemsFromSameManufacturer*2
                cart.save()
            displayItemSerializer = DisplayCartItemSerializer(all_cart_items, many = True)
            return JsonResponse({'Cart':user.email, 'cartItems':displayItemSerializer.data, 'total Price':cart.final_price, 'tax Price': cart.taxPrice}, status = status.HTTP_200_OK )
        content = {'detail': 'No new items Added to cart'}
        return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)








#SELLER****************************************************************************************
class SellerViewOrder(APIView):
    serializer_class = DisplayCartItemSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = User.objects.get(email = request.user)
        try:
	        product = Product.objects.get(id = pk)
        except Product.DoesNotExist:
            content = {'detail': 'No such product available, which is created by this seller','message':'remember to pass pk'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        if CartItem.objects.filter(item = product, fixed = True).exists():
            all_cart_items = CartItem.objects.filter(item = product, fixed = True)
            displaySerializer = DisplayCartItemSerializer(all_cart_items, many = True)
            if product.products_ordered > product.min_order:
                    wholesale_price = True
            wholesale_price = False
            data = []
            totalAggregateQuantity = 0
            totalAggregatePrice = 0
            for i in range(len(displaySerializer.data)):
                totalAggregateQuantity += int(displaySerializer.data[i]['qty'])
                user_cart = Cart.objects.get(id = displaySerializer.data[i]['cart'])
                item_price_same_manufacturer = float(displaySerializer.data[i]['price'])
                if user_cart.manufacturer_name == user.email:
                    item_price_same_manufacturer -= 2
                
                userCartSerializer = CartSerializer(user_cart, many = False)
                userAddress = Address.objects.get(user = user_cart.user)
                userAddressSerializer = AddressSerializer(userAddress, many = False)
                
                perUserInfo = {}
                totalAggregatePrice += item_price_same_manufacturer*int(displaySerializer.data[i]['qty'])
                perUserInfo['Quantity'] = displaySerializer.data[i]['qty']
                perUserInfo['Address'] = userAddressSerializer.data
                perUserInfo['Cart'] = userCartSerializer.data
                perUserInfo['finalPrice'] = displaySerializer.data[i]['price']
                data.append(perUserInfo)

            
            productSerializer = ProductSerializer(product, many = False)
            

            SellerAllOrdersView = SellerAllOrdersViewSerializer(data, many = True)           
            return JsonResponse({'Wholesale Price': wholesale_price ,
                                'totalAggregateQuantity':totalAggregateQuantity,
                                'totalAggregatePrice':totalAggregatePrice, 
                                'Buyer':SellerAllOrdersView.data,
                                'Product':productSerializer.data,
                                'message': 'serilaizer data with only address and quantity per order'}, status = status.HTTP_200_OK)
        content = {'detail': 'No new items ordered for this product'}
        return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
       
    def post(self, request, pk):
        user = User.objects.get(email = request.user)
        serializer = ResetProductsOrderedSerializer(data = request.data)
        if serializer.is_valid():
            totalAggregateQuantity = serializer.data['totalAggregateQuantity']
            try:
                product = Product.objects.get(id = pk)
            except Product.DoesNotExist:
                content = {'detail': 'No such product available, which is created by this seller','message':'remember to pass pk'}
                return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
            print(product.products_ordered)
            product.products_ordered -= int(totalAggregateQuantity)
            product.save()
            serializerProduct = ProductSerializer(product)
            return JsonResponse(serializerProduct.data, status = status.HTTP_202_ACCEPTED)