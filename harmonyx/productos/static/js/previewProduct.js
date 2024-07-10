// Método para abrir el preview product al presionar el producto seleccionado
document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos los elementos del preview product
    const openPreviewProducts = document.querySelectorAll('.openPreviewProduct');
    const previewProductModal = document.getElementById('previewProductModal');
    const previewProductBackdrop = document.getElementById('previewProductBackdrop')

    const previewNombreProducto = document.getElementById('previewNombreProducto');
    const previewAlbumProducto = document.getElementById('previewAlbumProducto');
    const previewPrecioProducto = document.getElementById('previewPrecioProducto');
    const previewImageProducto = document.getElementById('previewImageProducto');

    const inputQuantityProductValue = document.getElementById('inputQuantityProductValue');
    const buttonDecreaseAmountProduct = document.getElementById('buttonDecreaseAmountProduct');
    const buttonIncreaseAmountProduct = document.getElementById('buttonIncreaseAmountProduct');
    const buttonAddToCart = document.getElementById('buttonAddToCart');

    // Obtenemos los elementos del carrito de compras
    const shoppingCartPanel = document.getElementById('shopping-cart-panel');
    const shoppingCartBackdrop = document.getElementById('shoppingCartBackdrop')
    const closeCartButton = document.getElementById('close-cart-button');
    const btnOpenShoppingCart = document.getElementById('btnOpenShoppingCart');
    const btncloseshoppingcart = document.getElementById('btncloseshoppingcart');
    const btnclosePreviewProduct = document.getElementById('closePreviewProduct');
    const btnPayNow = document.getElementById('btnPayNow');

    let unitPrice = 0;
    let subTotalPagar = 0;
    let isAddingProduct = false;

    // Función para abrir el modal y actualizar su contenido
    function openPreviewModel(event) {
        isAddingProduct = false;
        const product = event.currentTarget;
        const nombre = product.getAttribute('data-nombre');
        const album = product.getAttribute('data-album');
        const precioRaw = product.getAttribute('data-precio');
        const imagen = product.getAttribute('data-imagen');

        //Convertimos el precio a entero
        unitPrice = precioRaw.replace(/[$.]/g, '');

        // Actualizar el contenido del modal
        previewNombreProducto.textContent = nombre;
        previewAlbumProducto.textContent = album;
        previewPrecioProducto.textContent = "Valor: $" + convertPrice(unitPrice) + " CLP"
        previewImageProducto.setAttribute('src', imagen);

        // Mostrar el modal con animación
        previewProductModal.classList.remove('hidden');
        setTimeout(() => {
            previewProductModal.classList.add('show');
        }, 10);
    }

    // Función para cerrar el modal
    function closePreviewModel() {
        previewProductModal.classList.remove('show');
        setTimeout(() => {
            previewProductModal.classList.add('hidden');
            inputQuantityProductValue.value = 1;
            if (isAddingProduct) {
                return openShoppingCart();
            }
        }, 250);

    }

    // Función para cerrar el preview modal, si se presiona fuera del mismo
    function handleBackdropPreviewProductClick(event) {
        // Aquí obtenemos todos los estilos puestos del coso este del previewModal
        const allStylePreviewModal = window.getComputedStyle(previewProductModal);
        if (event.target === previewProductBackdrop && allStylePreviewModal.opacity === '1') {
            closePreviewModel();
        }
    }
    previewProductBackdrop.addEventListener('click', handleBackdropPreviewProductClick);

    // Función para convertir el precio a string con puntos de separación
    function convertPrice(precio) {
        const formattedPrice = precio.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1.');
        return formattedPrice
    }

    // Función para incrementar la cantidad de productos
    buttonIncreaseAmountProduct.addEventListener('click', function () {
        inputQuantityProductValue.value = parseInt(inputQuantityProductValue.value) + 1;
        updatePrice();
    });

    // Función para disminuir la cantidad de productos
    buttonDecreaseAmountProduct.addEventListener('click', function () {
        const currentValue = parseInt(inputQuantityProductValue.value);
        if (currentValue > 1) {
            inputQuantityProductValue.value = currentValue - 1;
            updatePrice();
        }
    });

    // Función para actualizar el precio
    function updatePrice() {
        const quantity = parseInt(inputQuantityProductValue.value);
        const totalPrice = unitPrice * quantity;
        previewPrecioProducto.textContent = "Valor: $" + convertPrice(totalPrice) + " CLP";
    }

    // Función para agregar al carrito
    buttonAddToCart.addEventListener('click', function () {
        const nombreProducto = previewNombreProducto.textContent;
        const cantidad = inputQuantityProductValue.value;
        const nombreImg = previewImageProducto.getAttribute('src');
        const nombreAlbum = previewAlbumProducto.textContent;

        // Crear elementos HTML para el nuevo producto
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'py-6');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('h-24', 'w-24', 'flex-shrink-0', 'overflow-hidden', 'rounded-md');
        const image = document.createElement('img');
        image.setAttribute('src', nombreImg);
        image.setAttribute('alt', nombreAlbum);
        image.classList.add('h-full', 'w-full', 'object-cover', 'object-center');
        imageDiv.appendChild(image);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('ml-4', 'flex', 'flex-1', 'flex-col');

        const productNameDiv = document.createElement('div');
        productNameDiv.classList.add('flex', 'justify-between', 'text-base', 'font-semibold', 'text-white');
        const productNameLink = document.createElement('a');
        productNameLink.setAttribute('href', '#');
        productNameLink.textContent = nombreAlbum;
        productNameDiv.appendChild(productNameLink);
        const productPriceP = document.createElement('p');
        productPriceP.classList.add('ml-4');
        const totalPrecio = unitPrice * cantidad;
        productPriceP.textContent = "$" + convertPrice(totalPrecio) + " CLP";
        productPriceP.classList.add('whitespace-nowrap');
        subTotalPagar = subTotalPagar + totalPrecio;
        productNameDiv.appendChild(productPriceP);
        contentDiv.appendChild(productNameDiv);

        const productDetailsP = document.createElement('p');
        productDetailsP.classList.add('mt-1', 'text-sm', 'text-light-black', 'font-medium');
        productDetailsP.textContent = nombreProducto;
        contentDiv.appendChild(productDetailsP);

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('flex', 'flex-1', 'items-end', 'justify-between', 'text-sm', 'font-medium');
        const quantityP = document.createElement('p');
        quantityP.classList.add('text-light-black');
        quantityP.textContent = `Cantidad: ${cantidad}`;
        quantityDiv.appendChild(quantityP);

        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.classList.add('flex');
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('font-medium', 'hover:text-anim-scale', 'hover:text-light-red', 'text-red');
        deleteButton.textContent = 'Eliminar';
        deleteButtonDiv.appendChild(deleteButton);
        deleteButton.addEventListener('click', deleteProductShoppingCart);
        quantityDiv.appendChild(deleteButtonDiv);

        contentDiv.appendChild(quantityDiv);

        listItem.appendChild(imageDiv);
        listItem.appendChild(contentDiv);

        // Agregar el nuevo producto al carrito
        const productList = document.querySelector('.flow-root > ul');
        productList.appendChild(listItem);

        updateSubTotal();

        // Cerrar el modal de vista previa del producto
        isAddingProduct = true;
        closePreviewModel();
    });

    // Función para eliminar productos del carrito de compra
    function deleteProductShoppingCart(event) {
        const listItem = event.currentTarget.closest('li');

        // Obtener el precio total del producto a eliminar
        const productPriceStr = listItem.querySelector('.flex.justify-between.text-base.font-semibold.text-white p:nth-child(2)').textContent;
        const productPrice = parseInt(productPriceStr.replace(/[$.]/g, ''));

        // Restar el precio del producto eliminado del subtotal
        subTotalPagar -= productPrice;

        // Actualizar el subtotal en el HTML
        updateSubTotal();

        // Eliminar el elemento <li> del DOM
        listItem.remove();
    }

    // Función para actualizar el subtotal a pagar
    function updateSubTotal() {
        const subtotalElement = document.querySelector('.flex.justify-between.text-base.font-semibold.text-white #subtotalpagar');
        subtotalElement.textContent = "$" + convertPrice(subTotalPagar) + " CLP";
    }

    // Función para abrir el carrito de compras solamente
    function openShoppingCart() {
        shoppingCartPanel.classList.remove('hidden');
        setTimeout(() => {
            //document.body.classList.add('no-scroll');
            shoppingCartPanel.classList.add('show');
        }, 10);
    }

    // Función para cerrar el carrito de compras
    function closeShoppingCart() {
        shoppingCartPanel.classList.remove('show');
        setTimeout(() => {
            shoppingCartPanel.classList.add('hidden');
            //document.body.classList.remove('no-scroll');
        }, 250);
    }

    // Función para cerrar el carrito de compras, si se presiona fuera del mismo
    function handleBackdropShoppingCartClick(event) {
        // Aquí obtenemos todos los estilos puestos del carrito de compras
        const allStyleShoppingCart = window.getComputedStyle(shoppingCartPanel);
        if (event.target === shoppingCartBackdrop && allStyleShoppingCart.opacity === '1') {
            closeShoppingCart();
        }
    }
    shoppingCartBackdrop.addEventListener('click', handleBackdropShoppingCartClick);

    // Función para ir al checkout
    function payNowCheckOut() {
        console.log("PAGASTE AHORA");
    }

    // Añadir event listeners a todos los productos para abrir el modal
    openPreviewProducts.forEach(product => {
        product.addEventListener('click', openPreviewModel);
    });

    // Agregamos Event listener para el botón de cierre del modal
    btnclosePreviewProduct.addEventListener('click', closePreviewModel);

    // Agregamos Event listener para los botones del carrito de compras
    btnOpenShoppingCart.addEventListener('click', openShoppingCart);
    closeCartButton.addEventListener('click', closeShoppingCart);
    btncloseshoppingcart.addEventListener('click', closeShoppingCart);
    btnPayNow.addEventListener('click', payNowCheckOut);
});