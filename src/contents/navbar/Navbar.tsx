import styles from './Navbar.module.scss';
import {useContext}  from 'react';
import {Context} from 'contents/@context/useContentsContext';
import {MainContentTypes} from 'contents/@types';

const Navbar = () => {

    const c = useContext(Context);

    const main_contents: MainContentTypes[] = ["donate", "help", "theme"];

    return (
        <div className={styles.container}>
            {main_contents.map((el, i) => 
                <button key={i} onClick={() => c.onChangeMainContent(el)} className={`${el === c.mainContent && styles.selected}`}>
                    {el}
                </button>    
            )}
        </div>
    )
}

export default Navbar