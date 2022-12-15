import React from "react";
import store from "../store";

export type nor = null | string
export type refType = React.RefObject<HTMLInputElement>

export type StateType = ReturnType<typeof store.getState>
