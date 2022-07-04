import React from "react";
import {userDetailContext} from "./App";

export function Component4() {
    let contextData = React.useContext(userDetailContext);
    return (
        <p>You clicked {contextData.count} times</p>
    );
}
