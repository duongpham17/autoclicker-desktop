import styles from './Select.module.scss';
import React, {useState} from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface Props<T>{
    label1: string;
    selected: string | number | null | undefined,
    items: T[];
    style: {[key:string]: string},
    children: (items: T[]) => React.ReactNode,
};

const Select = <T,>({label1, items, selected, children, style}: Props<T>) => {

    const [open, setOpen] = useState(false);

    return (
        <div className={styles.container} onClick={() => setOpen(!open)} style={style}>

            <button className={styles.button} onClick={() => setOpen(!open)}>
                <span>{label1} {selected && <small>( {selected} )</small>} </span>
                <span>{open ? <MdOutlineKeyboardArrowDown/> : <MdOutlineKeyboardArrowRight/> }</span>
            </button>

            {open && 
                children(items)
            }

        </div>
    )
}

export default Select