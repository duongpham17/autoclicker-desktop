import styles from './Help.module.scss';
import {AiOutlineLink} from 'react-icons/ai';
import {help_data} from './Data';
import Search from '@components/search/Search';

const Help = () => {

  return (
    <div className={styles.container}>

      <Search initialData={help_data} dataKey="question" placeholder="Type an issue">
        {(data) => 
          data.map((el, index) => 
            <div key={index} className={styles.box}>
              <p className={styles.question}>{index+1}. {el.question}</p>
              
              {!el.link_url && 
                <p className={styles.answer}>{el.answer}</p>
              }
    
              {el.link_url && 
                <p className={styles.answer}>
                  <a href={el.link_url} target="_blank" rel="noreferrer">
                    <span>{el.answer}</span>
                    <AiOutlineLink/>
                  </a>
                </p>
              }
    
            </div>
        )}
      </Search>

    </div>
  )
}

export default Help