import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

import { SignInForm } from './SignIn.model';

const SignUp: FunctionComponent = () => {
    const { handleSubmit, register } = useForm();

    const onSubmit = (data: SignInForm): void => {
        console.log({ data })
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