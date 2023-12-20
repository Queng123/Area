import React, { useState } from 'react';
import "../styles/PasswordInput.css";

interface PasswordInputProps {
    onPasswordChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange }) => {

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        onPasswordChange(newPassword);
        console.log("New password is =");
        console.log(newPassword);
    };

    return (
        <div className="password-input-container">
            <div className="password-input">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handlePasswordChange}
                />
            </div>
        </div>
    );
};

export default PasswordInput;