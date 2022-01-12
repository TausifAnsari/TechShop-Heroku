import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageNonClick = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>
}

MessageNonClick.defaultProps = {
    variant: 'info',
  }
  

export default MessageNonClick

