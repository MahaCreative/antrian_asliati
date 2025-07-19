import GuestLayouts from "@/Layouts/GuestLayouts";
import React from "react";

export default function Index() {
    return <div>Index</div>;
}

Index.layout = (page) => <GuestLayouts children={page} title={"Home"} />;
