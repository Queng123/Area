import React from 'react';
import './NotFound.css';

export function NotFound() {
    return (
        <div className="centered">
            <div className="error-code">
                404
            </div>
            <div className="code-message">
                Not Found
            </div>
            <div>
                The ressource requested could not be found on this server!
            </div>
        </div>
    )
}
