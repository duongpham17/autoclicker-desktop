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
    start: 0, // seconds
    loop_remainder: 0,

    normal_robot: null,
    normal_events: null,
    normal_x_coord: 0,
    normal_y_coord: 0,
    normal_mouse_click: "left",
    normal_mouse_toggle: "down",
    normal_words: null,
    normal_keyboard: null,

    pixel_color: "",
    pixel_color_robot: null,
    pixel_color_events : null,
    pixel_color_x_coord : 0,
    pixel_color_y_coord : 0,
    pixel_color_mouse_click: "left",
    pixel_color_mouse_toggle: "down",
    pixel_color_words: null,
    pixel_color_keyboard : null
}