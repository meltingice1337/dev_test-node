import React, { FunctionComponent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SignUpForm } from './SignUp.model';

import { useLoadingContext } from '@contexts/LoadingContext';

import AuthenticationService from '@services/AuthenticationService';

const SignUp: FunctionComponent = () => {
    const { handleSubmit, register, watch, errors } = useForm();

    const history = useHistory();
    const { setLoading } = useLoadingContext();

    const onSubmit = useCallback(async (data: SignUpForm): Promise<void> => {
        console.log(data)
        setLoading(true);
        const response = await AuthenticationService.signup({ username: data.username, password: data.password });
        if (response) {
            history.push('/sigin');
            setLoading(false);
            toast.success('Your account was created with success. You can login now.');
            return;
        }
        setLoading(false);
    }, [setLoading])

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign up</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" required className="form-control" name="username" placeholder="Enter username" ref={register()} />
            </div>

            {renderInput("password", "Password", "password", "Password", register({ minLength: 8 }))}
            {renderInput("password", "Confirm password", "confirmPassword", "Enter password confirmation", register({ validate: { confirm: (v) => v === watch('password') }, }))}

            <button type="submit" className="btn btn-primary btn-block">Signup</button>
            <p className="sign-up text-right">
                Already have an account ? <Link to="/signin">Login</Link>
            </p>
        </form>
    )
}

export default SignUp;