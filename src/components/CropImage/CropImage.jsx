import React, {useEffect, useRef, useState} from 'react';
import "./crop.css"

const CropImage = () => {
    const loopCursorPointerRef = useRef()
    const widthWrapRef = useRef()
    const [isClicked, setIsClicked] = useState(false)
    const [isResizeBtnClicked, setIsResizeBtnClicked] = useState({
        x: 0,
        rightClicked: false,
        leftClicked: false
    })
    const [offsetParent, setOffsetParent] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        cropWidth: 0
    })
    useEffect(() => {
        setTimeout(() => {
            setOffsetParent(() => (
                {
                    x: widthWrapRef.current.offsetLeft,
                    y: widthWrapRef.current.offsetTop,
                    width: widthWrapRef.current.clientWidth,
                    height: widthWrapRef.current.clientHeight,
                    cropWidth: widthWrapRef.current.clientWidth * 0.3
                }
            ))
            loopCursorPointerRef.current.style.width = `${widthWrapRef.current.clientWidth * 0.3}px`
        }, 50)
    }, [])

    const onStartClick = () => {
        setIsClicked(true)
    }
    const onMouseMove = (e) => {
        let x = null
        if (isClicked) {
            x = e.clientX - offsetParent.x
            x -= offsetParent.cropWidth / 2
            if (x < 0 || x >= (offsetParent.width - offsetParent.cropWidth)) {
                return
            }
            loopCursorPointerRef.current.style.left = `${x}px`
            loopCursorPointerRef.current.style.backgroundPositionX = `-${x}px`
        } else if (isResizeBtnClicked.rightClicked) {
            const leftOffset = e.clientX - offsetParent.x
            if ((leftOffset) >= offsetParent.width) {
                onResizeBtnClickUp();
            }
            x = e.clientX - isResizeBtnClicked.x
            if (x === 0) return;
            const currentWidth = loopCursorPointerRef.current.offsetWidth
            loopCursorPointerRef.current.style.width = `${currentWidth + x}px`
            setIsResizeBtnClicked((prev) => ({...prev, x: e.clientX}))
        }
    }
    const onEndClick = () => {
        setIsClicked(false)
    }
    const onResizeBtnClick = (e) => {
        e.stopPropagation()
        setIsResizeBtnClicked(prev => {
            return {
                ...prev,
                rightClicked: true,
                x: e.clientX
            }
        })
    }
    const onResizeBtnClickUp = () => {
        setIsResizeBtnClicked({
            rightClicked: false,
            leftClicked: false,
            x: 0
        })
    }
    return (
        <div>
            <div onMouseMove={onMouseMove} className={"img-blur"} ref={widthWrapRef}>
                <img draggable={false} src="tanjiro.jpg" className={"w-100"} alt=""/>
                <div ref={loopCursorPointerRef}
                     onMouseDown={onStartClick}
                     onMouseUp={onEndClick}
                     style={{
                         backgroundImage: "url(/tanjiro.jpg)",
                         backgroundSize: `${offsetParent.width}px ${offsetParent.height}px`
                     }}
                     className="img-crop">
                    <div
                        onMouseUp={onResizeBtnClickUp}
                        onMouseDown={onResizeBtnClick}
                        className={"resize-btn resize-btn--left"}>
                        {"<"}
                    </div>
                    <div
                        onMouseUp={onResizeBtnClickUp}
                        onMouseDown={onResizeBtnClick} className={"resize-btn resize-btn--right"}>
                        >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropImage;
