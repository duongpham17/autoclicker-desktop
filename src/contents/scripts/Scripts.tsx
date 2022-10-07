import styles from './Scripts.module.scss';

import Donate from './donate';
import Create from './create';
import Search from './search';

const Scripts = () => {
  
  return (
    <div className={styles.container}>

      <Donate />

      <Create />

      <Search />

    </div>
  )
}

export default Scripts