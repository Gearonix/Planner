import React from "react";
import store from "../setup/store";

export type nor = null | string
export type refType = React.RefObject<HTMLInputElement>

export type StateType = ReturnType<typeof store.getState>

export type ChangeEventT = React.ChangeEvent<HTMLInputElement>

export type MouseEventT = React.MouseEventHandler<HTMLDivElement>
