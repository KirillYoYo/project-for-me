import React, {useState, useEffect} from 'react'
import getWidthHeightHoc from '../HOCS/GetWidthHeight'
import {RECT_HEIGHT, RECT_WIDTH} from '../Consts'
import {countsRectInLine, countsRows, getArr} from './utils'
import {Polygon} from './Polygon'

const RectBg = ({width, height}) => {
    const [newShapes, setNewShapes] = useState([])
    const [shapesModel, setShapesModel] = useState([])
    const [curShape, setCurShape] = useState(null)
    const [flagToAnimate, setFlagToAnimate] = useState(false)
    useEffect(() => {
        const maxCount = countsRectInLine(width) * countsRows(height)
        setShapesModel(getArr(width, maxCount + 2 * countsRectInLine(width)))
    }, [width, height])
    useEffect(() => {
        setNewShapes(recNodes())
    }, [curShape])

    useEffect(() => {
        setFlagToAnimate(!flagToAnimate)
    }, [newShapes])

    const recNodes = () => {
        const curNode = shapesModel[curShape]
        const countInLine = countsRectInLine(width)
        const maxGap = 6

        if (!curNode) return

        const res = JSON.parse(JSON.stringify(shapesModel))

        const getAroundNodes = (gap = 1) => {
            const maxInLIne = 1 + 2 * gap
            const res = {}
            const range = (maxGap - gap) + 1
            for (let i = 0; i < maxInLIne; i++) {
                const leftTop = curShape - (countInLine * gap) - gap
                const topRight = curShape - (countInLine * gap) + gap
                const leftBottom = curShape + (countInLine * gap) - gap
                res[leftTop + i] = {
                    y: (shapesModel[leftTop + i] || {}).y - RECT_HEIGHT * range,
                    x: (res[leftTop + i] || {}).x
                }
                res[leftBottom + i] = {
                    y: (shapesModel[leftBottom + i] || {}).y + RECT_HEIGHT * range,
                    x: (res[leftBottom + i] || {}).x
                }
                res[leftTop + (countInLine * i)] = {
                    y: (shapesModel[leftTop + (countInLine * i)] || {}).y - (i === 0 ? RECT_HEIGHT * range : 0) + (i === maxInLIne - 1 ? RECT_HEIGHT * range : 0),
                    x: (shapesModel[leftTop + (countInLine * i)] || {}).x - RECT_WIDTH * range
                }
                res[topRight + (countInLine * i)] = {
                    y: (shapesModel[leftTop + (countInLine * i)] || {}).y - (i === 0 ? RECT_HEIGHT * range : 0) + (i === maxInLIne - 1 ? RECT_HEIGHT * range : 0),
                    x: (shapesModel[topRight + (countInLine * i)] || {}).x + RECT_WIDTH * (range)
                }
            }

            return res
        }

        for (let i = 0; i < maxGap; i++) {
            const curObj = getAroundNodes(i)
            for (const idx in curObj) {
                if (res[idx]) {
                    res[idx].x = curObj[idx].x || res[idx].x
                    res[idx].y = curObj[idx].y || 0
                    res[idx].delay = i || 1
                }
            }
        }

        return res
    }

    const onMouseOver = (i) => {
        setCurShape(i)
    }

    const curTime = Date.now()

    return (
        <div>
            <svg style={{overflow: 'hidden'}} width={width} height={height}>
                {shapesModel.map((el, i) => (
                    <Polygon
                        i={i}
                        onMouseOver={onMouseOver}
                        onMouseOut={null}
                        key={i}
                        x={el.x}
                        y={el.y}
                        curNode={curShape}
                        newPos={newShapes && newShapes[i]}
                        flagToAnimate={flagToAnimate}
                        zapTime={curTime + 200}
                    />
                ))}
            </svg>
        </div>
    )
}

export default getWidthHeightHoc(RectBg)
