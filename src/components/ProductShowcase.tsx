import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductShowcase.module.scss'

export default function ProductShowcase() {
    return (
        <figure className={styles.product}>
            <img className={styles.img} src='/images/image-product-1.jpg' alt='product-img' />

            <button className={styles.btnPrevious}>
                <img src='/images/icon-previous.svg'></img>
            </button>
            <button className={styles.btnNext}>
                <img src='/images/icon-next.svg'></img>
            </button>


        </figure>
    )
}
