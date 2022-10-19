import styles from './Summary.module.scss';
import React, {useState} from 'react';
import {MdKeyboardArrowRight, MdKeyboardArrowDown} from 'react-icons/md';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    title: string,
    open?: boolean, 
    children: React.ReactNode
}

const Summary = ({title, open=true, children, ...props}: Props) => {
    const [isOpen, setisOpen] = useState(open);

    return (
        <div className={styles.container} {...props}>

            <button onClick={() => setisOpen(!isOpen)} className={styles.openBtn}>
                <h3>
                    <span>{title}</span>
                    <span>{!isOpen ? <MdKeyboardArrowRight/> : <MdKeyboardArrowDown />}</span>
                </h3>
            </button>

            {isOpen && children}
        </div>
    )
}

export default Summary