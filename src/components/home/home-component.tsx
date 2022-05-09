import React from 'react';
import { Faq } from "../faq";
import { Reasons } from "../reasons";
import { Social } from "../social";
import HomeProps from './home-props';

const Home: React.FC<HomeProps> = props => {
    return (
        <>
            <header id="head">
                <div className="container">
                    <div className="row">
                        <h1 className="lead"> {props.title} </h1>
                        <p className="tagline">PROGRESSUS: free business bootstrap template by <a href="http://www.gettemplate.com/?utm_source=progressus&amp;utm_medium=template&amp;utm_campaign=progressus">GetTemplate</a></p>
                        <p><a href="/" className="btn btn-default btn-lg" role="button">MORE INFO</a> <a href="/" className="btn btn-action btn-lg" role="button">DOWNLOAD NOW</a></p>
                    </div>
                </div>
            </header>

            <div className="container text-center">
                <br /> <br />
                <h2 className="thin">The best place to tell people why they are here</h2>
                <p className="text-muted">
                    The difference between involvement and commitment is like an eggs-and-ham breakfast:<br />
                        the chicken was involved; the pig was committed.
            </p>
            </div>

            <Reasons />
            <Faq />
            <Social />
        </>
    );
};

export default Home;