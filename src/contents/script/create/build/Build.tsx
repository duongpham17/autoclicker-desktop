import { useState } from 'react';
import { Script, ScriptDataTypes } from 'contents/@types';
import { scriptInitialState } from 'contents/@states';
import { RobotEvents } from 'contents/@robot/RobotEvents';
import { v4 as uuidv4 } from 'uuid';
import { updateArrayObject, removeArrayObject, readFromClipboard} from 'utils';

import PrintScripts from 'contents/@components/print/Scripts';
import Background from 'components/background/Background';
import Flex from 'components/flex/Flex';
import Button from 'components/buttons/Button'
import Input from 'components/inputs/Input';
import Select from 'components/select/Select';
import List from 'components/select/List';

interface Props {
    values: ScriptDataTypes,
    onSetValue: CallableFunction,
    viewing: string,
}

const Build = ({values, onSetValue, viewing}: Props) => {

    const [edit, setEdit] = useState({
        selected: false,
        index: 0
    });

    const [position, setPosition] = useState<number | null>(null);

    const [scriptActions, setScriptActions] = useState<Script>(scriptInitialState);

    const onSelectScript = (updateobject: Partial<Script>) => {
        setScriptActions(state => ({...state, ...updateobject}));
    };

    const onChange = (e: any) => {
        if(e.target.type === "text") setScriptActions({...scriptActions, [e.target.name] : e.target.value}); 
        if(e.target.type === "number") setScriptActions({...scriptActions, [e.target.name] : Number(e.target.value)});
    };

    const onAddScript = () => {
        let name = scriptActions.name;
        if(!name) name = uuidv4();
        const script = { 
            ...scriptActions, 
            id: uuidv4(),
            name, 
            start: Number(scriptActions.start), 
            move: { x: scriptActions.x_coord, y: scriptActions.y_coord }
        };
        onSetValue({script: [...values.script, script] });
        setScriptActions(scriptInitialState);
    };

    const onEditScript = () => {
        const script = {
            ...scriptActions, 
            name: scriptActions.name || uuidv4(),
            move: {x: scriptActions.x_coord as number, y: scriptActions.y_coord as number}
        };
        const newScripts = updateArrayObject(values.script, edit.index, script);
        onSetValue({script: newScripts});
        setScriptActions(scriptInitialState);
        setEdit({selected: false, index: 0});
    };

    const onDeleteScript = (index: number) => {
        const newScript = removeArrayObject(index, values.script);
        console.log(newScript);
        onSetValue(({script: newScript}));
    };

    const onSelectEditScript = (script: Script, index: number) => {
        setEdit({selected: true, index: index});
        setScriptActions(script);
    };

    const onPasteCoord = async () => {
        const value:any = await readFromClipboard();
        if(typeof value === "string") return;
        setScriptActions((state) => ({...state, x_coord: value.x, y_coord: value.y}))
    };

    const onPosition = (index: number) => {
        if(position === null) return setPosition(index);
        const data = [...values.script];
        const item = data.splice(position, 1)[0];
        data.splice(index, 0, item);
        onSetValue({script: data});
        setPosition(null);
    };

    return ( viewing === "script" ?
        <>
            <Background>

                <Select label1='Select a script' items={RobotEvents} selected={scriptActions.robot} style={{"marginBottom": "0.5rem"}}>
                    {(RobotEvents) => 
                        RobotEvents.map(el => 
                            <List value={el.name} hover={el.description} onClick={() => onSelectScript({robot: el.robot, events: el.events})} key={el.id} />
                        )
                    }
                </Select>

                <Flex>
                    <Input label1="Script name" type="text" placeholder='...' name="name" value={scriptActions.name || ""} onChange={onChange} />
                    <Input label1="Start in ( s )" type="number" placeholder='seconds' name="start" value={scriptActions.start || ""} onChange={onChange} />
                    <Input label1="Start at x loop" type="number" placeholder='x' name="loop_remainder" value={scriptActions.loop_remainder || ""} onChange={onChange}  />
                </Flex>

                {scriptActions.events === "click" && 
                    <Flex>
                        <Button label1="Left click" onClick={() => onSelectScript({mouse_click: "left"})} selected={scriptActions.mouse_click === "left"} />
                        <Button label1="Middle click" onClick={() => onSelectScript({mouse_click: "middle"})} selected={scriptActions.mouse_click === "middle"}/>
                        <Button label1="Right click" onClick={() => onSelectScript({mouse_click: "right"})} selected={scriptActions.mouse_click === "right"} />
                    </Flex>
                }

                {scriptActions.events === "toggle" && 
                    <Flex>
                        <Button label1="Down toggle" onClick={() => onSelectScript({mouse_toggle: "down"})} selected={scriptActions.mouse_toggle === "down"}/>
                        <Button label1="Up toggle" onClick={() => onSelectScript({mouse_toggle: "up"})} selected={scriptActions.mouse_toggle === "up"} />
                    </Flex>
                }
                
                {scriptActions.events === "move" && 
                    <Flex onContextMenu={onPasteCoord}>
                        <Input label1="Move mouse in X axis" type="number" placeholder='number' name="x_coord" value={scriptActions.x_coord || ""} onChange={onChange}  />
                        <Input label1="Move mouse in Y axis" type="number" placeholder='number' name="y_coord" value={scriptActions.y_coord || ""} onChange={onChange} />
                    </Flex>
                }

                {scriptActions.events === "keyboard" &&
                    <Flex>
                        <Input label1="Keyboard key" label2={<a href={"http://robotjs.io/docs/syntax#keys"} target="_blank" rel="noreferrer">( keys )</a>} 
                            type="text" placeholder='key' name="keyboard" value={scriptActions.keyboard || ""} onChange={onChange} 
                        />
                    </Flex> 
                }        

                {scriptActions.events === "typing" &&
                    <Flex>
                        <Input label1="Words to be typed" type="text" placeholder='...' name="words" value={scriptActions.words || ""} onChange={onChange} />
                    </Flex> 
                }        

                {scriptActions.robot &&
                    <Button label1={!edit.selected ? "Add script" : "Update Script"} onClick={!edit.selected ? onAddScript : onEditScript} color="black" style={{"margin" : "0.5rem 0"}} />
                }
            </Background>

            <PrintScripts script={values} onSelectScript={(_, index) => onPosition(index)} selected={position}>
                {(script, index) => 
                    <Flex>
                        <Button label1="edit" color='black' onClick={() => onSelectEditScript(script, index)} style={{"padding": "0.3rem", "fontSize": "0.9rem"}}/>
                        <Button label1="remove" color='red' onClick={() => onDeleteScript(index)}  style={{"padding": "0.3rem", "fontSize": "0.9rem"}}/>
                    </Flex>
                }
            </PrintScripts>
        </>
        :null
    )
}

export default Build