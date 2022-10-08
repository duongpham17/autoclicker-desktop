import styles from './Log.module.scss';
import {useEffect, useState} from 'react'
import {PrintActions} from 'contents/@types';
import {copyToClipboard} from 'utils'

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
        setTimeout(() => setClicked(null), 2000)
    }, [clicked]);

    return ( 
        !!data.length ?
            <div className={`${styles.container} ${data.length >= 10 && styles.padding}`}>
                {data.map((el, index) => 
                    <div key={index} className={styles.element} onClick={() => onAction(index, el.log)}>

                        <div className={styles.information}>
                            <p>
                                <span>{el.name}</span>
                                {el.start !== -1 && <span> {el.start} <small>s</small> </span>}
                            </p>
                            <p>
                                <small>{el.robot}</small>
                                <small>{el.log}</small>
                            </p>
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