import styles from './Contents.module.scss';

import { UseContentsContext } from './useContentsContext';

import Terminal from './terminal';
import Page from './page';
import Side from './side';

const Contents = () => {

    return (
        <div className={styles.container}>

            <UseContentsContext>

                <div className={styles.print}>
                    <Terminal />
                </div>

                <div className={styles.left}>
                    <Side />
                </div>

                <div className={styles.right}>
                    <Page />
                </div>
   
            </UseContentsContext>

        </div>
    )
}

export default Contents