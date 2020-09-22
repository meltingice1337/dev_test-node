import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { SignInForm } from './SignIn.model';

import AuthenticationService from '@services/AuthenticationService';
import { useAuthContext } from '@contexts/AuthenticationContext';

const SignUp: FunctionComponent = () => {
    const { handleSubmit, register } = useForm();

    const { authenticate } = useAuthContext();
    const history = useHistory();

    const onSubmit = async (data: SignInForm): Promise<void> => {
        const response = await AuthenticationService.login({ username: data.username, password: data.password });
        if (response) {
            const token = response.data;
            authenticate(token);

            if (data.rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            history.push('/');

        } else {
            toast.error('Invalid credentials !');
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" required className="form-control" name="username" placeholder="Enter username" ref={register()} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" required className="form-control" name="password" placeholder="Enter password" ref={register()} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input name="rememberMe" type="checkbox" className="custom-control-input" id="rmbCheckbox" ref={register()} />
                    <label className="custom-control-label" htmlFor="rmbCheckbox">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <p className="sign-up text-right">
                Dont have an <a href="#">account?</a>
            </p>
        </form>
    )
}

export default SignUp;