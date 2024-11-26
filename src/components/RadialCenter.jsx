import * as React from 'react';
import * as d3 from 'd3';
import { radialSize, radialPadding } from '../data/constants.js';

export const RadialCenter = ({
    innerRadius = 0,
    outerRadius = 63,
    startAngle = 0,
    endAngle = Math.PI * 2,
    label = 'Center',
}) => {
    const ref = React.useRef(null);
    const [active, setActive] = React.useState(false);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)

    const centroid = arc.centroid()

    React.useEffect(() => {
        d3.select(ref.current).selectAll('path#RadialCenter').remove()
        d3.select(ref.current).selectAll('text#RadialCenterText').remove()

        const g = d3.select(ref.current)
            .attr('transform', `translate(${radialSize / 2}, ${radialSize / 2})`)
            .on('mouseup', () => {
                setActive(!active)
            })

        const path = g.append('path')
            .attr('id', 'RadialCenter')
            .attr('d', arc)
            .attr('fill', '#1a2b3c')
            .attr('stroke', 'rgba(20, 30, 40, 1)')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')

        const text = g.append('text')
            .attr('id', 'RadialCenterText')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.5em')
            .attr('fill', '#ddd')
            .attr('pointer-events', 'none')
            .text(label)

        text
            .transition()
            .duration(200)
            .ease(d3.easeSinInOut)
            .attr('transform', `scale(${active ? 1.01 : 1})`)

        path.transition()
            .duration(244)
            .ease(d3.easeSinInOut)
            .attr('transform', `scale(${active ? 1.01 : 1})`)

        path.on('mouseover', () => {
            path
                .transition()
                .duration(200)
                .ease(d3.easeCircle)
                .attr('filter', 'url(#drop-shadow)')
                .attr('fill', '#2a3b4c')
                .attr('transform', `scale(${active ? 1.01 : 1.03})`)

            text
                .transition()
                .duration(200)
                .ease(d3.easeCircle)
                .attr('transform', `scale(${active ? 1.01 : 1.03})`)
        })

        path.on('mouseout', () => {
            path
                .transition()
                .duration(244)
                .ease(d3.easeCircle)
                .attr('filter', active ? 'url(#drop-shadow)' : null)
                .attr('fill', `${active ? '#2a3b4c' : '#1a2b3c'}`)
                .attr('transform', `scale(${active ? 1.01 : 1})`)

            text
                .transition()
                .duration(244)
                .ease(d3.easeCircle)
                .attr('transform', `scale(${active ? 1.01 : 1})`)
        })
    }, [active]);

    return (
        <g ref={ref} />
    )
}
