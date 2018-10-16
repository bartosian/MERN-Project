import React  from 'react';
import './Footer.css';

const footer = (props) => {

        return (
            <div className="container footer">
                    <div className="col-12 col-md-7 footer-info">
                        <p className="copyright">
                            <i className="fa fa-copyright" aria-hidden="true"></i>
                            Bartashevich Kiryl
                        </p>
                        <div className="socials">
                            <p>Follow me: </p>
                            <div className="s-links">
                                <a href="https://www.linkedin.com/in/kirbart/" className="footer-link text-primary" target="blank"><i className="fa fa-linkedin-square"></i></a>
                                <a href="https://github.com/bartosian" className="footer-link" target="blank"><i className="fa fa-github-square" ></i></a>
                                <a href="https://myaccount.google.com/?utm_source=OGB&utm_medium=act" className="footer-link text-danger" target="blank"><i className="fa fa-envelope" ></i></a>
                            </div>
                        </div>
                    </div>
            </div>
        );
};

export default footer;