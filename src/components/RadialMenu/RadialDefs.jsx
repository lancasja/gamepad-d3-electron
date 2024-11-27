import * as React from 'react';

export const RadialDefs = () => {
    const ref = React.useRef(null);

    return (
        <defs ref={ref}>
            <filter id="drop-shadow" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    )
}
