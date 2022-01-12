//just a message component for Error

import React from 'react'
import { Alert } from 'react-bootstrap'
import { useState } from 'react';

const Message = ({variant, children}) => {
    const [show, setShow] = useState(true);

    return (
        <div>
            {show ? (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                {children}
            </Alert>
            )
             : (null)}
        </div>
    )
}

Message.defaultProps = {
    variant: 'info',
}

export default Message
