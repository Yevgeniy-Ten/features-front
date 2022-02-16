import React, {useEffect, useRef, useState} from 'react';
import "./loop.css"

const Loop = () => {
    const [isShow, setIsShow] = useState(false)
    const loopCursorPointerRef = useRef()
    const widthWrapRef = useRef()
    const [offsetParent, setOffsetParent] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
    useEffect(() => {
        setTimeout(() => {
            setOffsetParent(() => (
                {
                    x: widthWrapRef.current.offsetLeft,
                    y: widthWrapRef.current.offsetTop,
                    width: widthWrapRef.current.clientWidth,
                    height: widthWrapRef.current.clientHeight,
                }
            ))
        }, 30)
    }, [])
    const cls = ["loop-circle"]
    if (isShow) {
        cls.push("active")
    }
    const onMouseMove = (e) => {
        const x = e.clientX - offsetParent.x
        const y = e.clientY - offsetParent.y
        loopCursorPointerRef.current.style.left = `${x}px`
        loopCursorPointerRef.current.style.top = `${y}px`
        loopCursorPointerRef.current.style.backgroundPositionX = `-${x * 2.9}px`
        loopCursorPointerRef.current.style.backgroundPositionY = `-${y * 2.9}px`
        setIsShow(true)
    }
    const onMouseLeave = () => {
        setIsShow(false)
    }
    return (
        <div>
            Лупа
            <div ref={widthWrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
                 className={"position-relative loop-wrap"}>
                <img className={"w-100"} src={"karta.jpg"} alt=""/>
                <div ref={loopCursorPointerRef}
                     style={{
                         backgroundImage: "url(/karta.jpg)",
                         backgroundSize: `${offsetParent.width * 3}px ${offsetParent.height * 3}px`
                     }}
                     className={cls.join(" ")}/>
            </div>
        </div>
    );
};

export default Loop;
