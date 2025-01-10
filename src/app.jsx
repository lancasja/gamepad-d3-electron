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
    const [store, setStore] = React.useState({ data: null })

    React.useEffect(() => {
        // const handleStoreUpdate = (newStore) => {
        //     setStore(newStore)
        // }

        // window.electron.onStoreUpdate(handleStoreUpdate)

        // return () => {
        //     window.electron.onStoreUpdate(() => { })
        // }
    }, [])

    return (
        <>
            <p>Store update: { store.data }</p>
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