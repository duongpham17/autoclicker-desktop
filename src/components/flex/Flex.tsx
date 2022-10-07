import styles from './Flex.module.scss';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  flex?: "between" | "evenly" | "around",
  sticky?: boolean,
}

const Flex = ({children, flex, sticky, ...props}: Props) => {
  
  const check = (flex_type: Props["flex"] = "between") => {
    if(flex_type === "evenly") return styles.evenly;
    if(flex_type === "around") return styles.around;
    if(flex_type === "between") return styles.between
  }

  return (
    <div className={`${styles.container} ${check(flex)} ${sticky && styles.sticky}`} {...props}>
      {children}
    </div>
  )
}

export default Flex