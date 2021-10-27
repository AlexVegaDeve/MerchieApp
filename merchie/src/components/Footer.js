import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Container className="pt-5">
            <Row>
                <Col className="text-center py-3">
                    <footer>
                        Alexander Vega, For Cognizant
                    </footer>
                </Col>
                <Col className="text-center py-3">
                    <h5>Support</h5>
                    <h6>Email : support@lttstoreclone.com</h6>
                </Col>
                <Col className="text-center py-3">
                    <h5> Info </h5>
                    <Link to="/" className="footerLink"> <h6> Shipping </h6> </Link>
                    <Link to="/" className="footerLink"> <h6> Customs and duty fees </h6></Link>
                    <Link to="/" className="footerLink"> <h6> Return policy </h6></Link>
                </Col>
            </Row>
 
        </Container>

    )
}

export default Footer;