document.addEventListener('DOMContentLoaded', () => {
    let navbar = document.querySelector('.header .navbar');
    let menu = document.querySelector('#menu-btn');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }

    let cart = document.querySelector('.cart-items-container');

    document.querySelector('#cart-btn').onclick = () => {
        cart.classList.add('active');
    }

    document.querySelector('#close-form').onclick = () => {
        cart.classList.remove('active');
    }

    var swiper = new Swiper(".home-slider", {
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Novo código para adicionar itens ao carrinho
    let cartItems = {};

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');
            addItemToCart(product, price);
        });
    });

    function addItemToCart(product, price) {
        if (cartItems[product]) {
            cartItems[product].quantity += 1;
        } else {
            cartItems[product] = { price: price, quantity: 1 };
        }

        updateCart();
    }

    function updateCart() {
        const cartItemsContainer = document.querySelector('#new-cart-items');
        cartItemsContainer.innerHTML = '';

        for (let product in cartItems) {
            let item = cartItems[product];
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="fas fa-times remove-item" data-product="${product}"></span>
                <img src="images/cart-1.jpg" alt="">
                <div class="content">
                    <h3>${product}</h3>
                    <div class="price">$${item.price}/-</div>
                    <div class="quantity">
                        <button class="decrease-quantity" data-product="${product}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-product="${product}">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Adiciona o evento de clique para remover o item
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                delete cartItems[product];
                updateCart();
            });

            // Adiciona eventos de clique para aumentar e diminuir a quantidade
            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                cartItems[product].quantity += 1;
                updateCart();
            });

            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (cartItems[product].quantity > 1) {
                    cartItems[product].quantity -= 1;
                } else {
                    delete cartItems[product];
                }
                updateCart();
            });
        }
    }

    // Código para enviar os itens do carrinho via WhatsApp
    document.querySelector('#whatsapp-checkout').addEventListener('click', (event) => {
        event.preventDefault();
        let cartItems = document.querySelectorAll('.cart-item');
        let message = 'Meu pedido:\n';
        cartItems.forEach(item => {
            let product = item.querySelector('h3').innerText;
            let price = item.querySelector('.price').innerText;
            let quantity = item.querySelector('.quantity span').innerText;
            message += `${product} - ${price} x ${quantity}\n`;
        });
        let whatsappUrl = `https://wa.me/+5561993099538?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Novo código para enviar o pedido via WhatsApp ao clicar no botão "pede agora!"
    document.querySelector('#submit-order').addEventListener('click', (event) => {
        event.preventDefault();
        
        let nome = document.querySelector('input[placeholder="nome"]').value;
        let sobrenome = document.querySelector('input[placeholder="sobrenome"]').value;
        let email = document.querySelector('input[placeholder="email"]').value;
        let telefone = document.querySelector('input[placeholder="telefone"]').value;
        let endereco = document.querySelector('input[placeholder="Endereço"]').value;
        let referencia = document.querySelector('input[placeholder="referencia"]').value;
        let detalhes = document.querySelector('textarea').value;

        let message = `Pedido de ${nome} ${sobrenome}:\nEmail: ${email}\nTelefone: ${telefone}\nEndereço: ${endereco}\nReferência: ${referencia}\nDetalhes do pedido:\n${detalhes}`;
        
        let whatsappUrl = `https://wa.me/+5561993099538?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

