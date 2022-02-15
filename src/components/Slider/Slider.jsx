import React, {cloneElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {slideItems} from "../../fixtures/slider";
import "./style.css"
import SliderItem from "./SliderItem";

const Slider = () => {
    const sliderRef = useRef();
    const [itemWidth, setItemWidth] = useState(0)
    const [activeIdx, setActiveIdx] = useState(1) // так как 0 элемент это копия последнего элемента
    const [slides, setSlides] = useState([])
    const transitionDefault = 600
    const [transition, setTransition] = useState(transitionDefault)
    const [animationIsStarted, setAnimationIsStarted] = useState(false)
    const maxItems = 3
    // получаем ширину одного элемента слайдера и устанавливаем первые слайды
    useEffect(() => {
        initSetup();
    }, [])
    const initSetup = () => {
        setItemWidth(sliderRef.current.offsetWidth)
        const slidesForShow = slideItems.slice(0, maxItems)
        const lastItemCopy = slidesForShow[slidesForShow.length - 1]
        const firstItemCopy = slidesForShow[0]
        slidesForShow.splice(0, 0, lastItemCopy)
        slidesForShow.push(firstItemCopy)
        setSlides(slidesForShow)
    }
    useEffect(() => {
        const isLast = activeIdx === (slides.length - 1)
        const isFirst = activeIdx === 0;
        if (isFirst) {
            setAnimationIsStarted(true)
            setTimeout(() => {
                setTransition(0);
                setActiveIdx(slides.length - 2)
            }, transition)
        } else if (isLast) {
            setActiveIdx(1);
            // setTimeout(() => {
            //     setTransition(0);
            //     setActiveIdx(1);
            // }, transition)
        }
    }, [activeIdx])
    useEffect(() => {
        if(transition===0){
            setTimeout(() => {
                setTransition(transitionDefault)
                setAnimationIsStarted(false)
            }, 5);
        }
    }, [transition])
    const nextItem = useCallback(() => {
        if (animationIsStarted) return;
        setActiveIdx(prev => {
            setAnimationIsStarted(true)
            return prev + 1
        })

    }, [itemWidth])
    const prevItem = useCallback(() => {
        setActiveIdx(prev => {
            setAnimationIsStarted(true);
            return prev - 1
        })
    }, [itemWidth])
    return (
        <div>
            Слайдер
            <div className={"slider position-relative"}>
                <div style={{
                    transition: `${transition / 1000}s`,
                    transform: `translateX(${-(activeIdx * itemWidth)}px)`
                }} ref={sliderRef} className={"d-flex slider__track"}>
                    {slides.map((item, position) => {
                        return <SliderItem active={item.active}
                                           id={item.id}
                                           key={position} img={item.path}/>
                    })}
                </div>
                <div className={"position-absolute d-flex justify-content-between slider-btns"}>
                    <button onClick={prevItem}>{"<"}</button>
                    <button onClick={nextItem}>></button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
