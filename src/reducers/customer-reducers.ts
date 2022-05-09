import { CustomerActionTypes } from "../action-types";
import { CustomerAction } from "../actions";
import { CustomerProfile } from "../models";

const customerReducers = {
    fillCustomersReducer: (state: CustomerProfile[] = [], action: CustomerAction) => {
        let nextState = state;

        if (action.type === CustomerActionTypes.FillCustomers) {
            if (action.customers) {
                nextState = [...action.customers];
            }
        }

        return nextState;
    },
    isLoadingReducer: (state: boolean = false, action: CustomerAction) => {
        let nextState = state;

        if (action.type === CustomerActionTypes.IsLoading) {
            if (action.isLoading !== undefined) {
                nextState = action.isLoading;
            }
        }

        return nextState;
    },
    errorOccurredReducer: (state: { errorText?: string } = {}, action: CustomerAction) => {
        let nextState = state;

        if (action.type === CustomerActionTypes.ErrorOccurred) {
            if (action.errorOccurred !== undefined) {
                nextState = {
                    errorText: action.errorOccurred.errorText
                };
            }
        }

        return nextState;
    }
};

export default customerReducers;
