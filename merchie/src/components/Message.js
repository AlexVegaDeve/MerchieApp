import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children}) => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            // eslint-disable-next-line
            <Alert variant = {variant} onClose={() => (setShow(false), localStorage.clear())} dismissible>
                {children}
            </Alert>
        )
    } else {
        return ( null )
    }
}

Message.defaultProps = {
    variant: 'info',
}

export default Message;