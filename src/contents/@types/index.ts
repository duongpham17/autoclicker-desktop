export type Robot_Actions = "getMousePos" | "mouseClick" | "mouseToggle" | "moveMouse" | "moveMouseSmooth" | "dragMouse" | "scrollMouse" | "keyTap" | "keyToggle" | "typeString" | "timeFiller"

export type Robot_Events = "click" | "toggle" | "move" | "keyboard" | "typing" | "empty"

export interface Script {
    name: string,
    start: number // seconds
    robot: Robot_Actions | null,
    id?: string,
    move?: {x: number, y: number} | null,
    keyboard?: string |  null,
    x_coord?: number,
    y_coord?: number, 
    words?: string,
    mouse_click?: "left" | "right" | "middle",
    mouse_toggle?: "down" | "up",
    loop_remainder?: number,
    events?: Robot_Events
};

export type Action = "built" | "create" | "edit" | null;

export type Build = "default" | "custom" | "others" | null;

export interface ScriptDataTypes {
    id: string | number,
    name: string,
    image?: string,
    description: string[],
    max_loops: number,
    action: Action,
    build: Build,
    script: Script[]
};

export interface Print {
    name: string,
    log: string,
};

export type PrintActions = Print & Script;