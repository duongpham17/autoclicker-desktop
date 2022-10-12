import styles from './Mouse.module.scss';
import {useState} from 'react';
import {preload} from 'third-party/electron';
import {copyToClipboard} from 'utils';
import {AiOutlineCopy, AiOutlineCheck} from 'react-icons/ai';
import Button from 'components/buttons/Button';

const Mouse = () => {

    const [copy, setCopy] = useState(false);

    const [open, setOpen] = useState(false);

    const [intervalId, setIntervalId] = useState<any>(null);

    const [print, setPrint] = useState<{x: number, y: number, color: string}[]>([]);

    const [warning, setWarning] = useState("");

    const onStart = () => {
        const {robot} = preload;
        setOpen(true);
        let interval = setInterval(() => {
           const {x, y} = robot.getMousePos();
           let color: string = "";
           try{ color = robot.getPixelColor(x, y) } catch(err){ setWarning("Can't detect on montiors, hover mouse on main screen.") }
           if(color) setPrint(state => ([{x, y, color}, ...state]).slice(0, 50));
        }, 1000);
        setIntervalId(interval);
    };

    const onStop = (): void => {
        clearInterval(intervalId);
        setIntervalId(null);
        setWarning("");
    };;

    const onOpen = ():void => {
        if(intervalId) onStop();
        setOpen(!open);
        setWarning("");
    };

    const onClear = ():void => {
        setPrint([]);
        setWarning("");
    };

    const onCopy = ({x, y, color}:typeof print[0]):void => {
        copyToClipboard({x, y, color});
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    };

    return (
        <div className={`${styles.container} ${open && styles.open}`}>
            <div className={styles.controller}>
                <p className={styles.title}>Get mouse position data</p>
                <div>
                    <Button label1={!intervalId ? "start" : "stop"} onClick={intervalId ? onStop : onStart} style={{"padding": "0.2rem", "width": "70px"}}/>
                    <Button label1="clear" onClick={onClear} color="black" style={{"padding": "0.2rem", "width": "70px"}}/>
                    <Button label1={!open ? "open" : "close"} color="black" onClick={onOpen} style={{"padding": "0.2rem", "width": "70px"}}/>
                </div>
            </div>

            {warning && 
                <div className={styles.print} onClick={() => setWarning("")}>
                    <p className={styles.warning}>{warning}</p>
                </div>
            }

            <div className={styles.print}>
                {print.map((log, index) => 
                    <button style={{"borderColor": `#${log.color}`}} key={index} onClick={() => onCopy(log)}>
                        <p>{`{ x: ${log.x}, y: ${log.y} }`}</p>
                        <p>#{log.color} <span className={styles.copy}>{copy ? <AiOutlineCheck/> : <AiOutlineCopy/>}</span></p>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Mouse