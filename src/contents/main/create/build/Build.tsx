import { useState } from 'react';
import { Script, ScriptDataTypes } from 'contents/@types';
import { scriptInitialState } from 'contents/@states';
import { RobotEvents } from 'contents/@robot/RobotEvents';
import { v4 as uuidv4 } from 'uuid';
import { updateArrayObject, removeArrayObject, readFromClipboard} from 'utils';

import PrintScripts from 'contents/@components/print/Scripts';
import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input';
import Select from '@components/select/Select';
import List from '@components/select/List';

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
        };
        onSetValue({script: [...values.script, script] });
        setScriptActions(scriptInitialState);
    };

    const onEditScript = () => {
        const script = {
            ...scriptActions, 
            name: scriptActions.name || uuidv4(),
            normal_x_coord: scriptActions.normal_x_coord as number, 
            normal_y_coord: scriptActions.normal_y_coord as number,
        };
        const newScripts = updateArrayObject(values.script, edit.index, script);
        onSetValue({script: newScripts});
        setScriptActions(scriptInitialState);
        setEdit({selected: false, index: 0});
    };

    const onDeleteScript = (index: number) => {
        const newScript = removeArrayObject(index, values.script);
        onSetValue(({script: newScript}));
    };

    const onSelectEditScript = (script: Script, index: number) => {
        setEdit({selected: true, index: index});
        setScriptActions(script);
    };

    const onPaste = async (type: "normal" | "pixel") => {
        const value:any = await readFromClipboard();
        if(typeof value === "string") return;
        if(type === "normal") setScriptActions((state) => ({...state, normal_x_coord: value.x, normal_y_coord: value.y, pixel_color: value.color}));
        if(type === "pixel") setScriptActions((state) => ({...state, pixel_color_x_coord: value.x, pixel_color_y_coord: value.y}));
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

            <Select label1='Select a script' items={RobotEvents} selected={scriptActions.normal_robot} style={{"marginBottom": "1rem"}}>
                {(RobotEvents) => 
                    RobotEvents.map(el => 
                        <List value={el.name} hover={el.description} onClick={() => onSelectScript({normal_robot: el.robot, normal_events: el.events})} key={el.id} />
                    )
                }
            </Select>

            <Flex>
                <Input label1="Script name" type="text" placeholder='...' name="name" value={scriptActions.name || ""} onChange={onChange} />
                <Input label1="Start in ( s )" type="number" placeholder='seconds' name="start" value={scriptActions.start || ""} onChange={onChange} />
                <Input label1="Start at x loop" type="number" placeholder='x' name="loop_remainder" value={scriptActions.loop_remainder || ""} onChange={onChange}  />
            </Flex>

            {scriptActions.normal_events === "click" && 
                <Flex>
                    <Button label1="Left click" onClick={() => onSelectScript({normal_mouse_click: "left"})} selected={scriptActions.normal_mouse_click === "left"} />
                    <Button label1="Middle click" onClick={() => onSelectScript({normal_mouse_click: "middle"})} selected={scriptActions.normal_mouse_click === "middle"}/>
                    <Button label1="Right click" onClick={() => onSelectScript({normal_mouse_click: "right"})} selected={scriptActions.normal_mouse_click === "right"} />
                </Flex>
            }

            {scriptActions.normal_events === "toggle" && 
                <Flex>
                    <Button label1="Down toggle" onClick={() => onSelectScript({normal_mouse_toggle: "down"})} selected={scriptActions.normal_mouse_toggle === "down"}/>
                    <Button label1="Up toggle" onClick={() => onSelectScript({normal_mouse_toggle: "up"})} selected={scriptActions.normal_mouse_toggle === "up"} />
                </Flex>
            }
            
            {scriptActions.normal_events === "move" && 
                <Flex onContextMenu={() => onPaste("normal")}>
                    <Input label1="X axis" type="number" placeholder='number' name="x_coord" value={scriptActions.normal_x_coord || ""} onChange={onChange}  />
                    <Input label1="Y axis" type="number" placeholder='number' name="y_coord" value={scriptActions.normal_y_coord || ""} onChange={onChange} />
                </Flex>
            }

            {scriptActions.normal_events === "keyboard" &&
                <Flex>
                    <Input label1="Keyboard key" label2={<a href={"http://robotjs.io/docs/syntax#keys"} target="_blank" rel="noreferrer">( keys )</a>} 
                        type="text" placeholder='key' name="keyboard" value={scriptActions.normal_keyboard || ""} onChange={onChange} 
                    />
                </Flex> 
            }        

            {scriptActions.normal_events === "typing" &&
                <Flex>
                    <Input label1="Words to be typed" type="text" placeholder='...' name="normal_words" value={scriptActions.normal_words || ""} onChange={onChange} />
                </Flex> 
            }        

            {scriptActions.normal_events === "color" && 
                <>
                    <Flex onContextMenu={() => onPaste("normal")}>
                        <Input label1="X axis of color" type="number" placeholder='number' name="x_coord" value={scriptActions.normal_x_coord || ""} onChange={onChange}  />
                        <Input label1="Y axis of color" type="number" placeholder='number' name="y_coord" value={scriptActions.normal_y_coord || ""} onChange={onChange} />
                        <Input label1="Hex color code" type="text" placeholder='...' name="pixel_color" value={scriptActions.pixel_color || ""} onChange={onChange} />
                    </Flex>

                    <Select label1='If color matches use a script' items={RobotEvents} selected={scriptActions.pixel_color_robot} style={{"marginBottom": "0.5rem"}}>
                        {(RobotEvents) => 
                            RobotEvents.filter(el => el.events !== "color" && el.events !== "empty").map(el => 
                                <List value={el.name} hover={el.description} onClick={() => onSelectScript({pixel_color_robot: el.robot, pixel_color_events: el.events})} key={el.id} />
                            )
                        }
                    </Select>

                    {scriptActions.pixel_color_events === "click" && 
                        <Flex>
                            <Button label1="Left click" onClick={() => onSelectScript({pixel_color_mouse_click: "left"})} selected={scriptActions.pixel_color_mouse_click === "left"} />
                            <Button label1="Middle click" onClick={() => onSelectScript({pixel_color_mouse_click: "middle"})} selected={scriptActions.pixel_color_mouse_click === "middle"}/>
                            <Button label1="Right click" onClick={() => onSelectScript({pixel_color_mouse_click: "right"})} selected={scriptActions.pixel_color_mouse_click === "right"} />
                        </Flex>
                    }

                    {scriptActions.pixel_color_events === "toggle" && 
                        <Flex>
                            <Button label1="Down toggle" onClick={() => onSelectScript({pixel_color_mouse_toggle: "down"})} selected={scriptActions.pixel_color_mouse_toggle === "down"}/>
                            <Button label1="Up toggle" onClick={() => onSelectScript({pixel_color_mouse_toggle: "up"})} selected={scriptActions.pixel_color_mouse_toggle === "up"} />
                        </Flex>
                    }

                    {scriptActions.pixel_color_events === "move" && 
                        <Flex onContextMenu={() => onPaste("pixel")}>
                            <Input label1="X axis" type="number" placeholder='number' name="pixel_color_x_coord" value={scriptActions.pixel_color_x_coord || ""} onChange={onChange}  />
                            <Input label1="Y axis" type="number" placeholder='number' name="pixel_color_y_coord" value={scriptActions.pixel_color_y_coord || ""} onChange={onChange} />
                        </Flex>
                    }
            
                    {scriptActions.pixel_color_events === "keyboard" &&
                        <Flex>
                            <Input label1="Keyboard key" label2={<a href={"http://robotjs.io/docs/syntax#keys"} target="_blank" rel="noreferrer">( keys )</a>} 
                                type="text" placeholder='key' name="pixel_color_keyboard" value={scriptActions.pixel_color_keyboard || ""} onChange={onChange} 
                            />
                        </Flex> 
                    }        

                    {scriptActions.pixel_color_events === "typing" &&
                        <Flex>
                            <Input label1="Words to be typed" type="text" placeholder='...' name="pixel_color_keyboard_words" value={scriptActions.pixel_color_words || ""} onChange={onChange} />
                        </Flex> 
                    }        
                </>
            }

            {scriptActions.normal_robot &&
                <Button color="dark" label1={!edit.selected ? "Add script" : "Update Script"} onClick={!edit.selected ? onAddScript : onEditScript} style={{"margin" : "1rem 0"}} />
            }


            <PrintScripts script={values} onSelectScript={(_, index) => onPosition(index)} selected={position}>
                {(script, index) => 
                    <>
                        <Button label1="edit" onClick={() => onSelectEditScript(script, index)} style={{"padding": "0.3rem", "fontSize": "0.9rem", "margin": "0.2rem 0"}}/>
                        <Button label1="delete" color='red' onClick={() => onDeleteScript(index)}  style={{"padding": "0.3rem", "fontSize": "0.9rem", "margin": "0.2rem 0"}}/>
                    </>
                }
            </PrintScripts>
        </>
        :null
    )
}

export default Build