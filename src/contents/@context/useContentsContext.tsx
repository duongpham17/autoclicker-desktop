import {createContext, ReactNode, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react';
import {MainContentTypes, ScriptDataTypes, PrintLogsTypes} from '../@types';
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
    print: PrintLogsTypes[],
    setPrint: Dispatch<SetStateAction<PrintLogsTypes[]>>
    looped: number,
    setLooped: Dispatch<SetStateAction<number>>,
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
    looped: 0,
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

    const [print, setPrint] = useState<PrintLogsTypes[]>([]);

    const [looped, setLooped] = useState<number>(0);

    const [scripts, setScripts] = useState<ScriptDataTypes[]>(() => {
        const storage = localStorage.getItem("scripts");
        return storage !== null ? [...JSON.parse(storage), ...prebuilt] : prebuilt
    });

    const onClear = () => {
        setPrint([]);
        setLooped(0);
    };

    const onStartScript = (): void => {
        if(!script) return;

        const SCRIPT_TIMERS_ARRAY = script.script.map(el => el.start);
        const MAX_DURATION = SCRIPT_TIMERS_ARRAY.slice(-1)[0];
        let LOOPED = 0;
        let SECONDS = 0;

        const completed = (l: number, log?: PrintLogsTypes) => {
            LOOPED += 1;
            const completed_log = {
                id: `${LOOPED}`,
                name: `Completed ${LOOPED}`,
                start: -1,
                loop_remainder: 0,
                skip_remainder: 0,
                pixel_color: "",
                normal_event: null,
                normal_robot: null,
                normal_log: `${(new Date()).toLocaleTimeString()} | Took ${SECONDS}s`,
                pixel_color_robot: null,
                pixel_color_log: "",
                pixel_color_detected: false,
            };            
            SECONDS = 0;
            setLooped(l+1);
            if(log) return setPrint(state => [completed_log, log, ...state].slice(0, 100));
            setPrint(state => [completed_log, ...state].slice(0, 100));
        };

        let interval = setInterval(() => {

            SECONDS = Math.round((SECONDS+0.1) * 100) / 100;

            if(script.max_loops === LOOPED) {
                setIntervalId(null);
                clearInterval(interval);
            };

            const index = SCRIPT_TIMERS_ARRAY.indexOf(SECONDS);
            const script_to_run = script.script[index];
            const isIndex = index !== -1;

            if(isIndex) {   

                const {loop_remainder, skip_remainder} = script_to_run;

                if(loop_remainder !== 0) {
                    if( (LOOPED+1) % loop_remainder !== 0) return; 
                };

                if(skip_remainder !== 0) {
                    if( (LOOPED+1) % skip_remainder !== 0) return;
                };

                const log = RobotActions(script_to_run, SECONDS);

                if(log.normal_robot === "restart" || log.pixel_color_robot === "restart") return completed(LOOPED, log);

                setPrint(state => [log,...state].slice(0, 100));
            };
            
            const isLastIteration = SECONDS >= MAX_DURATION;

            if(isLastIteration) completed(LOOPED);

        }, 100);

        setIntervalId(interval);
        setStart("start");
        onClear();
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
