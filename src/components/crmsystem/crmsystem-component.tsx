import React from 'react';
import { connect } from 'react-redux';
import { CustomerProfile } from '../../models';
import { AuthenticationTokenService, BrowserHistoryService, CustomerService, pushNotificationService } from '../../services';
import { CustomerMap } from '../../utilities';
import { Breadcrumb } from '../breadcrumb';
import { CustomerViewer } from '../customer-viewer';
import { SearchPanel } from '../search-panel';
import CrmSystemProps from './crmsystem-props';

const MIN_CUSTOMRES = 1;
const NEW_CUSTOMER_RECORD = "NewCustomerRecord";
const REDIRECT_TO_HOME_FOR_INVALID_TOKEN = "/sign-in";

interface CrmSystemState {
    customers: CustomerProfile[];
}

class CrmSystem extends React.Component<CrmSystemProps, CrmSystemState> {
    constructor(props: CrmSystemProps) {
        super(props);

        this.state = {
            customers: []
        };
    }

    // TODO: BEFORE REACT LOADS THE COMPONENT, WE NEED TO CHECK THE TOKEN 
    // REDIRECT TO SIGNIN
    // DEPRECATED
    componentWillMount() {
        const token = AuthenticationTokenService.getAuthToken();

        if (!token) {
            BrowserHistoryService.navigate(REDIRECT_TO_HOME_FOR_INVALID_TOKEN);
        }
    }

    componentDidCatch() {
        BrowserHistoryService.navigate(REDIRECT_TO_HOME_FOR_INVALID_TOKEN);
    }

    componentDidMount() {
        if (typeof this.props.getCustomers === 'function') {
            this.props.getCustomers();
        }

        pushNotificationService.register(NEW_CUSTOMER_RECORD,
            (payload: any) => {
                if (payload !== null) {
                    const customerProfile = CustomerMap.transform(payload);
                    const existingCustomers = this.state.customers || [];

                    this.setState({
                        customers: [...existingCustomers, customerProfile]
                    });
                }
            });
    }

    componentWillReceiveProps() {
        this.setState({
            customers: this.props.customers || []
        });
    }

    componentDidUpdate() {
        if (this.props.error !== undefined && this.props.error.errorText !== undefined) {
            const errorTitle = `ERROR - ${this.props.error.errorText}`;
            const navigateTo = "app-error";

            BrowserHistoryService.navigate(navigateTo, errorTitle);
        }
    }

    filterCustomers(searchString: string) {
        const validation = searchString !== undefined &&
            searchString !== "" && searchString !== null;

        if (validation) {
            if (this.props.customers !== undefined) {
                const filteredCustomers = this.props.customers.filter(
                    customer => customer.customerName.indexOf(searchString) >= 0);

                this.setState({
                    customers: filteredCustomers
                });
            }
        } else {
            this.setState({
                customers: this.props.customers || []
            });
        }
    }

    render() {
        let markup = (<></>);

        const isLoading = this.props.isLoading !== undefined && this.props.isLoading === true;
        const isCustomersDataAvailable =
            this.state.customers !== undefined &&
            this.state.customers.length >= MIN_CUSTOMRES;

        let customersMarkup;

        if (isCustomersDataAvailable) {
            customersMarkup = (
                <div className='row'>
                    {
                        this.state.customers?.map(customerRecord => (
                            <div className='col-md-3' key={customerRecord.customerId}>
                                <CustomerViewer customer={customerRecord} />
                            </div>))
                    }
                </div>
            );
        }

        markup = (
            <>
                <header id="head" className="secondary"></header>
                <div className="container">
                    <Breadcrumb activeLink="Customers" />

                    <br />

                    <div className="row">
                        <article className="col-sm-12 maincontent">
                            {isLoading && (
                                <div>
                                    Loading ... Please Wait ...
                                </div>
                            )}

                            <SearchPanel handleSearch={
                                searchString => this.filterCustomers(searchString)} />

                            {isCustomersDataAvailable && customersMarkup}
                        </article>
                    </div>
                </div>
            </>
        )

        return markup;
    }
}

const mapStateToProps = (state: any = {}) => {
    return {
        customers: state.fillCustomers,
        isLoading: state.isLoading,
        error: state.errorOccurred
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCustomers: () => dispatch(CustomerService.getCustomers())
    };
};

const ConnectedCrmSystem =
    connect(mapStateToProps, mapDispatchToProps)(CrmSystem);

export default ConnectedCrmSystem;