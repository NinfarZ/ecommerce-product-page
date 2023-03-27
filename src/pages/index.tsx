import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Navigation from '@/components/Navigation'
import ProductShowcase from '@/components/ProductShowcase'
import Purchase from '@/components/Purchase'
import { useState } from 'react'
import { Kumbh_Sans } from 'next/font/google'

const kumbh = Kumbh_Sans({
  weight: '400',
  subsets: ['latin'],

})
export default function Home() {

  type CartItem = {
    name: string
    price: number
    originalPrice: number
    amount: number
    image: string
  }[]

  const [itemsInCart, setItemsInCart] = useState<CartItem>([])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={kumbh.className}>
        <Navigation itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
        <article className={styles.productPage}>
          <ProductShowcase />
          <div className={styles.productDetails}>
            <header className={styles.header}>
              <p className={styles.companyName}>SNEAKER COMPANY</p>
              <h2 className={styles.productName}>Fall Limited Edition Sneakers</h2>
            </header>
            <p className={styles.productDescription}>
              These low-profile sneakers are your perfect casual
              wear companion. Featuring a durable rubber outer sole, they&apos;ll
              withstand everything the weather can offer.
            </p>

            <Purchase setItemsInCart={setItemsInCart} itemsInCart={itemsInCart} />
          </div>
        </article>




      </main>
    </>
  )
}
