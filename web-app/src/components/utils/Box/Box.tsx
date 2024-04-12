'use client'

import React from "react";

interface PropTypes {
    children?: React.ReactNode,
    className?: string
}

function Box({children, className}: PropTypes) {
    return (
        <div
            className={className + " " + `border rounded-md border-primary bg-light p-4 gap-6 max-w-64`}
        >
            {children}
        </div>
    );
}

export default Box;