import styles from './Theme.module.scss';
import {useContext} from 'react';
import {Context} from 'theme/Theme';
import {data} from 'theme/Data';

const Theme = () => {

    const c = useContext(Context);

    return (
        <div className={styles.container}>
            {data.map(el => 
                <button key={el.theme} onClick={() => c.onSetTheme(el) } style={{"background": el.color}}>
                    {el.theme}
                </button>   
            )}
        </div>
    )
}

export default Theme