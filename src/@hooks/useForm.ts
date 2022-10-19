import { useState, useEffect } from 'react';
import { Partial } from '@types';

export const useForm = <T>(initialState: T, callback: CallableFunction, validation: any) => {

    const [edited, setEdited] = useState(false);

    const [values, setValues] = useState<T>(initialState);

    const [errors, setErrors] = useState<{[key: string]: any}>({});

    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if(event.target.type !== "number") setValues({...values, [event.target.name] : event.target.value});
        if(event.target.type === "number") setValues({...values, [event.target.name] : Number(event.target.value)});
        if(!edited) setEdited(true);
    };

    const onSetValue = (v: Partial<typeof initialState | T>) => {
        setValues(state => ({...state, ...v}))
        if(!edited) setEdited(true);
    }

    const onClear = (state?: T) => {
        if(!state) setValues(initialState);
        if(state) setValues(state);
        setEdited(false);
    }

    useEffect(() => {
        return () => {
            setLoading(false);
            setEdited(false);
        }
    }, [])

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if(loading) return;

        const errors = validation(values);

        const noErrors = Object.keys(errors).length === 0;

        if(noErrors) {
            setLoading(true);
            await callback();
            setLoading(false);
            setEdited(false);
        };

        setErrors(errors);
    };

    return {
        values, setValues,
        errors, setErrors,
        loading, setLoading,
        edited, setEdited,
        onSetValue,
        onChange, 
        onSubmit,
        onClear,
    }
}

export default useForm;