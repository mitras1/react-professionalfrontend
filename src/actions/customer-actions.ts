import { CustomerActionTypes } from "../action-types";
import { CustomerProfile } from "../models";
import BaseAction from "./base-action";

interface CustomerAction extends BaseAction {
    type?: CustomerActionTypes;
    customers?: CustomerProfile[];
    isLoading?: boolean;
    errorOccurred?: {
        errorText?: string;
    }
}

export default CustomerAction;
