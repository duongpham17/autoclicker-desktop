import styles from './Contents.module.scss';

import { UseContentsContext } from './useContentsContext';

import Terminal from './terminal';
import Scripts from './scripts';
import Script from './script';

const Contents = () => {

    return (
        <div className={styles.container}>

            <UseContentsContext>

                <div className={styles.print}>
                    <Terminal />
                </div>

                <div className={styles.left}>
                    <Scripts />
                </div>

                <div className={styles.right}>
                    <Script />
                </div>
   
            </UseContentsContext>

        </div>
    )
}

export default Contents