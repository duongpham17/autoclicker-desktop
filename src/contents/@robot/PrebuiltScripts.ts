import { ScriptDataTypes } from 'contents/@types';

const autoclick: ScriptDataTypes = {
    id: "prebuilt-script-id-1",
    name: "Autoclicker",
    image: "",
    description: [
        "Click mouse every second"
    ],
    max_loops: 1000000,
    action: null,
    build: "default",
    script:[
        {
            id: "script-id-1",
            name: "Click",
            start: 1,
            normal_robot: "mouseClick",
            normal_mouse_click: "left"
        },
    ]
}

export const prebuilt: ScriptDataTypes[] = [
    autoclick,
]