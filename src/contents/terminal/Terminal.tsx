import styles from './Terminal.module.scss';
import { useContext } from 'react';
import { Context } from 'contents/@context/useContentsContext';

import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button';
import PrintLog from 'contents/@components/print/Log';

import {BsPlayFill, BsFillPauseFill} from 'react-icons/bs';
import {BiExit} from 'react-icons/bi';

const Terminal = () => {
  
  const c = useContext(Context);
  
  return ( 
    
    (c.start === "start" || c.start === "pause") 
    
    ?

    <div className={styles.container}>

      <Button color="dark" label1={c.intervalId ? "Pause" : "Start"} label2={c.intervalId ? <BsFillPauseFill/> : <BsPlayFill/>} onClick={() => c.intervalId ? c.onStopScript("pause") : c.onStartScript()} style={{"marginBottom" : "0.5rem"}} />
      
      <Button color="dark" label1={c.looped} label2="Clear" onClick={c.onClear} />

      <PrintLog data={c.print} />

      <Flex fixed="bottom">
        <Button label1="Exit terminal ( esc )" label2={<BiExit/>} onClick={() => c.onStopScript("stop")} style={{"marginBottom" : "0.5rem"}} />
      </Flex>

    </div>

    : 
    
    null
  )
}

export default Terminal