import React, { FunctionComponent } from 'react';
import { RouteRenderer } from './components/route-renderer/RouteRenderer';


import { routes } from './routes';

const App: FunctionComponent = () => {

    return (
        <RouteRenderer routes={routes} />
    )
}

export default App;