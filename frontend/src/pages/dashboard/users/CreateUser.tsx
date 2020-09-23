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
    const { handleSubmit, register, reset, errors, watch } = useForm();

    const onSubmit = useCallback((user: CreateUserModel) => {
        props.onCreateUser(user);
    }, [props.onCreateUser])

    useEffect(() => {
        if (props.visible) {
            reset();
        }
    }, [props.visible, reset])

    const renderInput = (type: string, label: string, name: string, placeholder: string, ref?: any) => {
        const errorMessages: any = {
            confirm: 'The passwords do not match',
            minLength: 'The password needs to be at least 8 characters'
        }

        return (
            <div className="form-group">
                <label className={`${errors[name] ? 'text-danger' : ''}`}>{label}</label>
                <input type={type} id={name} required className={`form-control ${errors[name] ? 'is-invalid' : ''}`} name={name} placeholder={placeholder} ref={ref} />
                {
                    errors[name]?.type &&
                    <small id="passwordHelp" className="text-danger">
                        {errorMessages[errors[name].type]}
                    </small>
                }
            </div>
        )
    }

    return (
        <Modal shown={props.visible} onClose={props.onClose} header="Create external user">
            <form className="d-flex flex-column flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" required className="form-control" name="username" placeholder="Enter username" ref={register()} />
                </div>
                {renderInput("password", "Password", "password", "Password", register({ minLength: 8 }))}
                {renderInput("password", "Confirm password", "confirmPassword", "Enter password confirmation", register({ validate: { confirm: (v) => v === watch('password') }, }))}
                <button type="submit" className="btn btn-primary btn-block mt-auto">Create</button>
            </form>
        </Modal>
    )
}