import styles from './Contents.module.scss';
import { lazy, Suspense } from 'react';

import { UseContentsContext } from './@context/useContentsContext';

import Main from './main';
import Sidebar from './sidebar';
import Navbar from './navbar';

const Terminal = lazy(() => import('./terminal'));

const Contents = () => {

    return (
        <div className={styles.container}>

            <UseContentsContext>

                <div className={styles.print}>
                    <Suspense>
                        <Terminal />
                    </Suspense>
                </div>

                <div className={styles.navbar}>
                    <Navbar/>
                </div>

                <div className={styles.sidebar}>
                    <Sidebar />
                </div>

                <div className={styles.main}>
                    <Main />
                </div>
   
            </UseContentsContext>

        </div>
    )
}

export default Contents