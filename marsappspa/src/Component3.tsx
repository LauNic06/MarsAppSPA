import React from "react";
import {Component4} from "./Component4";

interface Component3Props {
    message: string;
}

export function Component3(props: Component3Props) {
    return (
        <div>
            <Component4/>
            <p>{props.message}</p>
        </div>
    );
}
