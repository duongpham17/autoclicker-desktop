import {Script, Robot_Events, Robot_Actions} from '../@types';
import {preload} from 'third-party/electron';

interface Props {
    id: number,
    name: string,
    description: string,
    robot: Robot_Actions,
    events: Robot_Events
};

export const RobotEvents:Props[] = [
    {
        id: 0,
        name: "Click mouse",
        robot: "mouseClick",
        description: "Click mouse",
        events: "click",
    },
    {
        id: 1,
        name: "Toggle mouse",
        robot: "mouseToggle",
        description: "Toggle mouse",
        events: "toggle",
    },
    {
        id: 2,
        name: "Move mouse",
        robot: "moveMouse",
        description: "Move mouse instantly",
        events: "move",
    },
    {
        id: 3,
        name: "Move mouse smooth",
        robot: "moveMouseSmooth",
        description: "Move mouse human like",
        events: "move",
    },
    {
        id: 4,
        name: "Drag mouse",
        robot: "dragMouse",
        description: "Move mouse, with button held down",
        events: "move",
    },
    {
        id: 5,
        name: "Scroll mouse",
        robot: "scrollMouse",
        description: "Scrolls the mouse in any direction",
        events: "move",
    },
    {
        id: 6,
        name: "Key tap",
        robot: "keyTap",
        description: "Press a single key",
        events: "keyboard",
    },
    {
        id: 7,
        name: "Key toggle",
        robot: "keyToggle",
        description: "Hold down or release a key",
        events: "keyboard",
    },
    {
        id: 8,
        name: "Type string",
        robot: "typeString",
        description: "auto type words for you",
        events: "typing",
    },
    {
        id: 9,
        name: "Pixel color",
        robot: "getPixelColor",
        description: "Detect colors",
        events: "color",
    },
    {
        id: 10,
        name: "Time filler",
        robot: "timeFiller",
        description: "Does nothing",
        events: "empty",
    }
    
]

export const RobotActions = (s: Script) => {
    const {robot} = preload;

    let log: string = "" // customise print;
    

    if(s.normal_robot === "getPixelColor"){

        const isColor = robot[s.normal_robot](s.normal_x_coord, s.normal_y_coord) === s.pixel_color;

        if(isColor) setTimeout(() => {
            if(s.pixel_color_robot) {
                if(s.pixel_color_events === "move") robot[s.pixel_color_robot](s.pixel_color_x_coord, s.pixel_color_y_coord);
                if(s.pixel_color_events === "click") robot[s.pixel_color_robot](s.pixel_color_mouse_click);
                if(s.pixel_color_events === "toggle") robot[s.pixel_color_robot](s.pixel_color_mouse_toggle);
                if(s.pixel_color_events === "typing") robot[s.pixel_color_robot](s.normal_words);
                if(s.pixel_color_events === "keyboard") robot[s.pixel_color_robot](s.pixel_color_keyboard);
            }
        }, 0);

        log = isColor ? "true" : "false";
    }

    if(s.normal_robot === "timeFiller"){
        log = "time filler";
    };

    if(s.normal_robot === "mouseClick"){
        robot[s.normal_robot](s.normal_mouse_click);
        log = `click ${s.normal_mouse_click}`
    };
    
    if(s.normal_robot=== "mouseToggle"){
        robot[s.normal_robot](s.normal_mouse_toggle);
        log = `toggle ${s.normal_mouse_toggle}`
    };

    if(s.normal_robot=== "getMousePos"){
        const {x, y} = robot[s.normal_robot]();
        log = `{ x: ${x}, y: ${y} }`;
    };

    if(s.normal_robot=== "moveMouse" || s.normal_robot=== "moveMouseSmooth" || s.normal_robot=== "dragMouse" || s.normal_robot=== "scrollMouse"){
        robot[s.normal_robot](s.normal_x_coord, s.normal_y_coord);
        log = `{ x: ${s.normal_x_coord}, y: ${s.normal_y_coord} }`;
    };

    if(s.normal_robot=== "keyToggle" || s.normal_robot=== "keyTap"){
        robot[s.normal_robot](s.normal_keyboard);
        if(s.normal_robot=== "keyToggle") log = `toggle ${s.normal_keyboard}`
        if(s.normal_robot=== "keyTap") log = `tap ${s.normal_keyboard}`
    };
    
    if(s.normal_robot=== "typeString"){
        robot[s.normal_robot](s.normal_words);
        log = `${s.normal_words}`
    };

    return log
}