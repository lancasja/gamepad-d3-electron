import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { RadialMenu } from './components/RadialMenu'
import { FilmStrip } from './components/FilmStrip'

import {
    radialSize,
    defaultRadialItems,
    defaultRadialItems2,
    defaultRadialItems3,
    defaultRadialItems4,
    defaultRadialItems5
} from './data/constants.js';

const App = () => {
    const configs = [
        defaultRadialItems,
        defaultRadialItems2,
        defaultRadialItems3,
        defaultRadialItems4,
        defaultRadialItems5
    ]

    const [activeConfig, setActiveConfig] = React.useState(0)

    return (
        <>
            <RadialMenu
                width={radialSize}
                height={radialSize}
                items={configs[activeConfig]}
            />
            {/* <FilmStrip /> */}
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);