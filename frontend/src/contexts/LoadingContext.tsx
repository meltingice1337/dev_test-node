import { Spinner } from '@components/spinner/Spinner';
import React, { createContext, FunctionComponent, useState, useCallback, useContext } from 'react';


interface LoadingContextData {
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextData>({ setLoading: () => { void 0 } });

export const LoadingProvider: FunctionComponent = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setLoading }}>
            {props.children}
            {
                loading &&
                <div className="loading-container">
                    <Spinner />
                </div>
            }
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => useContext(LoadingContext);
