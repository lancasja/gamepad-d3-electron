import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { RadialMenu } from './components/RadialMenu.jsx'
import { radialSize, defaultRadialItems } from './data/constants.js';

const App = () => {
    return (
        <>
            <RadialMenu
                width={radialSize}
                height={radialSize}
                items={defaultRadialItems}
            />
        </>
    )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);