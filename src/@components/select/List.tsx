import styles from './List.module.scss';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string | number,
    hover: string | number
};

const List = ({value, hover, ...props}: Props) => {
    return (
        <div className={styles.container}>
            <button {...props}>
                <span>{value}</span>
                <small>{hover}</small>
            </button>
        </div>
    )
}

export default List