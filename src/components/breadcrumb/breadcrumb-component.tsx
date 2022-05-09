import React from 'react';
import { Link } from "react-router-dom";
import BreadcrumbProps from './breadcrumb-props';

const Breadcrumb: React.FC<BreadcrumbProps> = properties => {
    return (
        <ol className="breadcrumb">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li className="active">
                {properties.activeLink || ""}
            </li>
        </ol>
    );
};

export default Breadcrumb;