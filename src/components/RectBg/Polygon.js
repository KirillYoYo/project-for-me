import React, {useEffect} from 'react'
import {getPoints} from './utils'

export const Polygon = ({x = 0, y = 0, onMouseOver, onMouseOut, i, curNode, newPos, flagToAnimate}) => {
    const GAP = 1

    const cMouseEnter = () => {
        onMouseOver && onMouseOver(i)
    }
    const cMouseOut = () => {
        onMouseOut && onMouseOut(i)
    }

    const animNode = () => {
        if (!newPos || curNode === i) {
            return
        }
        const element = document.querySelector(`#anim${i}`)
        element && element.setAttribute('values', `${getPoints(x, y, 1)};${getPoints(newPos.x, newPos.y, 1)}`)
        element && element.setAttribute('dur', newPos.delay ? newPos.delay * 0.3 + 0.1 : '5')
        element && element.beginElement()
    }

    useEffect(() => {
        animNode()
    }, [flagToAnimate])

    return (
        <polygon
            key={i}
            onMouseOver={cMouseEnter}
            onMouseOut={cMouseOut}
            fill="#d3d3d3"
            stroke="lime"
            strokeWidth={1}
            points={getPoints(x, y, GAP)}
            id={`pol${i}`}
            visibility={curNode === i ? 'hidden' : 'visible'}
        >
            <animate
                id={`anim${i}`}
                dur='0.6'
                fill="freeze"
                attributeName="points"
                restart="always"
            />
        </polygon>
    )
}
