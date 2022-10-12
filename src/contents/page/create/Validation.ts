import { Partial } from '@types';
import { ScriptDataTypes } from 'contents/@types';

export const Valiation = (values: ScriptDataTypes) => {
    let errors: Partial<ScriptDataTypes> = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "required";
        }
    } 

    if(check("max_loops")){
        if(values.max_loops === 0){
            errors.max_loops = "required" as any;
        }
    }

    return errors
}

export default Valiation;