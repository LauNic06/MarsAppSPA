import React from "react";
import {userDetailContext} from "./App";

export interface Component2Props {
    count: number;
    setCount: (value: (((prevState: number) => number) | number)) => void;
}

export function Component2() {
    let contextData = React.useContext(userDetailContext);
    return (
        <button onClick={() => contextData.setCount(contextData.count + 1)}>
            Click here
        </button>
    );
}
