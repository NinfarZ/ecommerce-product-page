import React from 'react'
import { useState } from 'react'
import styles from '@/styles/Purchase.module.scss'


export default function Purchase() {
    const [discountPrice, setDiscountPrice] = useState(125)
    return (
        <section className={styles.purchaseSection}>
            <div className={styles.price}>
                <div>
                    <span className={styles.discountPrice}>${discountPrice}.00</span>
                    <span className={styles.percentage}>50%</span>
                </div>
                <span className={styles.originalPrice}>$250.00</span>
            </div>

            <div className={styles.cart}>
                <div>
                    <button></button>
                </div>

            </div>
        </section>
    )
}
