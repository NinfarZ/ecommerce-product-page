import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductShowcase.module.scss'
import { useState, useRef } from 'react'

export default function ProductShowcase() {
    const [currentImg, setCurrentImg] = useState(1);
    const [isSelected, setIsSelected] = useState(false)
    const image = `/images/image-product-${currentImg}.jpg`

    function handleThumbnailClick(newNum: number): void {
        setCurrentImg(newNum)
    }

    function handleNext(): void {
        setCurrentImg(currentImg !== 4 ? currentImg + 1 : 1)
    }

    function handlePrevious(): void {
        setCurrentImg(currentImg !== 1 ? currentImg - 1 : 4)
    }

    return (
        <div className={styles.wrapper}>
            <figure className={styles.product}>
                <img className={styles.img} src={image} alt='product-img' />

                <button onClick={handlePrevious} className={styles.btnPrevious}>
                    <img width={10} src='/images/icon-previous.svg' />
                </button>
                <button onClick={handleNext} className={styles.btnNext}>
                    <img width={10} src='/images/icon-next.svg' />
                </button>

            </figure>
            <div className={styles.thumbnails}>
                <Thumbnail num={1} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={2} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={3} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={4} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
            </div>
        </div>
    )
}

interface ThumbnailProps {
    num: number
    handleThumbnailClick: (newNum: number) => void
    isSelected: boolean
    currentImg: number
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

function Thumbnail({ num, handleThumbnailClick, isSelected, currentImg, setIsSelected }: ThumbnailProps) {

    const image = `/images/image-product-${num}-thumbnail.jpg`

    const handleClick = () => {
        handleThumbnailClick(num)
        setIsSelected(isSelected => !isSelected)
    }

    return (
        <button onClick={handleClick}>
            <img className={currentImg === num ? styles.imgSelected : ''} src={image} alt='thumbnail' />
        </button>
    )
}
