'use client'

import React from "react";

interface PropTypes {
    children?: React.ReactNode,
    className?: string
}

function Box({children, className}: PropTypes) {
    return (
        <div
            className={`border rounded-md bg-white p-4 gap-6 shadow-xl` + ' ' + className}
        >
            {children}
        </div>
    );
}

export default Box;