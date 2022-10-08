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
        name: "Type String",
        robot: "typeString",
        description: "Type a string",
        events: "typing",
    },
    {
        id: 9,
        name: "Time filler",
        robot: "timeFiller",
        description: "Does nothing",
        events: "empty",
    }
    
]

export const RobotActions = (s: Script) => {
    const {robot} = preload;

    let log: string = "" // customise print

    if(s.robot === "timeFiller"){
        log = "time filler"
    };

    if(s.robot === "mouseClick"){
        robot[s.robot](!s.mouse_click ? "left" : s.mouse_click);
        log = `click ${s.mouse_click}`
    };
    
    if(s.robot === "mouseToggle"){
        robot[s.robot](!s.mouse_toggle ? "down" : s.mouse_toggle);
        log = `toggle ${s.mouse_toggle}`
    };

    if(s.robot === "getMousePos"){
        const {x, y} = robot[s.robot]();
        log = `{ x: ${x}, y: ${y} }`;
    };

    if(s.robot === "moveMouse" || s.robot === "moveMouseSmooth" || s.robot === "dragMouse" || s.robot === "scrollMouse"){
        robot[s.robot](s.move?.x, s.move?.y);
        log = `{ x: ${s.move?.x}, y: ${s.move?.y} }`;
    };

    if(s.robot === "keyToggle" || s.robot === "keyTap"){
        robot[s.robot](s.keyboard);
        if(s.robot === "keyToggle") log = `toggle ${s.keyboard}`
        if(s.robot === "keyTap") log = `tap ${s.keyboard}`
    };
    
    if(s.robot === "typeString"){
        robot[s.robot](s.words);
        log = `${s.words}`
    };

    return log
}