import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React from "react";

export default function Modals({ open, title, setOpen, children }) {
    return (
        <div>
            <Modal open={open}>
                <div className="flex justify-center items-center h-screen w-full">
                    <div
                        className={`useTransition max-w-[90%] min-w-[30%] bg-white rounded-md px-4 py-3`}
                    >
                        <div className="flex justify-between items-center">
                            <p className="tracking-tighter leading-3 text-blue-500 font-medium text-xl">
                                {title}
                            </p>
                            <button
                                onClick={setOpen}
                                className="text-xl text-gray-500 hover:text-blue-500 useTransition"
                            >
                                <Close color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
