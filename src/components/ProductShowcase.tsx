import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductShowcase.module.scss'

export default function ProductShowcase() {
    return (
        <figure className={styles.product}>
            <img className={styles.img} src='/images/image-product-1.jpg' alt='product-img' />

            <button className={styles.btnPrevious}>
                <img width={10} src='/images/icon-previous.svg' />
            </button>
            <button className={styles.btnNext}>
                <img width={10} src='/images/icon-next.svg' />
            </button>


        </figure>
    )
}
