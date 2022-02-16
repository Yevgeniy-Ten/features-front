import React from 'react';

const SliderItem = ({
                        id,
                        img
                    }) => {
    const cls = ["slider__item"]
    return (
        <div  draggable={false} className={"slider__item-wrap px-1"}>
            <div className={cls.join(" ")}>
                <img draggable={false} src={img} className={"w-100"} alt="car"/>
            </div>
        </div>
    );
};

export default SliderItem;
