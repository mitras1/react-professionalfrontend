import { Contact } from "../contact";
import { Copyright } from "../copyright";
import { Followme } from "../followme";
import { Summary } from "../summary";

const Footer = () => {
    return (
        <footer id="footer" className="top-space">
            <div className="footer1">
                <div className="container">
                    <div className="row">
                        <Contact />
                        <Followme />
                        <Summary />
                    </div>
                </div>
            </div>

            <Copyright />
        </footer>

    );
};

export default Footer;