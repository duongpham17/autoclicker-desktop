import {Script, Robot_Events, Robot_Actions, PrintLogsTypes} from '../@types';
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
        name: "Move mouse & click",
        robot: "moveMouseAndClick",
        description: "move mouse and click instantly",
        events: "move click",
    },
    {
        id: 3,
        name: "Pixel color",
        robot: "getPixelColor",
        description: "Detect colors",
        events: "color",
    },
    {
        id: 4,
        name: "Move mouse",
        robot: "moveMouse",
        description: "Move mouse instantly",
        events: "move",
    },
    {
        id: 5,
        name: "Move mouse smooth",
        robot: "moveMouseSmooth",
        description: "Move mouse human like",
        events: "move",
    },
    {
        id: 6,
        name: "Drag mouse",
        robot: "dragMouse",
        description: "Move mouse, with button held down",
        events: "move",
    },
    {
        id: 7,
        name: "Scroll mouse",
        robot: "scrollMouse",
        description: "Scrolls the mouse in any direction",
        events: "move",
    },
    {
        id: 8,
        name: "Key tap",
        robot: "keyTap",
        description: "Press a single key",
        events: "keyboard",
    },
    {
        id: 9,
        name: "Key toggle",
        robot: "keyToggle",
        description: "Hold down or release a key",
        events: "keyboard toggle",
    },
    {
        id: 10,
        name: "Type string",
        robot: "typeString",
        description: "auto type words for you",
        events: "typing",
    },
    {
        id: 12,
        name: "Time filler",
        robot: "timeFiller",
        description: "Does nothing",
        events: "time",
    },
    {
        id: 13,
        name: "Restart",
        robot: "restart",
        description: "Restart loop instantly",
        events: "restart",
    }
    
];

const {robot} = preload;

export const RobotActions = (s: Script, seconds: number): PrintLogsTypes => {
    
    const log: PrintLogsTypes = {
        id: s.id!,
        name: s.name,
        start: s.start,
        loop_remainder: s.loop_remainder || 0,
        skip_remainder: s.skip_remainder || 0,
        pixel_color: s.pixel_color || "",
        normal_event: s.normal_events || null,
        normal_robot: s.normal_robot,
        normal_log: "",
        pixel_color_robot: s.pixel_color_robot || null,
        pixel_color_log: "",
        pixel_color_detected: false,
    };

    if(s.start !== seconds) return log; 

    const NORMAL_ROBOT_ACTION = robot[s.normal_robot!];

    if(s.normal_events === "click"){
        NORMAL_ROBOT_ACTION(s.normal_mouse_click);
        log.normal_log  = `${s.normal_mouse_click} click`
    };
    if(s.normal_events === "toggle"){
        NORMAL_ROBOT_ACTION(s.normal_mouse_toggle);
        log.normal_log  = `${s.normal_mouse_toggle} toggle`
    };
    if(s.normal_events === "move"){
        NORMAL_ROBOT_ACTION(s.normal_x_coord, s.normal_y_coord);
        log.normal_log  = `x: ${s.normal_x_coord}, y: ${s.normal_y_coord}`;
    };
    if(s.normal_events === "keyboard"){
        NORMAL_ROBOT_ACTION(s.normal_keyboard);
        log.normal_log = `${s.normal_keyboard}`
    };
    if(s.normal_events === "keyboard toggle"){
        NORMAL_ROBOT_ACTION(s.normal_keyboard, s.normal_keyboard_toggle);
        log.normal_log = `${s.normal_keyboard} , ${s.normal_mouse_toggle}`
    };
    if(s.normal_events === "typing"){
        NORMAL_ROBOT_ACTION(s.normal_words);
        log.normal_log  = `${s.normal_words}`
    };
    if(s.normal_events === "move click"){
        robot.moveMouse(s.normal_x_coord, s.normal_y_coord);
        setTimeout(() => robot.mouseClick(s.normal_mouse_click), 100);
        log.normal_log = `x: ${s.normal_x_coord}, y: ${s.normal_y_coord}, ${s.normal_mouse_click}`;
    };
    if(s.normal_events === "time"){
        log.normal_log = ". . . . .";
    };
    if(s.normal_events === "restart"){
        log.normal_log = "!";
    };

    const isColorRobot = s.normal_events === "color";

    if(!isColorRobot) return log;

    log.normal_log = `x: ${s.normal_x_coord}, y: ${s.normal_y_coord}`;

    const isColor = robot[s.normal_robot!](s.normal_x_coord, s.normal_y_coord) === s.pixel_color;

    log.pixel_color_detected = isColor;

    if(!isColor) return log;

    const PIXEL_ROBOT_ACTION = robot[s.pixel_color_robot!];
    
    if(s.pixel_color_events === "move") {
        PIXEL_ROBOT_ACTION(s.pixel_color_x_coord, s.pixel_color_y_coord);
        log.pixel_color_log = `x: ${s.pixel_color_x_coord}, y: ${s.pixel_color_y_coord}, ${s.pixel_color_mouse_click}`;
    }
    if(s.pixel_color_events === "click") {
        PIXEL_ROBOT_ACTION(s.pixel_color_mouse_click);
        log.pixel_color_log = s.pixel_color_mouse_click || "left";
    }
    if(s.pixel_color_events === "toggle") {
        PIXEL_ROBOT_ACTION(s.pixel_color_mouse_toggle || "down");
        log.pixel_color_log = s.pixel_color_mouse_toggle || "down";
    }
    if(s.pixel_color_events === "typing") {
        PIXEL_ROBOT_ACTION(s.pixel_color_words);
        log.pixel_color_log = s.pixel_color_words || "";
    }
    if(s.pixel_color_events === "keyboard") {
        PIXEL_ROBOT_ACTION(s.pixel_color_keyboard);
        log.pixel_color_log = s.pixel_color_keyboard || "";
    }
    if(s.normal_events === "keyboard toggle"){
        PIXEL_ROBOT_ACTION(s.pixel_color_keyboard, s.pixel_color_keyboard_toggle);
        log.normal_log = `${s.pixel_color_keyboard} , ${s.pixel_color_keyboard_toggle} `
    };
    if(s.pixel_color_events === "move click") {
        robot.moveMouse(s.pixel_color_x_coord, s.pixel_color_y_coord);
        setTimeout(() => robot.mouseClick(s.pixel_color_mouse_click), 100);
        log.pixel_color_log = `x: ${s.pixel_color_x_coord}, y: ${s.pixel_color_y_coord}, ${s.pixel_color_mouse_click}`
    };
    if(s.pixel_color_events === "restart") {
        log.pixel_color_log = "!";
    };  
    if(s.pixel_color_events === "time"){
        log.normal_log = ". . . . .";
    };

    return log;
}