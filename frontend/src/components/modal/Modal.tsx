import React, { FunctionComponent, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ModalProps } from './Modal.model';

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = (props: PropsWithChildren<ModalProps>): JSX.Element | null => {
    const onKeyUp = (event: React.KeyboardEvent<HTMLDocument>): void => {
        if (event.key === 'Escape') {
            props.shown && props.onClose && props.onClose();
        }
    };

    const modalBackDropRef = useRef(null);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp.bind(null));
        return (): void => window.removeEventListener('keyup', onKeyUp.bind(null));
    }, [props.shown]);

    if (props.shown) {
        return ReactDOM.createPortal(
            <>
                <div className="modal" ref={modalBackDropRef} >
                    <div className="modal-dialog">
                        <div className="modal-header">
                            {props.header}
                            <span className="close" onClick={props.onClose} >&times;</span>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </>,
            document.body
        );
    } else {
        return null;
    }
};