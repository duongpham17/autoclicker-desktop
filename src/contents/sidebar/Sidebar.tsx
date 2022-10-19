import styles from './Sidebar.module.scss';

import Create from './create';
import Import from './import';
import Scripts from './scripts';

const Side = () => {
  
  return (
    <div className={styles.container}>

      <Create />

      <Import />

      <Scripts />

    </div>
  )
}

export default Side