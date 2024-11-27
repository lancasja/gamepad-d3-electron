import * as React from 'react';
import * as d3 from 'd3';
import { RadialArc } from './RadialArc.jsx'
import { RadialDefs } from './RadialDefs.jsx'
import { RadialCenter } from './RadialCenter.jsx'

export const RadialMenu = ({
    width,
    height,
    items = []
}) => {
    const ref = React.useRef(null);
    const [activeArc, setActiveArc] = React.useState([]);

    const handleSetActiveArc = (index) => {
        
        setActiveArc((prevActiveArc) => {
            if (prevActiveArc.includes(index)) {
                return prevActiveArc.filter((arc) => arc !== index)
            } else {
                return [...prevActiveArc, index]
            }
        })
    }
    
    const totalArcs = items.length;
    const angleStep = (2 * Math.PI) / totalArcs;

    React.useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
    }, [width, height]);

    return (
        <svg ref={ref}>
            <RadialDefs />
            <RadialCenter label="Context" />
            { items.map(({ label, subItems }, index) => {
                const startAngle = index * angleStep;
                const endAngle = startAngle + angleStep;

                return (
                    <RadialArc
                        key={index}
                        label={label}
                        subItems={subItems}
                        startAngle={angleStep * index}
                        endAngle={angleStep * (index + 1)}
                        active={activeArc.includes(index)}
                        onClick={() => handleSetActiveArc(index)}
                    />
                )
            })}
        </svg>
    )
}
