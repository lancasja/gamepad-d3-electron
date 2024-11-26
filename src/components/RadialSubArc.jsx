import * as React from 'react';
import * as d3 from 'd3'; import { radialSize, radialPadding } from '../data/constants.js';

export const RadialSubArc = ({
    innerRadius = 0,
    outerRadius = 100,
    startAngle = 0,
    endAngle = Math.PI / 4,
    label = 'SubItem',
}) => {
    const ref = React.useRef(null);

    const arc = d3.arc()
        .innerRadius(innerRadius + 100)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)

    const centroid = arc.centroid()

    React.useEffect(() => {
        d3.select(ref.current).selectAll('path#RadialSubArc').remove();

        const g = d3.select(ref.current)

        const path = g.append('path')
            .attr('id', 'RadialSubArc')
            .attr('d', arc)
            .attr('fill', '#4a5b6c')
            .attr('stroke', 'rgba(0, 0, 0, 0.25)')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')
            .attr('transform', 'scale(0.5)')

        path.transition()
            .duration(244)
            .ease(d3.easeBackOut)
            .attr('transform', 'scale(1)')

        const text = g.append('text')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('fill', '#fff')
            .attr('pointer-events', 'none')
            .attr('font-size', 12)
            .text(label)

        text.transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr('opacity', 1);
        
        path.on('mouseover', () => {
            path
                .transition()
                .attr('fill', '#5b6c7d')
                .attr('filter', 'url(#drop-shadow)')
                .attr('transform', 'scale(1.05)')
            
            text.transition()
                .attr('transform', 'scale(1.05)')
        });

        path.on('mouseout', () => {
            path
                .transition()
                .attr('fill', '#4a5b6c')
                .attr('filter', null)
                .attr('transform', 'scale(1)')
            
            text.transition()
                .attr('transform', 'scale(1)')
        });

        path.on('mouseup', () => {
            console.log('SubItem clicked', label)
        });
    }, []);

    return <g ref={ref} />;
};