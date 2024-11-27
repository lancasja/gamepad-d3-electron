import { index } from 'd3'
import React from 'react'

export const FilStripItem = ({ label }) => {
    return (
        <div
            style={{
                background: 'white',
                padding: '1rem',
                flexShrink: 0,
            }}
        >
            {label}
        </div>
    )
}

export const Blur = ({ position }) => {
    const bgGradient = position === "right"
        ? `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`
        : `linear-gradient(-90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`

    return (
        <div
            style={{
                background: 'black',
                height: '100%',
                width: 20,
                position: 'absolute',
                background: bgGradient,
                top: 0,
                right: position === "right" ? 0 : 'auto',
                left: position === "right" ? 'auto' : 0,
            }}
        />
    )
}

export const FilmStrip = () => {
    const [items, setItems] = React.useState([
        { label: 'Item 1' },
        { label: 'Item 2' },
        { label: 'Item 3' },
    ])
    const [activeItem, setActiveItem] = React.useState(null)

    return (
        <div
            style={{
                background: 'salmon',
                padding: '1rem',
                width: '100px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Blur position="left" />
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    transform: `translateX(-80px)`,
                }}
            >
                {items.map((item, index) => (
                    <FilStripItem
                        key={index}
                        label={item.label}
                    />
                ))}
            </div>
            <Blur position="right" />
        </div>
    )
}
