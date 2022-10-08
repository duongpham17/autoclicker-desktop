import styles from './Input.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    color?: "black",
    label1?: string | number, 
    label2?: string | number | React.ReactNode,
    smallLabelColor?: "red" | "none",
};

const Input = ({color, label1, label2, smallLabelColor = "none", ...props}:Props) => {
  return (
    <div className={styles.container}>

        {label1 && !label2 && 
            <label className={styles.single}>
                <span>{label1}</span>
            </label>
        }

        {label1 && label2 && 
            <label className={styles.double}> 
                <span>{label1}</span>
                <small className={`${styles[smallLabelColor]}`}>{label2}</small>
            </label>
        }

        <input {...props} className={styles[color ? color : "plain"]} />

    </div>
  )
}

export default Input