import {useContext}  from 'react';
import {Context} from 'contents/useContentsContext';

import {BiQuestionMark, BiPlus, BiBitcoin} from 'react-icons/bi';

import Button from 'components/buttons/Button';

const Others = () => {

    const c = useContext(Context);

    return (
        <>
            <Button onClick={() => c.onSelectAction("donate")} label1="Donate" label2={<BiBitcoin/>} color="blue" style={{"marginBottom": "0.5rem"}} selected={c.script?.action === "donate"}/>

            <Button onClick={() => c.onSelectAction("help")} label1="Help" label2={<BiQuestionMark/>} color="blue" style={{"marginBottom": "0.5rem"}} selected={c.script?.action === "help"}/>

            <Button onClick={() => c.onSelectAction("create")} label1="Create script" label2={<BiPlus/>} color="blue" style={{"marginBottom": "0.5rem"}} selected={c.script?.action === "create"}/>
        </>
    )
}

export default Others