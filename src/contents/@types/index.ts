export interface Script {
    name: string,
    start: number // seconds
    robot: string | null,
    id?: string,
    move?: {x: number, y: number} | null,
    keyboard?: string|  null,
    x_coord?: number,
    y_coord?: number, 
    loop_remainder?: number,
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