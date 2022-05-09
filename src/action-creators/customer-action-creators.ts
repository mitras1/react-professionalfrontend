import { CustomerActionTypes } from "../action-types";
import { CustomerAction } from "../actions";
import { CustomerProfile } from "../models";

const CustomerActionCreators = {
    createFillCustomers: (customers: CustomerProfile[] = []): CustomerAction => {
        return {
            type: CustomerActionTypes.FillCustomers,
            customers: customers
        };
    },
    createIsLoading: (loadingStatus: boolean = false): CustomerAction => {
        return {
            type: CustomerActionTypes.IsLoading,
            isLoading: loadingStatus
        };
    },
    createErrorOccurred: (error: { errorText?: string } = {}): CustomerAction => {
        return {
            type: CustomerActionTypes.ErrorOccurred,
            errorOccurred: {
                errorText: error.errorText
            }
        };
    }
};

export default CustomerActionCreators;
