import React from 'react';
import {NavLink} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const MyAccount = () => {
        return(
            <Container className="mt-5">
                <Row>
                    <Col sm={1} md={4} lg={4}>
                        <div className="mt-5">
                            <div>
                                <span>User Account Details</span>
                            </div>
                            <NavLink to="/Purchases">View my purchases</NavLink>
                        </div>                               
                    </Col>
                    <Col sm={1} md={4} lg={4}>
                        <div className="mt-5">
                            <NavLink to="/resetPassword">Reset Password</NavLink>
                        </div>                        
                    </Col>
                </Row>
             
            </Container>

        )
    }

export default MyAccount;