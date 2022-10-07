import { useState } from 'react';
import { upload } from 'third-party/nftstorage';
import { ScriptDataTypes } from 'contents/@types';
import { removeArrayObject, updateArrayItem} from 'utils'

import Background from 'components/background/Background';
import File from 'components/inputs/File';
import Button from 'components/buttons/Button';
import Textarea from 'components/inputs/Textarea';
import ScriptDescription from 'contents/components/description/Description';

interface Props {
    values: ScriptDataTypes,
    onSetValue: CallableFunction,
    viewing: string,
}

const Description = ({values, onSetValue, viewing}: Props) => {

    const [loading, setLoading] = useState(false);

    const [position, setPosition] = useState<number | null>(null);

    const [edit, setEdit] = useState({
        selected: false,
        index: 0
    });

    const [descriptionData, setDescriptionData] = useState<string>("");

    const onAdd = () => {
        onSetValue({description: [...values.description, descriptionData]});
        setDescriptionData("");
    };

    const onUploadImage = async (blobs: any[]) => {
        setLoading(true);
        const ipfs_urls = [];
        for(let x of blobs) {
            const {ipfs} = await upload(x);
            ipfs_urls.push(`https://${ipfs}.ipfs.nftstorage.link`);
        }
        await onSetValue({description: [...values.description, ...ipfs_urls]});
        setLoading(false);
    };

    const onSelectEditDescription = (index: number, des: string) => {
        if(des.slice(0,5).includes("https")) return;
        setEdit({selected: true, index});
        setDescriptionData(des)
    }

    const onUpdateDescription = () => {
        const newDescriptions = updateArrayItem(edit.index, values.description, descriptionData);
        onSetValue({description: newDescriptions});
        setEdit({selected: false, index: 0});
        setDescriptionData("");
    };

    const onDeleteDescription = (index: number) => {
        const newDescription = removeArrayObject(index, values.description);
        onSetValue(({description: newDescription}));
    };

    const onPosition = (index: number) => {
        if(position === null) return setPosition(index);
        const data = [...values.description];
        const item = data.splice(position, 1)[0];
        data.splice(index, 0, item);
        onSetValue({description: data});
        setPosition(null);
    };
    
    return ( viewing === "description" ? 
        <>
            <Background color="light">

                <Textarea label1="Description" type="text" placeholder="..."  name="name" value={descriptionData} onChange={(e) => setDescriptionData(e.target.value)}/>

                {descriptionData && <Button label1={edit.selected ? "Update description" : "Add description"} onClick={edit.selected ? onUpdateDescription : onAdd}  color='black' style={{"marginBottom": "0.5rem"}}/> }

                <File callback={onUploadImage} />

                {loading && <div className='loading-30 center' />}

            </Background>

            <ScriptDescription data={values.description} position={position} onPosition={onPosition} edit>
                {(el, index) => 
                    <>
                        <Button label1="edit" onClick={() => onSelectEditDescription(index, el)} color='black' style={{"marginBottom": "0.5rem"}}/> 
                        <Button label1="remove" onClick={() => onDeleteDescription(index)} color='red' style={{"marginBottom": "0.5rem"}}/> 
                    </>
                }
            </ScriptDescription>
        </>    
        : null
    )
}

export default Description