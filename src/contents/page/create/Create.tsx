import {scriptDataInitialState} from 'contents/@states';
import React, {useContext, useState, Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import {Context} from 'contents/useContentsContext';
import {v4 as uuidv4} from 'uuid';
import {ScriptDataTypes} from 'contents/@types';
import {updateArrayObject, removeArrayObject, localStorageGet, localStorageSet} from 'utils';

import useForm from 'hooks/useForm';
import Valiation from './Validation';

import Actions from './actions';
import About from './about';
import Options from './options';
import Build from './build';
import Description from './description';

export interface CreatePropsTypes {
    edited: boolean,
    viewing: 'script' | "description",
    errors: {[key: string]: any},
    values: ScriptDataTypes,
    setViewing: Dispatch<SetStateAction<"script" | "description">>
    onSetValue: (v: Partial<any>) => void,
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    onSubmit: (event: React.SyntheticEvent<Element, Event>) => Promise<void>,
    onRemoveScript: () => void,
    onClearScript: () => void,
    onImportScript: () => void
}

const Create = () => {

    const {setScript, script, setScripts, scripts} = useContext(Context);

    const [viewing, setViewing] = useState<"script" | "description">("script");

    const initialState: ScriptDataTypes = useMemo(() => ({...scriptDataInitialState, id: uuidv4(), action: "create"}), []);

    const {onSubmit, values, onChange, errors, setValues, onClear, onSetValue, edited, setEdited} = useForm(initialState, callback, Valiation);

    useEffect(() => {
        if(script?.action === "edit") setValues(script);
        if(script?.action === "create") setValues(initialState)
    }, [script, setValues, initialState]);

    const onSetScripts = (newScript: ScriptDataTypes): void => {
        const parased_data: ScriptDataTypes[] = localStorageGet("scripts");

        if(!parased_data) {
            localStorageSet("scripts", [newScript]);
            setScripts((state) => ([newScript, ...state]));
        }

        if(parased_data){
            const script_index = scripts.findIndex(el => el.id === newScript.id);
            const storage_index = parased_data.findIndex(el => el.id === newScript.id);

            if(script_index === -1) {
                setScripts(state => ([ newScript , ...state]));
            };

            if(script_index !== -1) {
                const newScripts = updateArrayObject(scripts, script_index, newScript);
                setScripts(newScripts);
            };

            if(storage_index === -1){
                localStorageSet("scripts", [newScript, ...parased_data]);
            };

            if(storage_index !== -1) {
                const newScripts = updateArrayObject(parased_data, storage_index, newScript);
                localStorageSet("scripts", newScripts)
            };
        }
    };

    const onRemoveScript = (): void => {
        const parased_data: ScriptDataTypes[] = localStorageGet("scripts");

        if(!parased_data) return;
        if(!script) return;

        const script_index = scripts.findIndex(el => el.id === script.id);
        const storage_index = parased_data.findIndex(el => el.id === script.id);

        if(script_index === -1 || storage_index === -1) return;
        
        const newScripts = removeArrayObject(script_index, scripts);
        setScripts(newScripts);
        setScript(scriptDataInitialState)

        const newStorageScripts = removeArrayObject(storage_index, parased_data);
        localStorage.setItem("scripts", JSON.stringify(newStorageScripts));
    };

    const onClearScript = () => {
        onClear(initialState);
    };

    const onImportScript = async () => {
        try{
            const string = await navigator.clipboard.readText();
            if(!string) return;
            const data = JSON.parse(string);
            if(!data) return;
            setValues({...data, build:"custom", action: "edit", id: uuidv4()});
            setEdited(true);
        } catch {
            return
        }
    };

    function callback() { 
        onSetScripts(values);
    };

    const value: CreatePropsTypes = {
        onRemoveScript,
        onClearScript,
        onImportScript,
        onChange,
        edited,
        errors,
        values,
        viewing,
        setViewing,
        onSetValue,
        onSubmit,
    }

    return (
        <>

            <Actions {...value} />

            <About {...value} />

            <Options {...value} />

            <Build {...value} />

            <Description {...value} />

        </>
    )
}

export default Create