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
    setItemsInCart: React.Dispatch<React.SetStateAction<CartItem[]>>
    itemsInCart: CartItem[]
}

export default function Navigation({ itemsInCart, setItemsInCart }: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    function handleMenuOpen(): void {
        setIsMenuOpen(true)
    }

    return (
        <nav className={styles.nav}>
            {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
            <div>
                <button onClick={handleMenuOpen} className={styles.menu}>
                    <img height={19} width={19} src='/images/icon-menu.svg' alt='menu' />
                </button>
                <img height={24} src='/images/logo.svg' alt='logo' />
                <div className={styles.navLinks}>
                    <button>Collections</button>
                    <button>Men</button>
                    <button>Women</button>
                    <button>About</button>
                    <button>Contact</button>
                </div>
            </div>

            <div className={styles.clientContent}>
                <Cart itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />
                <Image width={24} height={24} src='/images/image-avatar.png' alt='avatar' />
            </div>
        </nav>
    )
}

function Cart({ itemsInCart, setItemsInCart }: NavigationProps) {
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
                <img width={24} height={24} src='/images/icon-cart.svg' alt='cart' />
            </button>
            {showCart && <CartPopUp itemsInCart={itemsInCart} setItemsInCart={setItemsInCart} />}
        </div>

    )
}

function CartPopUp({ itemsInCart, setItemsInCart }: NavigationProps) {

    function handleDelete(): void {
        setItemsInCart([])
    }

    return (
        <div className={styles.cartPopup}>
            <p className={styles.header}>Cart</p>
            {itemsInCart[0] && <div className={styles.purchase}>
                <div className={styles.wrapper}>

                    <img className={styles.productImg} width={52} src={itemsInCart[0].image} />


                    <div className={styles.info}>
                        <p className={styles.productName}>{itemsInCart[0].name}</p>
                        <p>${itemsInCart[0].originalPrice}.00 x {itemsInCart[0].amount} <span>${itemsInCart[0].price}.00</span></p>
                    </div>
                    <button onClick={handleDelete}>
                        <img src='/images/icon-delete.svg' alt='delete' />
                    </button>

                </div>
                <button className={styles.checkout}>Checkout</button>
            </div> || <div className={styles.purchase}><p className={styles.empty}>Your cart is empty.</p></div>}
        </div>
    )
}

type MenuProps = {
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileMenu({ setIsMenuOpen }: MenuProps) {
    function handleClose(): void {
        setIsMenuOpen(false)
    }
    return (
        <div className={styles.menuWrapper}>
            <div className={styles.mobileNav}>
                <button onClick={handleClose} className={styles.delete}><img src='/images/icon-close.svg' alt='close' /></button>
                <button>Collections</button>
                <button>Men</button>
                <button>Women</button>
                <button>About</button>
                <button>Contact</button>
            </div>
        </div>

    )
} 
