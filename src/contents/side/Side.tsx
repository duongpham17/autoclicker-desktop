import styles from './Side.module.scss';


import Others from './others';
import Import from './import';
import Scripts from './scripts/Scripts';

const Side = () => {
  
  return (
    <div className={styles.container}>

      <Others />

      <Import />

      <Scripts />

    </div>
  )
}

export default Side