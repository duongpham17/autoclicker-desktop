import {useContext}  from 'react';
import {Context} from 'contents/useContentsContext';
import {ScriptDataTypes} from 'contents/@types';
import {localStorageSet, localStorageGet} from 'utils';
import {v4 as uuidv4} from 'uuid';
import {BiImport} from 'react-icons/bi'

import Button from 'components/buttons/Button';

const Import = () => {

    const c = useContext(Context);

    const onImport = async () => {
        try{
            const string = await navigator.clipboard.readText();
            if(!string) return 
            const data:ScriptDataTypes = JSON.parse(string);
            if(!data) return;
            data.id = uuidv4();
            data.name = `${data.name} ${uuidv4().slice(0, 3)}`;
            data.build = "custom";
            c.setScripts(state => ([data, ...state]));
            const scripts = localStorageGet("scripts") || [];
            localStorageSet("scripts", [data, ...scripts]);
        } catch(err) {
            return 
        }
    };

    return (
        <>
            <Button onClick={onImport} label1="Import" label2={<BiImport/>} style={{"marginBottom": "0.5rem"}} />
        </>
    )
}

export default Import