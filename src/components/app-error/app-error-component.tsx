import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "../breadcrumb";

const AppError = () => {
    return (
        <>
            <header id="head" className="secondary"></header>

            <div className="container">
                <Breadcrumb activeLink="Error" />
                <div className="row">
                    <article className="col-sm-8 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Application Error</h1>
                        </header>
                        <h3>Lorem ipsum</h3>
                    </article>
                </div>
            </div>

            <br />

            <Link to="/home">Return to Home</Link>
        </>
    )
};

export default AppError;
