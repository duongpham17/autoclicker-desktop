import styles from './Scripts.module.scss';
import {ReactNode} from 'react';
import {ScriptDataTypes, Script} from 'contents/@types';
import {v4 as uuidv4} from 'uuid';

interface Props {
    script: ScriptDataTypes,
    selected?: number | null,
    children?: (script: Script, index: number) => ReactNode,
    onSelectScript?: (script: ScriptDataTypes["script"][0], index: number) => void,
};

const Scripts = ({script, onSelectScript, children, selected}: Props) => {

    return (
        <div className={styles.container}>
            {script.script.map((el, index) => 
                <div className={`${styles.element} ${selected === index && styles.selected}`} key={el.id || uuidv4()} onClick={() => onSelectScript && onSelectScript(el, index)}>

                    <div className={styles.index}>
                        <p>{index+1}.</p>
                    </div>

                    <div className={styles.information}>
                        <p>
                            <span> {el.name} </span>
                            <span> {el.start} <small>s</small> </span>
                        </p>
                        <p>
                            <small>{el.robot} {!!el.loop_remainder && `( run at loop ${el.loop_remainder} )`}</small>
                            {el.robot === "moveMouse" && <small>{` { x: ${el.move?.x}, y: ${el.move?.y} }`}</small>}
                            {(el.robot === "keyTap" || el.robot === "keyToggle" ) && <small>{el.keyboard}</small>}
                        </p>
                    </div>

                    { children &&
                        <div className={styles.otherActions}>
                            {children(el, index)}
                        </div>
                    }

                </div>    
            )}
        </div>
    )
}

export default Scripts