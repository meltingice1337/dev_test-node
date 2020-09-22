import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { SignUpForm } from './SignUp.model';

import AuthenticationService from '@services/AuthenticationService';
import { useAuthContext } from '@contexts/AuthenticationContext';

const SignUp: FunctionComponent = () => {
    const { handleSubmit, register } = useForm();

    const { authenticate } = useAuthContext();
    const history = useHistory();

    const onSubmit = async (data: SignUpForm): Promise<void> => {
        const response = await AuthenticationService.signup({ username: data.username, password: data.password });
        if (response) {
            history.push('/sigin');
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign up</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" required className="form-control" name="username" placeholder="Enter username" ref={register()} />
            </div>

            {/* TODO add password confirmation */}
            <div className="form-group">
                <label>Password</label>
                <input type="password" required className="form-control" name="password" placeholder="Enter password" ref={register()} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Signup</button>
            <p className="sign-up text-right">
                Already have an account ? <Link to="/signin">Login</Link>
            </p>
        </form>
    )
}

export default SignUp;