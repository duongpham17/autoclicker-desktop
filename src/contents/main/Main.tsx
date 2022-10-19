import {useContext, lazy, Suspense} from 'react';
import {Context} from 'contents/@context/useContentsContext';

import Empty from './empty';

const Donate = lazy(() => import('./donate'));
const Create = lazy(() => import('./create'));
const Built = lazy(() => import('./built'));
const Help = lazy(() => import('./help'));
const Theme = lazy(() => import('./theme'));

const Main = () => {

  const {mainContent} = useContext(Context);

  return ( mainContent &&
    <>

      { mainContent === null && <Empty /> }

      { mainContent === "donate" && 
        <Suspense> 
          <Donate /> 
        </Suspense> 
      }
      
      { mainContent === "help" && 
        <Suspense> 
          <Help /> 
        </Suspense> 
      }

      { (mainContent === "create" || mainContent === "edit") && 
        <Suspense> 
          <Create /> 
        </Suspense>  
      }

      { mainContent === "built" && 
        <Suspense> 
          <Built /> 
        </Suspense>  
      }

      { mainContent === "theme" && 
        <Suspense> 
          <Theme /> 
        </Suspense>  
      }

    </>
  )
}

export default Main