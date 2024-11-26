import * as React from 'react';
import * as d3 from 'd3';

export const RadialDefs = () => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const defs = d3.select(ref.current)

        // Create a filter element
        const filter = defs.append('filter')
            .attr('id', 'drop-shadow')
            .attr('height', '120%');

        // Append filter primitives
        filter.append('feGaussianBlur')
            .attr('in', 'SourceAlpha')
            .attr('stdDeviation', 4)
            .attr('result', 'blur');

        filter.append('feOffset')
            .attr('in', 'blur')
            .attr('dx', 0)
            .attr('dy', 0)
            .attr('result', 'offsetBlur');

        const feMerge = filter.append('feMerge');

        feMerge.append('feMergeNode')
            .attr('in', 'offsetBlur');
            
        feMerge.append('feMergeNode')
            .attr('in', 'SourceGraphic');
    }, []);

    return (
        <defs ref={ref} />
    )
}
