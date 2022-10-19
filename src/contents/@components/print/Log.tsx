import styles from './Log.module.scss';
import {useEffect, useState} from 'react'
import {PrintActions} from 'contents/@types';
import {copyToClipboard, shorten} from 'utils';
import {BsArrowReturnRight, BsSquareFill} from 'react-icons/bs';

import Flex from '@components/flex/Flex';

interface Props {
    data: PrintActions[],
    onActionLogLabel?: string | number,
    onActionLogLabelClicked?: string | number,
    onActionLog?: (log: string) => void;
}

const Log = ({data, onActionLog, onActionLogLabel = "copy", onActionLogLabelClicked = "copied"}: Props) => {

    const [clicked, setClicked] = useState<number | null>(null);

    const onAction = (index: number, log: string) => {
        if(onActionLog) onActionLog(log);
        if(!onActionLog) copyToClipboard(log);
        setClicked(index);
    };

    useEffect(() => {
        setTimeout(() => setClicked(null), 2000);
    }, [clicked]);

    return ( 
        !!data.length ?
            <div className={`${styles.container} ${data.length >= 10 && styles.padding}`}>
                {data.map((el, index) => 
                    <div key={index} className={styles.element} onClick={() => onAction && onAction(index, el.log)}>

                        <div className={styles.information}>
                            <Flex>
                                <p>{el.name}</p>
                                {el.start !== -1 && <p> {el.start} s </p>}
                            </Flex>
                            <div>
                                <small>{el.normal_robot || "-----------------------------------"}</small>
                                <small>{el.normal_robot === "typeString" ? shorten(el.log, 15) : el.log} {el.normal_events === "color" && <BsSquareFill className={styles.color} color={el.pixel_color}/>}</small>
                            </div>
                            {(el.normal_events === "color") && 
                                <div>
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
                                        <small>{shorten(el.pixel_color_words!, 20)}</small>
                                    }

                                    {(el.pixel_color_events === "move click") && 
                                        <small>{`{ x: ${el.pixel_color_x_coord}, y: ${el.pixel_color_y_coord} } - ${el.pixel_color_mouse_click}`}</small>
                                    }
                                </div>
                            }
                        </div>

                        {onActionLog && 
                            <div className={styles.action}>
                                <button>{index === clicked ? onActionLogLabelClicked : onActionLogLabel}</button>
                            </div>
                        }
                    
                    </div>
                )}
            </div>
        : null
    )
}

export default Log