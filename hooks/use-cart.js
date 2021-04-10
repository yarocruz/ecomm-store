import { useState, createContext, useContext } from 'react';
import products from "../products.json";
import {initiateCheckout} from "../lib/payments";

const defaultCart = {
    products: {}
}

export const CartContext = createContext();

export function useCartState() {
    const [cart, updateCart] = useState(defaultCart)

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