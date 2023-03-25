import React from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductShowcase.module.scss'
import { useState, useRef } from 'react'

export default function ProductShowcase() {
    const [currentImg, setCurrentImg] = useState<number>(1);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [showLightbox, setShowLightbox] = useState<boolean>(false)
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

    function toggleLightbox(): void {
        setShowLightbox(showLightbox => !showLightbox)
    }

    return (
        <>
            {showLightbox && <Lightbox image={image} toggleLightbox={toggleLightbox} previousButton={handlePrevious} nextButton={handleNext} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />}
            <div className={styles.wrapper}>
                <figure className={styles.product}>
                    <button className={styles.imgButton}>
                        <img onClick={toggleLightbox} className={styles.img} src={image} alt='product-img' />
                    </button>


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
        </>

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

type LightboxProps = {
    image: string
    toggleLightbox: () => void
    previousButton: () => void
    nextButton: () => void
    handleThumbnailClick: (newNum: number) => void
    isSelected: boolean
    currentImg: number
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
}

function Lightbox({ image, toggleLightbox, previousButton, nextButton, handleThumbnailClick, isSelected, currentImg, setIsSelected }: LightboxProps) {

    return (
        <div className={styles.lightbox}>
            <button onClick={toggleLightbox} className={styles.close}>
                <img src='/images/icon-close.svg' />
            </button>
            <div className={styles.imgWrapper}>
                <img className={styles.img} src={image} alt='product-img' />
                <button onClick={previousButton} className={styles.btnPrevious}>
                    <img width={10} src='/images/icon-previous.svg' />
                </button>
                <button onClick={nextButton} className={styles.btnNext}>
                    <img width={10} src='/images/icon-next.svg' />
                </button>
            </div>
            <div className={styles.thumbnails}>
                <Thumbnail num={1} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={2} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={3} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
                <Thumbnail num={4} handleThumbnailClick={handleThumbnailClick} isSelected={isSelected} currentImg={currentImg} setIsSelected={setIsSelected} />
            </div>

        </div>

    )
}
