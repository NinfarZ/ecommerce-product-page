import React from 'react'
import { useState } from 'react'
import styles from '@/styles/Purchase.module.scss'

interface PurchaseProps {
    setItemsInCart: React.Dispatch<React.SetStateAction<any[]>>;
}


export default function Purchase(props: PurchaseProps) {
    const [amount, setAmount] = useState(0)

    function handleAdd(): void {
        setAmount(amount + 1)
    }

    function handleRemove(): void {
        if (amount === 0) return
        setAmount(amount - 1)
    }

    function handleAddToCart(): void {

    }

    return (
        <section className={styles.purchaseSection}>
            <div className={styles.price}>
                <div>
                    <span className={styles.discountPrice}>$125.00</span>
                    <span className={styles.percentage}>50%</span>
                </div>
                <span className={styles.originalPrice}>$250.00</span>
            </div>

            <div className={styles.cart}>
                <div className={styles.amount}>
                    <button onClick={handleRemove}>
                        <img src='/images/icon-minus.svg' />
                    </button>
                    <span>{amount}</span>
                    <button onClick={handleAdd}>
                        <img src='/images/icon-plus.svg' />
                    </button>
                </div>
                <button onClick={handleAddToCart} className={styles.addCart}>
                    <img src='/images/icon-cart.svg' />
                    <span>Add to cart</span>
                </button>

            </div>
        </section>
    )
}
