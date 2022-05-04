import React, {useState, useEffect, useRef} from 'react'

export default function getWidthHeightHoc(OriginalComponent) {
    const GetWidthHeight = (props) => {
        const wp = useRef(null)
        const [dimensions, setDimensions] = useState({})
        useEffect(() => {
            setDimensions({width: wp.current.clientWidth, height: wp.current.clientHeight})
        }, [])

        return (
            <div ref={wp} style={{height: '100%', width: '100%'}}>
                <OriginalComponent width={dimensions.width} height={dimensions.height} />
            </div>
        )
    }
    return GetWidthHeight
}
