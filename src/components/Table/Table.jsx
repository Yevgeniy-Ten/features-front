import React, {useMemo, useState} from 'react';
import "./table.css"

const Table = ({data}) => {
    const rowHeight = 73
    const visibleRows = 10
    const [startIdx, setStartIdx] = useState(0)
    const invisibleDataHeights = useMemo(() => {
        return {
            topHeight: startIdx * rowHeight,
            bottomHeight: (data.length - (startIdx + visibleRows)) * rowHeight
        }
    }, [startIdx, data.length])
    const onScrollHandler = e => {
        const idx = Math.floor(e.target.scrollTop / rowHeight)
        setStartIdx(() => idx)
    }
    return (
        <div onScroll={onScrollHandler} style={{maxHeight: rowHeight * visibleRows}} className={"table"}>
            <div className={"table-visible"}>
                <div style={{height: invisibleDataHeights.topHeight}}/>
                {data.slice(startIdx, startIdx + visibleRows).map(r => {
                    return <div key={r.id} className={"d-flex p-3 justify-content-between border-bottom"}>
                        <div>
                            #{r.id}
                        </div>
                        <div>
                            {r.text}
                        </div>
                    </div>
                })}
                <div style={{height: invisibleDataHeights.bottomHeight}}/>
            </div>
        </div>
    );
};

export default Table;
