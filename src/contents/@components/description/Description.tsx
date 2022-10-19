import styles from './Description.module.scss';
import React from 'react';
import {v4 as uuidv4} from 'uuid';

import Menu from '@components/menu/Menu'

interface Props {
    data: string[],
    edit?: boolean
    position?: number | null,
    children?: (el: string, index: number) => React.ReactNode,
    onPosition?: (index: number) => void;
    onSelectEditDescription?: (index: number, data: string) => void,
}

const Description = ({data, position, onPosition, children, edit=false}: Props) => {
  return (
    <div className={styles.container}>
        {data.map((el, index) => 
            <div key={uuidv4()} className={`${styles.element} ${edit ? styles.edit : styles.plain} ${edit && index === position && styles.selected}`}>
                <div className={styles.index} onClick={() => onPosition && onPosition(index)}>
                    <p>{index+1}.</p>
                </div>
                <div className={styles.information} onClick={() => onPosition && onPosition(index)}>
                    {el.slice(0, 5).includes("https") 
                        ? <img src={el} alt="script" />
                        : <p>{el}</p>  
                    }
                </div>
                { children && 
                    <Menu>
                        {children(el, index)}
                    </Menu>
                }
            </div>
        )}
    </div>

  )
}

export default Description