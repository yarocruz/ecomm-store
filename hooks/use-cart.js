import { useState, createContext, useContext, useEffect } from 'react';
import products from "../products.json";
import { initiateCheckout } from "../lib/payments";

const defaultCart = {
    products: {}
}

export const CartContext = createContext();

export function useCartState() {

    const [cart, updateCart] = useState(defaultCart)

    useEffect(() => {
        const stateFromStorage = window.localStorage.getItem('flair_button_cart')
        const data = stateFromStorage && JSON.parse(stateFromStorage)
        if (data) {
            updateCart(data)
        }
    }, [])

    useEffect(() => {
        const data = JSON.stringify(cart);
        window.localStorage.setItem('flair_button_cart', data)
    }, [cart])

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({id}) => `${id}` === `${key}`)
        return {
            ...cart.products[key],
            pricePerItem: product.price
        }
    })

    const subtotal = cartItems.reduce((acc, { pricePerItem, quantity}) => {
        return acc + ( pricePerItem * quantity)
    }, 0)

    const totalItems = cartItems.reduce((acc, { quantity}) => {
        return acc + quantity
    }, 0)

    function addToCart({ id } = {}) {
        updateCart(prev => {
            let cardState = {...prev};

            if (cardState.products[id]) {
                cardState.products[id].quantity = cardState.products[id].quantity + 1;
            } else {
                cardState.products[id] = {
                    id,
                    quantity: 1
                }
            }

            return cardState;
        })
    }

    function checkout() {
        initiateCheckout({
            lineItems: cartItems.map(item => {
                return {
                    price: item.id,
                    quantity: item.quantity
                }
            })
        })
    }

    return {
        cart,
        updateCart,
        subtotal,
        totalItems,
        addToCart,
        checkout
    }
}

export function useCart() {
    const cart = useContext(CartContext)
    return cart;
}