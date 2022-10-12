import {useContext} from 'react';
import {Context} from 'contents/useContentsContext';

import Empty from './empty';
import Built from './built';
import Create from './create';
import Donate from './donate';
import Help from './help';

const Page = () => {

  const {script} = useContext(Context);

  return ( script &&
    <>

      { script.action === null && <Empty /> }

      { script.action === "donate" && <Donate /> }

      { script.action === "help" && <Help /> }

      { (script.action === "create" || script.action === "edit") && <Create /> }

      { script.action === "built" && <Built /> }

    </>
  )
}

export default Page