import {useContext} from 'react';
import {Context} from 'contents/useContentsContext';

import Empty from './empty';
import Built from './built';
import Create from './create';

const Script = () => {

  const {script} = useContext(Context);

  return (
    <>

      { script && script.action === null && <Empty /> }

      { script && script.action === "built" && <Built /> }

      { script && (script.action === "create" || script.action === "edit") && <Create /> }

    </>
  )
}

export default Script