import styles from './Scripts.module.scss';
import {ReactNode} from 'react';
import {ScriptDataTypes, Script} from 'contents/@types';
import {v4 as uuidv4} from 'uuid';
import {shorten, middleElipses} from 'utils';
import {BsArrowReturnRight, BsFillSquareFill} from 'react-icons/bs';
import Menu from '@components/menu/Menu';

interface Props {
    script: ScriptDataTypes,
    selected?: number | null,
    children?: (script: Script, index: number) => ReactNode,
    onSelectScript?: (script: ScriptDataTypes["script"][0], index: number) => void,
};

const Scripts = ({script, onSelectScript, children, selected}: Props) => {

    return ( !!script.script.length ?
        <div className={styles.container}>
            {script.script.map((el, index) => 
                <div className={`${styles.element} ${selected === index && styles.selected}`} key={el.id || uuidv4()} onClick={() => onSelectScript && onSelectScript(el, index)}>

                    <div className={styles.index}>
                        <p>{index+1}.</p>
                    </div>

                    <div className={styles.information}>
                        <div>
                            <p>
                                <label> {shorten(el.name, 25)} </label>
                                <label> {el.start}s</label>
                            </p>
                            <p>
                                <small> {el.normal_robot} {!!el.loop_remainder && `( run at loop ${el.loop_remainder} )`} </small>

                                {(el.normal_events === "color") && 
                                     <small>#{el.pixel_color} <BsFillSquareFill className={styles.color} color={el.pixel_color}/></small>
                                }

                                {(el.normal_events === "click") && 
                                    <small>{el.normal_mouse_click}</small>
                                }

                                {(el.normal_events === "move") &&
                                    <small>{` { x: ${el.normal_x_coord}, y: ${el.normal_y_coord} }`}</small>
                                }

                                {(el.normal_events === "keyboard" ) && 
                                    <small>{el.normal_keyboard}</small>
                                }

                                {(el.normal_events === "typing") && 
                                    <small>{shorten(el.normal_words!, 15)}</small>
                                }

                                {(el.normal_events === "empty") && 
                                    <small>. . . . . . . . . . . . . . . . . . . . . .</small>
                                }
                            </p>
                        </div>
                        <div className={styles.color}>
                            {(el.normal_events === "color") && 
                                <p>
                                    
                                    <small>
                                        <span><BsArrowReturnRight className={styles.arrow}/> </span>
                                        <span>{el.pixel_color_robot} </span>
                                    </small>

                                    {(el.pixel_color_events === "click") && 
                                        <small>{el.pixel_color_mouse_click} click</small>
                                    }

                                    {(el.pixel_color_events === "move") &&
                                        <small>{` { x: ${el.pixel_color_x_coord}, y: ${el.pixel_color_y_coord} }`}</small>
                                    }       

                                    {(el.pixel_color_events === "keyboard") &&
                                        <small>{el.pixel_color_keyboard}</small>
                                    }      

                                    {(el.pixel_color_events === "typing") && 
                                        <small>{shorten(el.pixel_color_words!, 15)}</small>
                                    }
                                </p>
                            }
                        </div>
                    </div>

                    { children &&
                        <Menu>
                            {children(el, index)}
                        </Menu>
                    }

                </div>    
            )}
        </div>
        : <></>
    )
}

export default Scripts