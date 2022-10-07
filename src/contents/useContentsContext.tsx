import {createContext, ReactNode, useEffect, useState, useCallback, Dispatch, SetStateAction} from 'react';
import {ScriptDataTypes, PrintActions, Script, Action} from './@types';
import {scriptDataInitialState} from './@states';
import {preload} from 'third-party/electron';
import {prebuilt} from 'contents/PrebuiltScripts';

export interface PropsTypes {
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
  onStopScript: () => void,
  onSelectScript: (scriptType: Action, script?: ScriptDataTypes) => void,
}

// for consuming in children components
export const Context = createContext<PropsTypes>({
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

        const {robot} = preload;

        const duration = Number(script.script.slice(-1)[0].start) * 1000 || 1000;

        let loops = 0;

        let interval: any = "";

        const action = (s: Script, loop: number): void => {

            if(s.loop_remainder){
                const isReady = (loop % s.loop_remainder) === 0;
                if(!isReady) return;
            }
            
            setTimeout(() => {
                let log: string; // customise print

                if(s.robot === "getMousePos"){
                    const {x, y} = robot.getMousePos();
                    log = `{ x: ${x}, y: ${y} }`
                };

                if(s.robot === "moveMouse"){
                    robot.moveMouse(s.move?.x, s.move?.y);
                    log = `{ x: ${s.move?.x}, y: ${s.move?.y} }`;
                };

                if(s.robot === "mouseClick"){
                    robot.mouseClick();
                };

                if(s.robot === "keyToggle"){
                    robot.mouseClick();
                    log = `toggle ${s.keyboard}`
                };

                if(s.robot === "keyTap"){
                    robot.mouseClick();
                    log = `tap ${s.keyboard}`
                };

                const last_iteration = script.script.slice(-1)[0].id === s.id;

                if(last_iteration){
                    const endedObj = {robot: (new Date()).toLocaleTimeString(), log: "------------------", name: `Ended ${loop}`, start: -1 };
                    return setPrint((print) => [endedObj, {...s, log}, ...print].slice(0, 100));
                }

                setPrint((print) => [{...s, log}, ...print].slice(0, 100));

            }, Number(s.start) * 1000);
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
    };

    const onStopScript = useCallback((): void => {
        clearInterval(intervalId);
        setIntervalId(null);
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
        window.addEventListener("keydown", ({key}: {key: string}) => key === "q" && onStopScript());
    }, [onStopScript]);

    const value: PropsTypes = {
        intervalId, setIntervalId,
        script, setScript,
        print, setPrint,
        looped, setLooped,
        scripts, setScripts,

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
