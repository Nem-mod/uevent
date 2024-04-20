'use client';

import React from 'react';

interface PropTypes {
    children?: React.ReactNode;
    className?: string;
}

function Box({ children, className }: PropTypes) {
    return (
        <div className={`gap-6 rounded-md border bg-white p-4 shadow-xl` + ' ' + className}>
            {children}
        </div>
    );
}

export default Box;
