import React from "react";
import {Component2} from "./Component2";
import {Component3} from "./Component3";

export function Component1() {
    return (
        <div>
            <Component3 message={"Component3's message"}/>
            <Component2/>
        </div>
    );
}
