import styles from './Log.module.scss';
import {PrintLogsTypes} from 'contents/@types';
import {BsArrowReturnRight, BsFillSquareFill} from 'react-icons/bs';
import {shorten} from 'utils';
import Observer from '@components/observer/Observer';

interface Props {
    data: PrintLogsTypes[],
}

const Log = ({data}: Props) => {
    return (  
        !!data.length ?
            <div className={`${styles.container} ${data.length >= 10 && styles.padding}`}>
                {data.map((el, index) => 
                    <Observer key={index}>
                        <div className={`${styles.element} ${el.start === -1 && styles.completed} ${styles[`box${index}`]}`}>
    
                            <div>
                                <p>{el.name}</p>
                                <p>{el.start === -1 ? el.normal_log : el.start} {el.start !== -1 && <small> s </small>}</p>
                            </div>
    
                            <div>
                                <p><small>{el.normal_robot}</small></p>
                                {el.normal_robot === "getPixelColor" &&
                                    <p><small> {el.normal_log} </small> <BsFillSquareFill className={styles.iconColor} color={el.pixel_color}/></p>
                                }
                                {el.normal_robot !== "getPixelColor" && 
                                    <p><small> {el.start !== -1 && el.normal_log} </small></p>
                                }
                            </div>
                            
                            { el.normal_event === "color" &&
                                <div>
                                    <p><BsArrowReturnRight className={`${styles.iconArrow} ${(!el.pixel_color_detected && el.pixel_color) ? styles.false : styles.true}`} /> <small>color found</small></p>
                                    <p><small> {el.pixel_color_detected ? "true" :  "false"} </small></p>
                                </div>
                            }
                            
                            { !!el.loop_remainder &&
                                <div>
                                    <p><BsArrowReturnRight className={styles.iconArrow} /> <small>run at loop {el.loop_remainder}</small></p>
                                </div>
                            }
    
                            { el.normal_event === "color" && 
                                <div>
                                    <p> <BsArrowReturnRight className={styles.iconArrow} /> <small>{el.pixel_color_robot}</small> </p>
                                    <p> <small>{shorten(el.pixel_color_log, 30)}</small> </p>
                                </div>
                            }
                    
                        </div>
                    </Observer>
                )}
            </div>
        : null
    )
}


export default Log