import { useHistory } from "react-router-dom";
import { CustomerActionCreators } from "../action-creators";
import { CustomerProfile, UserProfile } from "../models";
import { CustomerMap } from "../utilities";
import AuthenticationTokenService from "./authentication-token-service";

const DEFAULT_CUSTOMER_SERVICE_URL = "https://localhost:44300/api/customers";
const INVALID_CUSTOMER_ARGUMENTS = "Invalid Customer Argument(s) Specified!";
const MIN_CREDIT = 1;

async function saveCustomeRecord(customerProfile: CustomerProfile): Promise<boolean> {
    const validation = customerProfile !== undefined &&
        customerProfile.customerId && customerProfile.customerName &&
        customerProfile.creditLimit >= MIN_CREDIT;
    let status: boolean = false;

    if (!validation) {
        throw new Error(INVALID_CUSTOMER_ARGUMENTS);
    }

    const requestUrl = process.env.REACT_APP_CUSTOMER_SERVICE_URL || DEFAULT_CUSTOMER_SERVICE_URL;
    const token = AuthenticationTokenService.getAuthToken();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customerProfile)
    };

    const response = await fetch(requestUrl, requestOptions);

    if (!response.ok) {
        status = false;
    } else {
        const parsedJson = await response.json();

        status = parsedJson === true;
    }

    return status;
}

const CustomerService = {
    getCustomers: () => {
        return (dispatch: any) => {
            const validation = dispatch !== undefined || dispatch !== null;
            const requestUrl = process.env.REACT_APP_CUSTOMER_SERVICE_URL || DEFAULT_CUSTOMER_SERVICE_URL;

            dispatch(CustomerActionCreators.createIsLoading(true));

            const token = AuthenticationTokenService.getAuthToken();

            if (!token) {
                return;
            }

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            fetch(requestUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        dispatch(CustomerActionCreators.createErrorOccurred({
                            errorText: response.statusText
                        }));

                        return;
                    }

                    return response;
                })
                .then(response => response?.json())
                .then((customers: any[]) => {
                    const mappedCustomers = customers.map(
                        customer => CustomerMap.transform(customer));

                    dispatch(CustomerActionCreators.createFillCustomers(mappedCustomers));
                })
                .catch(error => dispatch(CustomerActionCreators.createErrorOccurred({
                    errorText: error
                })))
                .finally(() => dispatch(CustomerActionCreators.createIsLoading(false)));
        };
    },
    saveCustomerRecord: saveCustomeRecord
};

export default CustomerService;
