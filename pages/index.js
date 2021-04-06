import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
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
          The best flair button swag on the web!
        </p>

        <ul className={styles.grid}>

          <li className={styles.card}>
            <a href="https://nextjs.org/docs" >
              <img src="/images/flair_sorry.jpg" alt="Yellow flair button."/>
              <h3>Sorry.</h3>
              <p>Yellow sorry flair.</p>
            </a>
          </li>

          <li className={styles.card}>
            <a href="https://nextjs.org/learn">
              <img src="/images/flair_we_need_to_talk.jpg" alt="Black on white flair."/>
              <h3>We need to talk.</h3>
              <p>Black on white flair.</p>
            </a>
          </li>

          <li className={styles.card}>
            <a href="https://github.com/vercel/next.js/tree/master/examples">
              <img src="/images/flair_combo.jpg" alt="Pack of 6 flair combo."/>
              <h3>Combo Flair</h3>
              <p>Pack of 6.</p>
            </a>
          </li>

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
