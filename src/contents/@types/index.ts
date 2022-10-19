export type MainContentTypes = "built" | "create" | "edit" | "help" | "donate" | "theme" | null ;

export type Robot_Actions = "moveMouseAndClick" | "getMousePos" | "mouseClick" | "mouseToggle" | "moveMouse" | "moveMouseSmooth" | "dragMouse" | "scrollMouse" | "keyTap" | "keyToggle" | "getPixelColor" | "typeString" | "timeFiller"

export type Robot_Events = "click" | "toggle" | "move" | "keyboard" | "typing" | "empty" | "color" | "move click"

export interface Script {
    id?: string,
    name: string,
    start: number // seconds
    loop_remainder?: number,

    normal_robot: Robot_Actions | null,
    normal_events?: Robot_Events | null,
    normal_words?: string | null,
    normal_keyboard?: string |  null,
    normal_x_coord?: number,
    normal_y_coord?: number, 
    normal_mouse_click?: "left" | "right" | "middle",
    normal_mouse_toggle?: "down" | "up",

    pixel_color?: string,
    pixel_color_robot?: Robot_Actions | null,
    pixel_color_events? : Robot_Events | null,
    pixel_color_words?: string | null,
    pixel_color_keyboard? : string | null,
    pixel_color_x_coord? : number,
    pixel_color_y_coord? : number,
    pixel_color_mouse_click?: "left" | "right" | "middle",
    pixel_color_mouse_toggle?: "down" | "up",
};

export type Build = "prebuilt" | "custom" | "others" | null;

export interface ScriptDataTypes {
    id: string | number,
    name: string,
    description: string[],
    max_loops: number,
    action: MainContentTypes,
    build: Build,
    script: Script[],
    window?: {
        width: string | number,
        height: string | number
    };
};

export interface Print {
    name: string,
    log: string,
    color?: string,
};

export type PrintActions = Print & Script;