import { CustomerProfile } from "../models";

const DEFAULT_PHOTOS_FOLDER = "/assets/images/people/";
const PHOTOS_FOLDER = process.env.REACT_APP_PHOTOS_FOLDER || DEFAULT_PHOTOS_FOLDER;

const CustomerMap = {
    transform(customer: any): CustomerProfile {
        const photoUrl = `${PHOTOS_FOLDER}/Customer${customer.customerId}.jpg`;

        return new CustomerProfile(customer.customerId, customer.customerName,
            customer.address, customer.email, customer.phoneNumber,
            customer.customerType, customer.creditLimit,
            customer.activeStatus, customer.remarks, photoUrl);
    }
};

export default CustomerMap;