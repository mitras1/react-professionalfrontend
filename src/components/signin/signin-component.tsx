import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCollectFormDataAndValidate } from '../../hooks';
import { AuthenticationService } from '../../services';
import { Breadcrumb } from "../breadcrumb"
import SigninProps from './signin-props';

const DEFAULT_SIGNIN_DATA = {
    userProfileId: "",
    password: ""
};

const DEFAULT_TIMEOUT = 3000;
const REDIRECT_TO_AFTER_SUCCESSFUL_AUTH = "/";

const Signin: React.FC<SigninProps> = props => {
    const [formStatus, setFormStatus] = useState(false);
    const history = useHistory();

    const handleSignin = (validationStatus?: boolean) => {
        setFormStatus(validationStatus || false);

        if (validationStatus !== undefined && validationStatus === true) {
            if (typeof props.authenticate === 'function') {
                props.authenticate(inputs.userProfileId, inputs.password,
                    () => {
                        setTimeout(() => {
                            if (props.authenticationStatus !== undefined &&
                                props.authenticationStatus === true) {
                                history.push(REDIRECT_TO_AFTER_SUCCESSFUL_AUTH);
                            }
                        }, DEFAULT_TIMEOUT);
                    });
            }
        }
    };

    const { handleSubmit, handleChange, inputs } =
        useCollectFormDataAndValidate(DEFAULT_SIGNIN_DATA, handleSignin);

    return (
        <>
            <header id="head" className="secondary"></header>

            <div className="container">
                <Breadcrumb activeLink="User Access" />

                <div className="row">

                    <article className="col-xs-12 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Sign in</h1>
                        </header>

                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h3 className="thin text-center">Sign in to your account</h3>
                                    <p className="text-center text-muted">Lorem ipsum dolor sit amet, <a href="signup.html">Register</a> adipisicing elit. Quo nulla quibusdam cum doloremque incidunt nemo sunt a tenetur omnis odio. </p>

                                    <hr />

                                    <form onSubmit={e => handleSubmit(e)}>
                                        <div className="top-margin">
                                            <label>Username/Email <span className="text-danger">*</span></label>
                                            <input type="text" value={inputs.userProfileId} name="userProfileId" onChange={e => handleChange(e)} className="form-control" />
                                        </div>

                                        <div className="top-margin">
                                            <label>Password <span className="text-danger">*</span></label>
                                            <input type="password" value={inputs.password} name="password" onChange={e => handleChange(e)} className="form-control" />
                                        </div>

                                        <hr />

                                        <div className="row">
                                            <div className="col-lg-8">
                                                <b><a href="/">Forgot password?</a></b>
                                            </div>
                                            <div className="col-lg-4 text-right">
                                                <button className="btn btn-action" type="submit">Sign in</button>
                                            </div>
                                        </div>

                                        <hr />

                                        {props.authenticationStatus !== undefined &&
                                            props.authenticationStatus === true &&
                                            props.authenticationError !== undefined && (
                                                <p className="text-center text-muted">
                                                    Authentication Status: Sucessful
                                                </p>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        userProfile: state.userProfile,
        authenticationStatus: state.authenticationStatus,
        authenticationError: state.authenticationErrorOccurred
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        authenticate: (userProfileId: string, password: string, callback?: () => void) =>
            dispatch(AuthenticationService.authenticate(userProfileId, password, callback))
    };
};

const ConnectedSignin = connect(mapStateToProps, mapDispatchToProps)(Signin);

export default ConnectedSignin;
