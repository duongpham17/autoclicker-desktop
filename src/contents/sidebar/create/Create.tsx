import {useContext}  from 'react';
import {Context} from 'contents/@context/useContentsContext';

import {BiPlus} from 'react-icons/bi';

import Button from '@components/buttons/Button';

const Navbar = () => {

    const c = useContext(Context);

    return (
        <>
            <Button color="light" label1="Create script" label2={<BiPlus/>} onClick={() => c.onChangeMainContent("create")} style={{"marginBottom": "0.5rem"}} selected={c.script?.action === "create"}/>
        </>
    )
}

export default Navbar