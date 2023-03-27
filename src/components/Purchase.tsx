import React from 'react'
import { useState, useEffect } from 'react'
import styles from '@/styles/Purchase.module.scss'

interface PurchaseProps {
    setItemsInCart: React.Dispatch<React.SetStateAction<CartItem[]>>
    itemsInCart: CartItem[]
}

interface CartItem {
    name: string
    price: number
    originalPrice: number
    amount: number
    image: string
}


export default function Purchase({ setItemsInCart, itemsInCart }: PurchaseProps) {
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        console.log(itemsInCart);
    }, [itemsInCart]);


    function handleAdd(): void {
        setAmount(amount + 1)
    }

    function handleRemove(): void {
        if (amount === 0) return
        setAmount(amount - 1)
    }

    function buildProduct(): CartItem {
        const newPrice = 125 * amount
        return { name: 'Fall Limited Edition Sneakers', price: newPrice, originalPrice: 125, amount: amount, image: '/images/image-product-1-thumbnail.jpg' }
    }

    function updateProduct(updatedProduct: CartItem): CartItem[] {
        const itemList = [...itemsInCart]
        const updatedItemList = itemList.map(item => {
            if (item.name === updatedProduct.name) {
                const newPrice = item.originalPrice * (item.amount + updatedProduct.amount)
                return { name: item.name, price: newPrice, originalPrice: item.originalPrice, amount: item.amount + updatedProduct.amount, image: item.image }
            }
            return item;
        });
        return updatedItemList
    }

    function handleAddToCart(): void {
        if (amount === 0) return
        const product = buildProduct()
        const productsInCart = itemsInCart.map(item => item.name)
        if (productsInCart.includes(product.name))
            setItemsInCart(updateProduct(product))
        else setItemsInCart([...itemsInCart, product])

        setAmount(0)
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
                    <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentColor" fill-rule="nonzero" />
                    </svg>
                    <span>Add to cart</span>
                </button>

            </div>
        </section>
    )
}
