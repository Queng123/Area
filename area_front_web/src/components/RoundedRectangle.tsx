import React, { ReactNode } from 'react';
import "../styles/RoundedRectangle.css";

interface RoundedRectangleProps {
    children: ReactNode;
}

const RoundedRectangle: React.FC<RoundedRectangleProps> = ({ children }) => {
    return (
        <div className="rounded-rectangle">
            {children}
        </div>
    );
};

export default RoundedRectangle;
