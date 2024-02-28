import React from 'react';
import './Footer.css'


function Footer(props) {
    return (
        <section id="footer">
            <div className="footer">
                <div className="footer-top">
                    <div className="footer-top-name">
                        <h2>BoxingStore</h2>
                    </div>
                    <div className="footer-top-about">
                        <h2>about</h2>
                        <ul>
                            <li>
                                <a>Về Chúng Tôi</a>
                            </li>
                            <li>
                                <a>Tin Tức</a>
                            </li>
                            <li>
                                <a>Liên Hệ</a>
                            </li>
                            <li>
                                <a>Sản Phẩm</a>
                            </li>
                            <li>
                                <a><img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664"></img></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-top-sp">
                        <h2>Store information</h2>
                        <p>Support 0903711712 (07:00-21:00)</p>
                        <p>Support 0903711712 (07:00-21:00)</p>
                        <p>Delivery 1800 1080 (07:00-21:00)</p>
                    </div>
                    <div className="footer-top-delivery">
                        <h2>Delivery</h2>
                        <ul>
                            <li>
                                <a>Shipping methods</a>
                            </li>
                            <li>
                                <a>Payment</a>
                            </li>
                            <li>
                                <a>Cash voucher</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bot">
                    
                    <p>Copyright © 2023 BoxingStore. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}

export default Footer;