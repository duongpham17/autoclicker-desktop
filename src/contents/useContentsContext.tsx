import {createContext, ReactNode, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react';
import {ScriptDataTypes, PrintActions, Script, Action} from './@types';
import {scriptDataInitialState} from './@states';
import {prebuilt} from 'contents/@robot/PrebuiltScripts';
import {RobotActions} from './@robot/RobotEvents';

export interface PropsTypes {
    start: "start" | "pause" | "stop" | null,
    setStart: Dispatch<SetStateAction<"start" | "pause" | "stop" | null>>,
    script: ScriptDataTypes | null,
    setScript: Dispatch<SetStateAction<ScriptDataTypes>>,
    scripts: ScriptDataTypes[],
    setScripts: Dispatch<SetStateAction<ScriptDataTypes[]>>,
    intervalId: any,
    setIntervalId: Dispatch<SetStateAction<any>>,
    print: PrintActions[],
    setPrint: Dispatch<SetStateAction<PrintActions[]>>
    looped: string,
    setLooped: Dispatch<SetStateAction<string>>,
    onClear: () => void,
    onStartScript: () => void,
    onStopScript: (on?: "stop" | "pause") => void,
    onSelectScript: (scriptType: Action, script?: ScriptDataTypes) => void,
}

// for consuming in children components
export const Context = createContext<PropsTypes>({
    start: null,
    setStart: () => null,
    script: scriptDataInitialState,
    setScript: () => null,
    scripts: [],
    setScripts: () => null,
    intervalId: null,
    setIntervalId: () => null,
    print: [],
    setPrint: () => null,
    looped: "looped 0",
    setLooped: () => null,
    onClear: () => null,
    onStartScript: () => null,
    onSelectScript: () => null,
    onStopScript: () => null,
});

// Provider in your app
export const UseContentsContext = ({children}: {children: ReactNode}) => {

    const [start, setStart] = useState<"start" | "pause" | "stop" | null>("stop")

    const [intervalId, setIntervalId] = useState<any>(null);

    const [script, setScript] = useState<ScriptDataTypes>(scriptDataInitialState);

    const [print, setPrint] = useState<PrintActions[]>([]);

    const [looped, setLooped] = useState<string>("Looped 0");

    const [scripts, setScripts] = useState<ScriptDataTypes[]>(() => {
        const storage = localStorage.getItem("scripts");
        return storage !== null ? [...JSON.parse(storage), ...prebuilt] : prebuilt
    });

    const onClear = () => {
        setPrint([]);
        setLooped("Looped 0");
    };

    const onStartScript = (): void => {
        if(!script.name) return;

        onClear();

        const duration = Number(script.script.slice(-1)[0].start) * 1000 || 1000;

        let loops = 0;

        let interval: any = "";

        const action = (spt: Script, loop: number): void => {
            
            if(spt.loop_remainder){
                const isReady = (loop % spt.loop_remainder) === 0;
                if(!isReady) return;
            };
            
            setTimeout(() => {
                const log = RobotActions(spt);
                const last_iteration = script.script.slice(-1)[0].id === spt.id;
                if(last_iteration){
                    const script_ended_log = {robot: null, log: `--------------- ${(new Date()).toLocaleTimeString()} ---------------`, name: `Completed ${loop}`, start: -1 };
                    return setPrint((print) => [script_ended_log, {...spt, log}, ...print].slice(0, 100));
                };
                setPrint((print) => [{...spt, log}, ...print].slice(0, 100));
            }, Number(spt.start) * 1000);
        };

        const startScript = () => {
            setLooped(`Looped ${loops} / ${script.max_loops}`);
            if(loops >= Number(script.max_loops)) return clearInterval(interval);
            for(let x of script.script) action(x, loops+1);
            loops++;
        };

        startScript();

        interval = setInterval(startScript, duration);

        setIntervalId(interval);
        setStart("start")
    };

    const onStopScript = useCallback((on?: "stop" | "pause"): void => {
        clearInterval(intervalId);
        setIntervalId(null);
        setStart(on || "stop");
    }, [intervalId]);

    const onSelectScript = (action: Action, data?: ScriptDataTypes): void => {
        if(!data) {
            setScript({...scriptDataInitialState, action});
            document.title = `Autoclicker ( ${action} )`;
        }
        if(data) {
            setScript({...data, action});
            document.title = `Autoclicker ( ${data.name} )`;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", ({key}: {key: string}) => key === "q" && onStopScript("stop"));
    }, [onStopScript]);

    const value: PropsTypes = {
        intervalId, setIntervalId,
        script, setScript,
        print, setPrint,
        looped, setLooped,
        scripts, setScripts,
        start, setStart,
        onClear,
        onStartScript,
        onStopScript,
        onSelectScript,
    };
  
    return (
        <Context.Provider value={value}>
        {children}
        </Context.Provider>
    )
};
