import styles from './Menu.module.scss';
import React from 'react';
import {BiMenuAltRight} from 'react-icons/bi';

interface Props {
  children: React.ReactNode
}

const Menu = ({children}: Props) => {
  return (
    <div className={styles.container} onClick={e => e.stopPropagation()}>
        <button className={styles.btn}><BiMenuAltRight/></button>
        <div className={styles.menu} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Menu