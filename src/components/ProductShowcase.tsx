import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductShowcase.module.scss'
import { useState, useRef } from 'react'

export default function ProductShowcase() {
    const [currentImg, setCurrentImg] = useState<number>(1);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [showLightbox, setShowLightbox] = useState<boolean>(false)
    const image = `/images/image-product-${currentImg}.jpg`
    const thumbnailNumbers: number[] = [1, 2, 3, 4]

    function handleThumbnailClick(newNum: number): void {
        setCurrentImg(newNum)
    }

    function handleNext(): void {
        setCurrentImg(currentImg !== 4 ? currentImg + 1 : 1)
    }

    function handlePrevious(): void {
        setCurrentImg(currentImg !== 1 ? currentImg - 1 : 4)
    }

    function toggleLightbox(): void {
        setShowLightbox(showLightbox => !showLightbox)
    }

    return (
        <>
            {showLightbox && <Lightbox image={image} thumbnailNumbers={thumbnailNumbers} toggleLightbox={toggleLightbox} previousButton={handlePrevious} nextButton={handleNext} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />}
            <div className={styles.wrapper}>
                <figure className={styles.product}>
                    <button className={styles.imgButton}>
                        <img onClick={toggleLightbox} className={styles.img} src={image} alt='product-img' />
                    </button>


                    <button onClick={handlePrevious} className={styles.btnPrevious}>
                        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="currentColor" fill-rule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={handleNext} className={styles.btnNext}>
                        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="currentColor" fill-rule="evenodd" />
                        </svg>
                    </button>

                </figure>
                <div className={styles.thumbnails}>
                    {thumbnailNumbers.map((num) => <Thumbnail key={num} num={num} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />)}
                </div>
            </div>
        </>

    )
}

interface ThumbnailProps {
    key: number
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

type LightboxProps = {
    image: string
    thumbnailNumbers: number[]
    toggleLightbox: () => void
    previousButton: () => void
    nextButton: () => void
    handleThumbnailClick: (newNum: number) => void
    isSelected: boolean
    currentImg: number
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

function Lightbox({ image, thumbnailNumbers, toggleLightbox, previousButton, nextButton, handleThumbnailClick, isSelected, currentImg, setIsSelected }: LightboxProps) {

    return (
        <div className={styles.lightbox}>

            <div className={styles.imgWrapper}>
                <button onClick={toggleLightbox} className={styles.close}>
                    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                        <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd" />
                    </svg>
                </button>
                <img className={styles.img} src={image} alt='product-img' />
                <button onClick={previousButton} className={styles.btnPrevious}>
                    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="currentColor" fill-rule="evenodd" />
                    </svg>
                </button>
                <button onClick={nextButton} className={styles.btnNext}>
                    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="currentColor" fill-rule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className={styles.thumbnails}>
                {thumbnailNumbers.map((num) => <Thumbnail key={num} num={num} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />)}
            </div>

        </div>

    )
}
