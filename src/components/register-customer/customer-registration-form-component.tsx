import React, { useState } from 'react';
import { Breadcrumb } from '../breadcrumb';
import CustomerRegistrationFormProps from './customer-registration-form-props';
import { CustomerProfile } from '../../models';
import { useCollectFormDataAndValidate } from '../../hooks';
import { CustomerService } from '../../services';
import { useHistory } from 'react-router-dom';

const DEFAULT_CUSTOMER_PROFILE: CustomerProfile = {
    customerId: Math.floor(Math.random() * (10000000 - 1) + 1),
    customerName: "",
    address: "",
    creditLimit: 0,
    activeStatus: false,
    email: "",
    phoneNumber: "",
    customerType: "",
    remarks: ""
};

const REDIRECT_TO_CUSTOMERS = "/crm-system";
const DEFAULT_TIMEOUT = 3000;

const CustomerRegistrationForm: React.FC<CustomerRegistrationFormProps> = props => {
    const [status, setStatus] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();

    const processCustomerRecord = async (validationStatus?: boolean) => {
        if (validationStatus !== undefined && validationStatus === true) {
            setStatus(true);

            const saveStatus = await CustomerService.saveCustomerRecord(inputs);

            if (saveStatus) {
                setMessage("Customer Information Saved Successfully!");

                setTimeout(() => history.push(REDIRECT_TO_CUSTOMERS), DEFAULT_TIMEOUT);
            } else {
                setMessage("Unable to save customer record!, Please try again later!");
            }
        }
    };

    const { handleSubmit, handleChange, inputs } =
        useCollectFormDataAndValidate(DEFAULT_CUSTOMER_PROFILE, processCustomerRecord);

    return (
        <>
            <header id="head" className="secondary"></header>

            <div className="container">
                <Breadcrumb activeLink="New Customer" />

                <br />

                <div className="row">
                    <div className='col-md-12'>
                        <div>
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="well well-sm">
                                        <h5>New Customer Portfolio Management</h5>
                                        <h6>This would help to create a new customer record in the CRM System</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10">
                                    <form className="form-horizontal" onSubmit={e => handleSubmit(e)}>
                                        <div className="form-group">
                                            <label htmlFor="inputCustomerId" className="col-sm-2 control-label">Customer Id:</label>
                                            <div className="col-sm-10">
                                                <input type="text" readOnly className="form-control"
                                                    value={inputs.customerId}
                                                    name="customerId" id="inputCustomerId" placeholder="Enter Customer Name Here ..." />
                                                <input type="hidden" value={inputs.customerId} name="customerId" id="inputCustomerId" />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerName" className="col-sm-2 control-label">Customer Name:</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" value={inputs.customerName}
                                                    onChange={e => handleChange(e)}
                                                    name="customerName" id="inputCustomerName"
                                                    placeholder="Enter Customer Name Here ..." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerAddress" className="col-sm-2 control-label">Business Address:</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control" name="address"
                                                    id="inputCustomerAddress"
                                                    value={inputs.address} onChange={e => handleChange(e)}
                                                    placeholder="Enter Customer Address Here ...">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCreditLimit" className="col-sm-2 control-label">Credit Limit:</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    name="creditLimit"
                                                    value={inputs.creditLimit} onChange={e => handleChange(e)}
                                                    id="inputCreditLimit" placeholder="Enter Credit Limit Here ..." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerEmail" className="col-sm-2 control-label">Email Id:</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    value={inputs.email} onChange={e => handleChange(e)}
                                                    name="email" id="inputCustomerEmail"
                                                    placeholder="Enter Customer Email Here ..." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerPhone" className="col-sm-2 control-label">Phone Number:</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    value={inputs.phoneNumber} onChange={e => handleChange(e)}
                                                    name="phoneNumber" id="inputCustomerPhone"
                                                    placeholder="Enter Customer Phone Here ..." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerType" className="col-sm-2 control-label">Customer Type:</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    value={inputs.customerType} onChange={e => handleChange(e)}
                                                    name="customerType" id="inputCustomerType"
                                                    placeholder="Enter Customer Type Here ..." />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox"
                                                            onChange={e => handleChange(e, "activeStatus", e.target.checked ? true : false)}
                                                            value={inputs.activeStatus === true ? "on" : "off"}
                                                            name="activeStatus" /> Active Status
                                                        </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="inputCustomerRemarks" className="col-sm-2 control-label">Customer Remarks:</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control"
                                                    value={inputs.remakrs} onChange={e => handleChange(e)}
                                                    name="remarks" id="inputCustomerRemarks"
                                                    placeholder="Enter Customer Remarks Here ...">
                                                </textarea>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-sm-offset-2 col-sm-10">
                                                <input type="submit" className="btn btn-default" value="Save" />
                                                &nbsp;
                                                <input type="reset" value="Reset" className="btn btn-danger" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {message !== "" && (
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="well well-sm">
                                            <h6>{message}</h6>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerRegistrationForm;
