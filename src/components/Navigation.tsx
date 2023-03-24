import React, { useState, useEffect } from 'react'
import styles from '@/styles/Navigation.module.scss'
import Image from 'next/image'

type CartItem = {
    name: string
    price: number
    originalPrice: number
    amount: number
    image: string
}

type NavigationProps = {
    itemsInCart: CartItem[]
}

export default function Navigation({ itemsInCart }: NavigationProps) {
    return (
        <nav className={styles.nav}>
            <div>
                <button className={styles.menu}>
                    <img height={19} width={19} src='/images/icon-menu.svg' />
                </button>
                <img height={24} src='/images/logo.svg' />
                <div className={styles.navLinks}>
                    <button>Collections</button>
                    <button>Men</button>
                    <button>Women</button>
                    <button>About</button>
                    <button>Contact</button>
                </div>
            </div>

            <div className={styles.clientContent}>
                <Cart itemsInCart={itemsInCart} />
                <Image width={24} height={24} src='/images/image-avatar.png' alt='' />
            </div>
        </nav>
    )
}

function Cart({ itemsInCart }: NavigationProps) {
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [showCart, setShowCart] = useState<boolean>(false)

    function handleShowCart() {
        setShowCart(showCart => !showCart)
    }

    useEffect(() => {
        setTotalAmount(getTotalAmount())
    }, [itemsInCart])

    function getTotalAmount(): number {
        return itemsInCart.map(item => item.amount).reduce((total, current) => total + current, 0)
    }

    return (
        <div className={styles.cart}>

            <button onClick={handleShowCart}>
                <div className={totalAmount !== 0 ? styles.amountPing : ''}>{totalAmount !== 0 && totalAmount}</div>
                <img width={24} height={24} src='/images/icon-cart.svg' />
            </button>
            {showCart && <CartPopUp itemsInCart={itemsInCart} />}
        </div>

    )
}

function CartPopUp({ itemsInCart }: NavigationProps) {

    return (
        <div className={styles.cartPopup}>
            <p className={styles.header}>Cart</p>
            {itemsInCart[0] && <div className={styles.purchase}>
                <div className={styles.wrapper}>
                    <figure>
                        <img width={52} src={itemsInCart[0].image} />
                    </figure>

                    <div className={styles.info}>
                        <p className={styles.productName}>{itemsInCart[0].name}</p>
                        <p>${itemsInCart[0].originalPrice}.00 x {itemsInCart[0].amount} <span>${itemsInCart[0].price}.00</span></p>
                    </div>
                </div>
                <button>Checkout</button>
            </div>}
        </div>
    )
}
