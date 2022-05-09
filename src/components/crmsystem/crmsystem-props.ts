import { CustomerProfile } from "../../models";

interface CrmSystemProps {
    customers?: CustomerProfile[],
    isLoading?: boolean;
    error?: {
        errorText?: string
    },
    getCustomers: () => void;
}

export default CrmSystemProps;
