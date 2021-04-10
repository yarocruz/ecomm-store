import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useCart } from "../hooks/use-cart";

import products from '../products.json'

export default function Home() {
    const { addToCart } = useCart();

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

        <ul className={styles.grid}>
          {products.map(product => {
            const { id, title, price, image, description } = product;
            return (
                <li key={id} className={styles.card}>
                  <Link href={`/products/${id}`}>
                      <a>
                          <img src={image} alt={title}/>
                          <h3>{title}</h3>
                          <p>${price}</p>
                          <p>{description}</p>
                      </a>
                  </Link>
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
