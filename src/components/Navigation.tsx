import React, { useState } from 'react'
import styles from '@/styles/Navigation.module.scss'
import Image from 'next/image'

interface CartItem {
    name: string
    price: number
    amount: number
}
export default function Navigation(props: CartItem) {
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
                <Cart {...props} />
                <Image width={24} height={24} src='/images/image-avatar.png' alt='' />
            </div>
        </nav>
    )
}

function Cart(props: CartItem) {
    const [amount, setAmount] = useState(props.amount)
    return (
        <div className={styles.cart}>
            <div className={amount !== 0 ? styles.amountPing : ''}>{amount}</div>
            <button>
                <img width={24} height={24} src='/images/icon-cart.svg' />
            </button>
        </div>

    )
}

function CartPopUp(props: CartItem) {

}
