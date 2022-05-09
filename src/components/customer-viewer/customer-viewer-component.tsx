import React from 'react';
import { CustomerDetailViewer } from '../customer-detail-viewer';
import CustomerViewerProps from './customer-viewer-props';

const CustomerViewer: React.FC<CustomerViewerProps> = props => {
    let remarks = "";
    let name = "";

    if (props.customer) {
        remarks = props.customer?.remarks.length >= 20 ?
            `${props.customer?.remarks.substr(0, 20)} ...` : props.customer?.remarks;

        name = props.customer?.customerName.length >= 12 ?
            `${props.customer?.customerName.substr(0, 12)} ...` : props.customer?.customerName;
    }

    let markup = (
        <div className="thumbnail">
            <img src={props.customer?.photoUrl} alt="Customer"
                title="Customer Photo of {this.props.customer.name}" />
            <div className="caption">
                <h3>
                    {name}
                </h3>

                <p>
                    {remarks}
                </p>

                <p>
                    <a href="/dashboard" className="btn btn-primary" role="button">Dashboard</a>

                    &nbsp;

                    <button className="btn btn-default"
                        data-target={`#customer-${props.customer?.customerId}`}
                        data-toggle='modal'>
                        Details
                    </button>
                </p>
            </div>

            <div>
                <CustomerDetailViewer customer={props.customer} />
            </div>
        </div>);

    return markup;
};

export default CustomerViewer;
