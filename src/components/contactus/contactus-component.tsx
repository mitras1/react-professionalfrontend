import { Breadcrumb } from "../breadcrumb";
import { ContactAddress } from "../contactaddress"
import { ContactMap } from "../contactmap"

const ContactUs = () => {
    return (
        <>
            <header id="head" className="secondary"></header>

            <div className="container">
                <Breadcrumb activeLink="Contact" />

                <div className="row">
                    <article className="col-sm-9 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Contact us</h1>
                        </header>

                        <p>
                            We’d love to hear from you. Interested in working together? Fill out the form below with some info about your project and I will get back to you as soon as I can. Please allow a couple days for me to respond.
				        </p>

                        <br />

                        <form>
                            <div className="row">
                                <div className="col-sm-4">
                                    <input className="form-control" type="text" placeholder="Name" />
                                </div>
                                <div className="col-sm-4">
                                    <input className="form-control" type="text" placeholder="Email" />
                                </div>
                                <div className="col-sm-4">
                                    <input className="form-control" type="text" placeholder="Phone" />
                                </div>
                            </div>

                            <br />

                            <div className="row">
                                <div className="col-sm-12">
                                    <textarea placeholder="Type your message here..." className="form-control" rows={9}></textarea>
                                </div>
                            </div>

                            <br />

                            <div className="row">
                                <div className="col-sm-6">
                                    <label className="checkbox"><input type="checkbox" /> Sign up for newsletter</label>
                                </div>
                                <div className="col-sm-6 text-right">
                                    <input className="btn btn-action" type="submit" value="Send message" />
                                </div>
                            </div>
                        </form>
                    </article>

                    <ContactAddress />
                </div>
            </div>

            <ContactMap />
        </>

    );
};

export default ContactUs;
