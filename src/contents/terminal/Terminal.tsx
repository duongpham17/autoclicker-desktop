import styles from './Terminal.module.scss';
import { useContext, useState, useEffect } from 'react';
import { Context } from 'contents/@context/useContentsContext';

import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button';
import PrintLog from 'contents/@components/log/Log';

import {BsPlayFill, BsFillPauseFill} from 'react-icons/bs';
import {BiExit} from 'react-icons/bi';

const Terminal = () => {
  
  const c = useContext(Context);
  const [seconds, setSeconds] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if(c.start === "pause" || c.start === "stop") {
      setSeconds(0);
      setTotal(0);
      return
    };

    const interval = setInterval(() => {
      setSeconds((s) => (s+0.1));
      setTotal((t) => (t+0.1) )
    }, 100);

    return () => clearInterval(interval);
  }, [c.script, seconds, c.start, total]);

  useEffect(() => {
    setSeconds(0);
  }, [c.looped])

  return ( 
    
    (c.start === "start" || c.start === "pause") 

    ?

    <div className={styles.container}>

      <Button color="dark" label1={c.intervalId ? "Pause" : "Start"} label2={c.intervalId ? <BsFillPauseFill/> : <BsPlayFill/>} onClick={() => c.intervalId ? c.onStopScript("pause") : c.onStartScript()} style={{"marginBottom" : "0.5rem"}} />
      
      <Button color="dark" label1={`Looped ${c.looped} / ${c.script?.max_loops}`} label2="Clear" onClick={c.onClear} />

      <p className={styles.seconds}>
        <span>{c.script && c.script.name}</span>
        <span> {total.toFixed(2)} | {seconds.toFixed(2)} s</span>
      </p>

      <PrintLog data={c.print} />

      <Flex fixed="bottom">
        <Button color="black" label1="Exit terminal ( esc )" label2={<BiExit/>} onClick={() => c.onStopScript("stop")} style={{"marginBottom" : "0.5rem"}} />
      </Flex>

    </div>

    : 
    
    null
  )
}

export default Terminal