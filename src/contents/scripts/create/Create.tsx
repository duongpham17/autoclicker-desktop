import {useContext}  from 'react';
import {Context} from 'contents/useContentsContext';

import Button from 'components/buttons/Button';

const Create = () => {

    const c = useContext(Context);

    return (
        <Button onClick={() => c.onSelectScript("create")} label1="Create" label2="+" color="black" style={{"marginBottom": "0.5rem"}} />
    )
}

export default Create