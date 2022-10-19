import {createContext, ReactNode, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react';
import {MainContentTypes, ScriptDataTypes, PrintActions, Script} from '../@types';
import {scriptDataInitialState} from '../@states';
import {prebuilt} from 'contents/@robot/PrebuiltScripts';
import {RobotActions} from '../@robot/RobotEvents';

export interface PropsTypes {
    mainContent: MainContentTypes,
    setMainContent: Dispatch<SetStateAction<MainContentTypes>>
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
    onChangeMainContent: (scriptType: MainContentTypes, script?: ScriptDataTypes) => void,
}

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    mainContent: null,
    setMainContent: () => null,
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
    onChangeMainContent: () => null,
    onStopScript: () => null,
});

// Provider in your app
export const UseContentsContext = ({children}: {children: ReactNode}) => {

    const [mainContent, setMainContent] = useState<MainContentTypes>(null);

    const [start, setStart] = useState<"start" | "pause" | "stop" | null>("stop");

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
            if(spt.loop_remainder && (loop % spt.loop_remainder) === 0) return;
            setTimeout(() => {
                const log = RobotActions(spt);
                const last_iteration = script.script.slice(-1)[0].id === spt.id;
                if(last_iteration){
                    const completed_log = {
                        normal_robot: null, 
                        log: `--------------- ${(new Date()).toLocaleTimeString()} ---------------`, 
                        name: `Completed ${loop}`, 
                        start: -1 // show no number in the terminal
                    };
                    return setPrint((print) => [completed_log, {...spt, log}, ...print].slice(0, 100));
                };
                setPrint((print) => [{...spt, log}, ...print].slice(0, 100));
            }, Number(spt.start) * 1000);
        };

        const startActions = () => {
            setLooped(`Looped ${loops} / ${script.max_loops}`);
            if(loops >= Number(script.max_loops)) {
                clearInterval(interval);
                setIntervalId(null)
                setStart("pause");
                return;
            }
            for(let x of script.script) action(x, loops+1);
            loops++;
        };
        startActions();
        interval = setInterval(startActions, duration);
        setIntervalId(interval);
        if(start !== "start") setStart("start")
    };

    const onStopScript = useCallback((on?: "stop" | "pause"): void => {
        clearInterval(intervalId);
        setIntervalId(null);
        setStart(on || "stop");
    }, [intervalId]);

    const onChangeMainContent = (main: MainContentTypes, data?: ScriptDataTypes): void => {
        if(!data) {
            document.title = `Autoclicker ( ${main} )`;
        }
        if(data) {
            setScript({...data, action: main});
            document.title = `Autoclicker ( ${data.name} )`;
        }
        setMainContent(main);
    };

    useEffect(() => {
        window.addEventListener("keydown", ({key}: {key: string}) => key === "Escape" && onStopScript("stop"));
    }, [onStopScript]);

    const value: PropsTypes = {
        mainContent, setMainContent,
        intervalId, setIntervalId,
        script, setScript,
        print, setPrint,
        looped, setLooped,
        scripts, setScripts,
        start, setStart,
        onClear,
        onStartScript,
        onStopScript,
        onChangeMainContent,
    };
  
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};
