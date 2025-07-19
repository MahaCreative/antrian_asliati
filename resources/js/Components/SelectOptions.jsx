import React from "react";

export default function SelectOptions({
    errors,
    label,
    className,
    children,
    ...props
}) {
    return (
        <>
            <p className="capitalize text-gray-500 font-light text-sm tracking-tighter">
                {label}
            </p>
            <select
                {...props}
                className={`${className} w-full rounded-md border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-600 placeholder:text-gray-500 text-gray-500`}
            >
                {children}
            </select>
            {errors && (
                <p className="text-xs text-red-500 font-light tracking-tighter italic">
                    {errors}
                </p>
            )}
        </>
    );
}
