import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import NavigationProps from './navigation-props';

const Navigation: React.FC<NavigationProps> = props => {
    const isAuthenticated = props.authenticationStatus !== undefined &&
        props.authenticationStatus === true;

    return (
        <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
                <li className="active">
                    <Link to="/">Home</Link>
                </li>

                <li><Link to="/about-us">About Us</Link></li>

                <li>
                    <Link to="/contact-us">Contact</Link>
                </li>

                {isAuthenticated && (
                    <li>
                        <Link to="/crm-system">Customers</Link>
                    </li>
                )}

                {isAuthenticated && (
                    <li>
                        <Link to="/new-customer">New Customer</Link>
                    </li>
                )}

                {!isAuthenticated && (
                    <li>
                        <Link to="/sign-in">Sign-In / Sign-Up</Link>
                    </li>
                )}

                {isAuthenticated && (
                    <li>
                        <Link to="/user-profile" style={{ color: 'yellow' }}>
                            Welcome {props.userProfile?.userProfileId},
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        authenticationStatus: state.authenticationStatus,
        userProfile: state.userProfile
    };
};

const ConnectedNavigation = connect(mapStateToProps)(Navigation);

export default ConnectedNavigation;
