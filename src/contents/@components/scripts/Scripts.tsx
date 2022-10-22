import styles from './Scripts.module.scss';
import {ReactNode} from 'react';
import {ScriptDataTypes, Script} from 'contents/@types';
import {v4 as uuidv4} from 'uuid';
import {shorten} from 'utils';
import {BsArrowReturnRight, BsFillSquareFill, BsArrowClockwise} from 'react-icons/bs';
import Menu from '@components/menu/Menu';
import Observer from '@components/observer/Observer';

interface Props {
    data: ScriptDataTypes,
    selected?: number | null,
    children?: (script: Script, index: number) => ReactNode,
    onSelectScript?: (script: ScriptDataTypes["script"][0], index: number) => void,
};

const Scripts = ({data, onSelectScript, children, selected}: Props) => {

    return ( !!data.script.length ?
        <div className={styles.container}>
            {data.script.map((el, index) =>
                <Observer key={el.id || uuidv4()}>
                <div className={`${styles.element} ${selected === index && styles.selected}`} onClick={() => onSelectScript && onSelectScript(el, index)}>

                    <div className={styles.index}>
                        <p>{index+1}.</p>
                    </div>

                    <div className={styles.script}>

                        <div>
                            <p> {shorten(el.name, 25)} </p>
                            <p> {el.start} <small>s</small> </p>
                        </div>

                        <div>
                            <p> <small>{el.normal_robot}</small> </p>
                            <p> 
                                { el.normal_events === "color" && 
                                    <> <small> x: {el.normal_x_coord}, y: {el.normal_y_coord} </small> <BsFillSquareFill className={styles.iconColor} color={el.pixel_color}/> </>
                                } 
                                { el.normal_events === "click" && 
                                    <small>{el.normal_mouse_click}</small> 
                                }
                                { el.normal_events === "toggle" && 
                                    <small>{el.normal_mouse_toggle}</small> 
                                }
                                { el.normal_events === "move" && 
                                    <small>x: {el.normal_x_coord}, y: {el.normal_y_coord}</small> 
                                }
                                { el.normal_events === "move click" &&  
                                    <small>x: {el.normal_x_coord}, y: {el.normal_y_coord}, {el.normal_mouse_click}</small> 
                                }
                                { el.normal_events === "keyboard" && 
                                    <small>{el.normal_keyboard}</small> 
                                }
                                { el.normal_events === "keyboard toggle" && 
                                    <small>{el.normal_keyboard} , {el.normal_keyboard_toggle}</small> 
                                }
                                { el.normal_events === "typing" && 
                                    <small>{shorten(el.normal_words, 20)}</small> 
                                }
                                { el.normal_events === "restart" && 
                                    <BsArrowClockwise/> 
                                }
                                { el.normal_events === "time" && 
                                    <small>. . . . . .</small>
                                }
                            </p>
                        </div>

                        { !!el.loop_remainder &&
                            <div>
                                <p><BsArrowReturnRight className={styles.iconArrow} /> <small>run at loop {el.loop_remainder}</small></p>
                            </div>
                        }

                        { el.normal_events === "color" &&
                            <div>
                                <p><BsArrowReturnRight className={styles.iconArrow} /> <small> {el.pixel_color_robot} </small></p>
                                { el.pixel_color_events === "click" && 
                                    <small>{el.pixel_color_mouse_click}</small> 
                                }
                                { el.pixel_color_events === "toggle" && 
                                    <small>{el.pixel_color_mouse_toggle}</small> 
                                }
                                { el.pixel_color_events === "move" && 
                                    <small>x: {el.pixel_color_x_coord}, y: {el.pixel_color_y_coord}</small> 
                                }
                                { el.pixel_color_events === "move click" &&  
                                    <small>x: {el.pixel_color_x_coord}, y: {el.pixel_color_y_coord}, {el.pixel_color_mouse_click}</small> 
                                }
                                { el.pixel_color_events === "keyboard" && 
                                    <small>{el.pixel_color_keyboard}</small> 
                                }
                                { el.pixel_color_events === "keyboard toggle" && 
                                    <small>{el.pixel_color_keyboard} , {el.pixel_color_keyboard_toggle}</small> 
                                }
                                { el.pixel_color_events === "typing" && 
                                    <small>{shorten(el.pixel_color_words, 20)}</small>
                                }
                                { el.pixel_color_events === "restart" && 
                                    <BsArrowClockwise/> 
                                }
                                { el.pixel_color_events === "time" && 
                                    <small>. . . . . .</small>
                                }
                            </div>
                        }        
                    </div>

                    { children &&
                        <Menu>
                            {children(el, index)}
                        </Menu>
                    }

                </div>    
                </Observer>
            )}
        </div>
        : <></>
    )
}

export default Scripts