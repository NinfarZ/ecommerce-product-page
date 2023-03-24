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
                    <img src='/images/icon-cart.svg' />
                    <span>Add to cart</span>
                </button>

            </div>
        </section>
    )
}
