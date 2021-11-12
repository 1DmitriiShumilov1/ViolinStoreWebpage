if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready() {
    var removeCartItemButton = document.getElementsByClassName('btn-remove');
    for (var i = 0; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
    var addToCartButtons = document.getElementsByClassName('button-purchase')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add ('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('product-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in the cart')
            return
        }
    }
    var cartRowContenets = 
        `<td>
        <div class="cart-info">
            <img src="${imageSrc}">
            <div class="name-and-price">
                <p class="product-name">${title}</p>
                <small class="cart-price">Price: ${price}</small>
                <br>
                <button class="btn-remove">Remove</button>
            </div>
        </div>
        </td>
        <td class="input-number"><input class="cart-quantity-input" type="number" value="1"><td>`
    cartRow.innerHTML = cartRowContenets
    cartItems.appendChild(cartRow)
    updateCartTotal()
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes){
        cartItems.removeChild(cartItems.firstChild)
        updateCartTotal()
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('js-item-name')[0].innerText
    var price = shopItem.getElementsByClassName('store-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('store-item-image')[0].src
    addItemToCart(title, price, imageSrc)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Price: $', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('purchase-total')[0].innerText = '$' + total
}

