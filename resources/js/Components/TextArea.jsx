import React from "react";

export default function TextArea({ errors, label, className, ...props }) {
    return (
        <>
            <p className="capitalize text-gray-500 font-light text-sm tracking-tighter">
                {label}
            </p>
            <textarea
                {...props}
                className={`${className}  rounded-md border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-600 placeholder:text-gray-500 text-gray-500`}
            ></textarea>
            {errors && (
                <p className="text-xs text-red-500 font-light tracking-tighter italic">
                    {errors}
                </p>
            )}
        </>
    );
}
