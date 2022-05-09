import React from 'react';
import CustomerDetailViewerProps from './customer-detail-viewer-props';

const CustomerDetailViewer: React.FC<CustomerDetailViewerProps> = props => {
    let markup = (
        <div className="modal fade" id={`customer-${props.customer?.customerId}`} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">
                            Customer Detail of {props.customer?.customerName}
                        </h4>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img alt="Customer"
                                    src={props.customer?.photoUrl}
                                    className="img img-responsive img-rounded" />
                            </div>

                            <div className="col-md-8">
                                <table className="table table-responsive table-condensed table-hover">
                                    <thead>
                                        <tr>
                                            <th>Property Name</th>
                                            <th>Property Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Customer Profile Id:</td>
                                            <td> {props.customer?.customerId} </td>
                                        </tr>

                                        <tr>
                                            <td>Business Contact Name:</td>
                                            <td> {props.customer?.customerName} </td>
                                        </tr>

                                        <tr>
                                            <td>Customer Address:</td>
                                            <td> {props.customer?.address} </td>
                                        </tr>

                                        <tr>
                                            <td>Email:</td>
                                            <td> {props.customer?.email} </td>
                                        </tr>

                                        <tr>
                                            <td>Phone Number:</td>
                                            <td> {props.customer?.phoneNumber} </td>
                                        </tr>

                                        <tr>
                                            <td>Customer Type:</td>
                                            <td> {props.customer?.customerType} </td>
                                        </tr>

                                        <tr>
                                            <td>Customer Credit Limit:</td>
                                            <td> {props.customer?.creditLimit} </td>
                                        </tr>

                                        <tr>
                                            <td>Active Status:</td>
                                            <td>{props.customer?.activeStatus ? "TRUE": "FALSE"} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                Customer Remarks:
                        
                                <br />

                                <p className="text-left">
                                    {props.customer?.remarks}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return markup;
};

export default CustomerDetailViewer;
