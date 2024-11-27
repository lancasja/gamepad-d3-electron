import * as React from 'react';
import * as d3 from 'd3';
import { radialSize, radialPadding } from '../../data/constants.js';
import { RadialSubArc } from './RadialSubArc.jsx'

export const RadialArc = ({
    innerRadius = 100,
    outerRadius = (radialSize / 2) - radialPadding,
    startAngle = 0,
    endAngle = Math.PI / 2,
    label = 'Item',
    active = false,
    subItems = ["A", "B", "C", "D"],
    onClick = () => { },
}) => {
    const ref = React.useRef(null);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)

    React.useEffect(() => {
        d3.select(ref.current).selectAll('path#RadialArc').remove()
        d3.select(ref.current).selectAll('text#RadialArcText').remove()

        const g = d3.select(ref.current)
            .attr('transform', `translate(${radialSize / 2}, ${radialSize / 2})`)
            .on('click', () => {
                onClick()
            })

        const path = g.append('path')
            .attr('id', 'RadialArc')
            .attr('d', arc)
            .attr('fill', '#1a2b3c')
            .attr('stroke', 'rgba(20, 30, 40, 1)')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')

        const centroid = arc.centroid()
        const text = g.append('text')
            .attr('id', 'RadialArcText')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .attr('fill', '#ddd')
            .attr('pointer-events', 'none')
            .text(label)

        text
            .transition()
            .duration(200)
            .ease(d3.easeSinInOut)
            .attr('transform', `scale(${active ? 0.7 : 1})`)

        path.transition()
            .duration(244)
            .ease(d3.easeSinInOut)
            .attr('transform', `scale(${active ? 0.7 : 1})`)

        path.on('mouseover', () => {
            path
                .transition()
                .duration(200)
                .ease(d3.easeCircle)
                .attr('filter', 'url(#drop-shadow)')
                .attr('fill', '#2a3b4c')
                .attr('transform', `scale(${active ? 0.7 : 1.03})`)

            text
                .transition()
                .duration(200)
                .ease(d3.easeCircle)
                .attr('transform', `scale(${active ? 0.7 : 1.03})`)
        })

        path.on('mouseout', () => {
            path
                .transition()
                .duration(244)
                .ease(d3.easeCircle)
                .attr('filter', active ? 'url(#drop-shadow)' : null)
                .attr('fill', `${active ? '#2a3b4c' : '#1a2b3c'}`)
                .attr('transform', `scale(${active ? 0.7 : 1})`)

            text
                .transition()
                .duration(244)
                .ease(d3.easeCircle)
                .attr('transform', `scale(${active ? 0.7 : 1})`)
        })
    }, [active]);

    const totalArcs = subItems.length;
    const angleStep = (endAngle - startAngle) / totalArcs;

    return (
        <g ref={ref}>
            {active && subItems.map((label, index) => {
                return (
                    <RadialSubArc
                        key={index}
                        label={label}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle + (angleStep * index)}
                        endAngle={startAngle + (angleStep * (index + 1))}
                    />
                )
            })}
        </g>
    )
}
