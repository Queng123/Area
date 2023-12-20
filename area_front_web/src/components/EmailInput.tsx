import React, { useState } from 'react';
import "../styles/EmailInput.css";

interface EmailInputProps {
    onEmailChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onEmailChange }) => {

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        onEmailChange(newEmail);
    };

    return (
        <div className="email-input-container">
            <div className="email-input">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
            </div>
        </div>
    );
};

export default EmailInput;