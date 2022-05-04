import {RECT_HEIGHT, RECT_WIDTH} from '../Consts'

export const countsRectInLine = (width) => {
    return Math.floor(width / RECT_WIDTH)
}
export const countsRows = (height) => {
    return Math.floor(height / RECT_HEIGHT)
}

export const getArr = (width, maxCount) => {
    const arr = []
    const countInLine = countsRectInLine(width)
    for (let i = 0; i < maxCount; i++) {
        let curX = -RECT_WIDTH
        let curY = -RECT_HEIGHT
        const prevI = arr[i - 1]
        if (prevI) {
            curX = prevI.x + RECT_WIDTH
            curY = prevI.y
        }
        if (prevI && Math.ceil(i % countInLine) === 0) {
            curX = 0
            curY = prevI.y + RECT_HEIGHT
        }

        arr.push({id: i, x: curX, y: curY, row: (Math.floor(i / countInLine) || 1) - 1, col: curX / RECT_WIDTH})
    }
    return arr
}

export const getPoints = (x, y, gap = 1) => {
    let nX = x
    let nY = y

    if (gap > 1) {
        nX = x - (RECT_WIDTH * gap) / 3
        nY = y - (RECT_HEIGHT * gap) / 3
    }

    const curWidth = RECT_WIDTH * gap
    const curHeight = RECT_HEIGHT * gap

    const topLeft = `${nX}, ${nY} `
    const topRight = `${nX + curWidth}, ${nY} `
    const bottomRight = `${nX + curWidth}, ${nY + curHeight} `
    const bottomLeft = `${nX}, ${nY + curHeight} `

    return topLeft + topRight + bottomRight + bottomLeft
}
