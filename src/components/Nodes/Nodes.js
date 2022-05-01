import React from 'react'
import * as d3 from 'd3'

const Nodes = (props) => {
    const svgRef = React.useRef(null)
    const width = 1000
    const height = 1000
    const radius = 6
    const step = radius * 2
    const theta = Math.PI * (3 - Math.sqrt(5))

    const chart = () => {
        if (!svgRef.current) {
            return
        }
        let currentTransform = [width / 2, height / 2, height]
        const svgEl = d3.select(svgRef.current)

        const g = svgEl.append('g')

        g.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', ([x]) => x)
            .attr('cy', ([, y]) => y)
            .attr('r', radius)
            .attr('fill', (d, i) => d3.interpolateRainbow(i / 360))

        function transition () {
            const d = data[Math.floor(Math.random() * data.length)]
            const i = d3.interpolateZoom(currentTransform, [...d, radius * 2 + 1])

            g.transition()
                .delay(250)
                .duration(i.duration)
                .attrTween('transform', () => t => transform(currentTransform = i(t)))
                .on('end', transition)
        }

        function transform ([x, y, r]) {
            return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `
        }

        return svgEl.call(transition).node()
    }

    const data = Array.from({ length: 2000 }, (_, i) => {
        const r = step * Math.sqrt(i += 0.5)
        const a = theta * i

        return [
            width / 2 + r * Math.cos(a),
            height / 2 + r * Math.sin(a)
        ]
    })

    React.useEffect(() => {
        chart()
    }, [svgRef])

    return (
        <div>
            <svg ref={svgRef} width={width} height={height} />
        </div>
    )
}

export default Nodes
