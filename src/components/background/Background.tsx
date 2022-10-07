import styles from './Background.module.scss';
import React from 'react';

interface Props {
  children: React.ReactNode,
  color?: "light" |"dark" | "black"
}

const Light = ({children, color="light"}: Props) => {
  return (
    <div className={`${styles.default} ${styles[color]}`}>
      {children}
    </div>
  )
}

export default Light