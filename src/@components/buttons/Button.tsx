import styles from './Button.module.scss';
import React, {useState} from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label1: string | React.ReactNode;
    label2?: string | React.ReactNode;
    selected?: boolean,
    labelClicked?: string,
    color?: "bright" | "red" | "dark" | "light" | "black",
};

const Button = ({label1, label2, labelClicked, color, selected, ...props}: Props) => {

    const [isClicked, setIsClicked] = useState(false);

    const onClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 2000);
    };

    return (
        <div className={styles.container} onClick={onClick}>

            <button {...props} className={`${styles[color ? color : "default"]} ${selected && styles.selected}`}>

                { label1 && !label2 && 
                    <p className={styles.single}>  
                        <span> { isClicked ? (labelClicked ? labelClicked: label1) : label1 } </span>
                    </p>
                }

                { label1 && label2 && 
                    <p className={styles.double}>  
                        <span>{ isClicked ? (labelClicked ? labelClicked: label1) : label1 } </span>
                        <span>{ label2 }</span>
                    </p> 
                }

            </button>   
            
        </div>
    )
}

export default Button