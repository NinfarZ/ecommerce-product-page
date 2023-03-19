import React from 'react'
import styles from '@/styles/Navigation.module.scss'
import Image from 'next/image'

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <div>
                <img height={19} width={19} src='/images/icon-menu.svg' />
                <img height={24} src='/images/logo.svg' />
            </div>

            <div>
                <img width={24} height={24} src='/images/icon-cart.svg' />
                <Image width={24} height={24} src='/images/image-avatar.png' alt='' />
            </div>
        </nav>
    )
}
