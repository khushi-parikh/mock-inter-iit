import React from "react";
import '../styles/footer.css'
import {
    FaGithub,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-title">
                    Meet the team!
                </div>
                <div>
                    <div className="person">
                        <a
                            href="https://github.com/Dhruv-Mahajan1"
                            target="_blank"
                            className="profile_link">
                                < FaGithub />
                                Dhruv
                        </a>

                    </div>
                    <div className="person">
                        <a
                            href="https://github.com/khushi-parikh"
                            target="_blank"
                            className="profile_link">
                                < FaGithub />

                                Khushi
                        </a>
                    </div>
                    <div className="person">
                        <a
                            href="https://github.com/Ronak-23"
                            target="_blank"
                            className="profile_link">
                                < FaGithub />
                                Ronak
                        </a>
                    </div>
                    <div className="person">
                        <a
                            href="https://github.com/zayed-shamshad"
                            target="_blank"
                            className="profile_link">
                                < FaGithub />
                                Zaid
                        </a>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;