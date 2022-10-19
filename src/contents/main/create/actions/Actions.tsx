import React from 'react';
import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button';
import SideWindow from '@components/sideWindow/SideWindow';
import {CreatePropsTypes} from '../Create';


const Actions = ({edited, onSubmit, onClearScript, onRemoveScript, onImportScript}: CreatePropsTypes) => {

    return (
        <Flex sticky style={{"marginBottom": "0.5rem"}}>
            
            {edited 
                ? <Button onClick={onSubmit} label1="Save" color='bright' />
                : <div />
            }

            <SideWindow>
                <Button onClick={onImportScript} label1="import"/>
                <Button onClick={onClearScript} label1="clear"/>
                <Button onClick={onRemoveScript} label1="delete" color='red'/>
            </SideWindow>

        </Flex>
    )
}

export default Actions