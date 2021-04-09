import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { initiateCheckout } from "../lib/payments";

import products from '../products.json'

const defaultCart = {
    products: {}
}

export default function Home() {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>The Flair Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Flair Shop
        </h1>

        <p className={styles.description}>
          The best flair button swag on the universe!
        </p>

      <p className={styles.description}>
          <strong>Items:</strong> {totalItems}
          <br />
          <strong>Total Cost:</strong> ${subtotal}
          <br />
          <button className={styles.button} onClick={checkout}>Checkout</button>
      </p>

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, price, image, description } = product;
            return (
                <li key={id} className={styles.card}>
                  <a href="https://nextjs.org/docs" >
                    <img src={image} alt={title}/>
                    <h3>{title}</h3>
                    <p>${price}</p>
                    <p>{description}</p>
                  </a>
                    <p>
                        <button className={styles.button} onClick={() => {
                            addToCart({
                                id,
                            })
                        }}>Add to Cart</button>
                    </p>
                </li>
            )
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
