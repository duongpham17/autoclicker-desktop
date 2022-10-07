import { ScriptDataTypes } from './@types';

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
            name: "Clicked",
            start: 1,
            robot: "mouseClick",
            move: null,
        },
    ]
}

export const prebuilt: ScriptDataTypes[] = [
    autoclick,
]