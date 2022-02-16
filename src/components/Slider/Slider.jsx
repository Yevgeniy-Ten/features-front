import React, {useCallback, useEffect, useRef, useState} from 'react';
import {slideItems} from "../../fixtures/slider";
import "./style.css"
import SliderItem from "./SliderItem";

const Slider = () => {
    const sliderRef = useRef();
    const [itemWidth, setItemWidth] = useState(0)
    const [activeIdx, setActiveIdx] = useState(1) // так как 0 элемент это копия последнего элемента
    const [slides, setSlides] = useState(slideItems)
    const transitionDefault = 600
    const [transition, setTransition] = useState(transitionDefault)
    const [transform, setTransform] = useState(0)
    const [animationIsStarted, setAnimationIsStarted] = useState(false)
    const [swipeX, setSwipeX] = useState(0)
    useEffect(() => {
        initSetup();
    }, [])
    const initSetup = () => {
        setItemWidth(sliderRef.current.offsetWidth)
    }
    useEffect(() => {
        setTransform(activeIdx * itemWidth)
    }, [activeIdx, itemWidth])
    useEffect(() => {
        if (transition === 0) {
            setTimeout(() => {
                setTransition(transitionDefault)
                setAnimationIsStarted(false)
            }, 100);
        }
    }, [transition])
    const nextItem = useCallback(() => {
        if (animationIsStarted) return;
        setAnimationIsStarted(true);
        setActiveIdx(prev => prev + 1);
        setTimeout(() => {
            setTransition(0);
            setActiveIdx(1)
            setSlides(prev => {
                const prevCopy = prev.slice(1)
                prevCopy.push(prev[0])
                return prevCopy
            })
        }, transition)

    }, [transition, animationIsStarted])
    const prevItem = useCallback(() => {
        if (animationIsStarted) return;
        setAnimationIsStarted(true);
        setActiveIdx(prev => prev - 1);
        setTimeout(() => {
            setTransition(0);
            setActiveIdx(1)
            setSlides(prev => {
                const prevCopy = prev.slice(0, (prev.length - 1))
                prevCopy.splice(0, 0, prev[prev.length - 1])
                return prevCopy
            })
        }, transition)

    }, [transition, animationIsStarted])
    const onMouseDown = (e) => {
        setTransition(0);
        setSwipeX(() => {
            return e.touches[0].clientX
        })
    }
    const onMove = (e) => {
        const nextX = e.touches[0].clientX
        const dif = nextX - swipeX
        const isLeft = dif > 0
        if (isLeft) {
            setTransform(prev => prev - 11);
        } else {
            setTransform(prev => prev + 11);

        }
    }
    const onTouchEnd = (e) => {
        setTransition(transitionDefault)
        const isHalf = itemWidth / 2 //половина
        if (isHalf > transform) {
            prevItem();
        } else if (transform > (itemWidth+(itemWidth * 0.75))) {
            nextItem()
        }else{
            setTransform(itemWidth)
        }
        setSwipeX(0)
    }
    return (
        <div>
            Слайдер
            <div className={"slider position-relative"}>
                <div
                    onTouchStart={onMouseDown}
                    onTouchMove={onMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        transition: `${transition / 1000}s`,
                        transform: `translateX(${-(transform)}px)`
                    }} ref={sliderRef} className={"d-flex slider__track"}>
                    {slides.map((item) => {
                        return <SliderItem active={item.active}
                                           id={item.id}
                                           key={item.id} img={item.path}/>
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
