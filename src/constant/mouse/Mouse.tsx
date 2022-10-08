import styles from './Mouse.module.scss';
import {useState} from 'react';
import {preload} from 'third-party/electron';
import {copyToClipboard} from 'utils';
import Button from 'components/buttons/Button';

const Mouse = () => {

    const [copy, setCopy] = useState(false);

    const [open, setOpen] = useState(false);

    const [intervalId, setIntervalId] = useState<any>(null);

    const [print, setPrint] = useState<{x: number, y: number}[]>([]);

    const onStart = () => {
        const {robot} = preload;
        setOpen(true);

        let interval = setInterval(() => {
           const {x, y} = robot.getMousePos();
           setPrint(state => ([{x, y}, ...state]).slice(0, 50));
        }, 1000);

        setIntervalId(interval);
    };

    const onStop = (): void => {
        clearInterval(intervalId);
        setIntervalId(null);
    };;

    const onOpen = ():void => {
        if(intervalId) onStop();
        setOpen(!open)
    };

    const onClear = ():void => {
        setPrint([]);
    };

    const onCopy = (coord: {x: number, y: number}):void => {
        copyToClipboard(coord);
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    };

    return (
        <div className={`${styles.container} ${open && styles.open}`}>
            <div className={styles.controller}>
                <p className={styles.title}>Get mouse position</p>
                <div>
                    <Button label1={!intervalId ? "start" : "stop"} onClick={intervalId ? onStop : onStart} style={{"padding": "0.2rem", "width": "100px"}}/>
                    <Button label1="clear" onClick={onClear} color="black" style={{"padding": "0.2rem", "width": "80px"}}/>
                    <Button label1={!open ? "open" : "close"} color="black" onClick={onOpen} style={{"padding": "0.2rem", "width": "70px"}}/>
                </div>
            </div>
            <div className={styles.print}>
                {print.map((log, index) => 
                    <button key={index} onClick={() => onCopy(log)}>
                        <p>{`{ x: ${log.x}, y: ${log.y} }`}</p>
                        <span>{copy ? "copied" : "copy"}</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Mouse