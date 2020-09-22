import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal } from '@components/modal/Modal';
import { CreateUserModel } from '@models/user.models';

interface CreateUserProps {
    onCreateUser: (user: CreateUserModel) => void;
    visible: boolean;
    onClose: () => void;
};

export const CreateUser: FunctionComponent<CreateUserProps> = (props) => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = useCallback((user: CreateUserModel) => {
        props.onCreateUser(user);
    }, [props.onCreateUser])

    useEffect(() => {
        if (props.visible) {
            reset();
        }
    }, [props.visible, reset])

    return (
        <Modal shown={props.visible} onClose={props.onClose} header="Create external user">
            <form className="d-flex flex-column flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" required className="form-control" name="username" placeholder="Enter username" ref={register()} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" required className="form-control" name="password" placeholder="Enter password" ref={register()} />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-auto">Create</button>
            </form>
        </Modal>
    )
}