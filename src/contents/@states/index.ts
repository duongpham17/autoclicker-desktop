import { ScriptDataTypes, Script } from 'contents/@types';

export const scriptDataInitialState: ScriptDataTypes = {
    id: "",
    action: null,
    build: null,
    name: "",
    max_loops: 0,
    description: [],
    script: []
};

export const scriptInitialState: Script = {
    id: "",
    name: "",
    move:  null,
    start: 0, // seconds
    robot: null,
    keyboard: null,
    x_coord: 0,
    y_coord: 0,
    loop_remainder: 0,
    words: "",
    mouse_click: "left",
    mouse_toggle: "down",
    events: "empty"
}