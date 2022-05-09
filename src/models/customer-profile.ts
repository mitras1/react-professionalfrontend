class CustomerProfile {
    public constructor(public customerId: number, public customerName: string,
        public address: string, public email: string, public phoneNumber: string,
        public customerType: string, public creditLimit: number,
        public activeStatus: boolean, public remarks: string, public photoUrl?: string) {
    }
}

export default CustomerProfile;
