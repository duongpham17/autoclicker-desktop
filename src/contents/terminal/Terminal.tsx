import styles from './Terminal.module.scss';
import { useContext } from 'react';
import { Context } from 'contents/useContentsContext';

import Button from 'components/buttons/Button';
import PrintLog from 'contents/components/print/Log';

const Terminal = () => {
  
  const c = useContext(Context);

  return (c.intervalId &&
    <div className={styles.container}>

      <Button label1={c.intervalId ? "STOP" : "START"} onClick={c.intervalId ? c.onStopScript : c.onStartScript} color="black" style={{"marginBottom" : "0.5rem"}} />
      
      <Button label1={c.looped} label2="Clear" onClick={c.onClear} color="black" />

      <PrintLog data={c.print} />

    </div>
  )
}

export default Terminal