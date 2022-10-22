import {useContext}  from 'react';
import {Context} from 'contents/@context/useContentsContext';

import {shorten} from 'utils';

import Button from '@components/buttons/Button';
import SearchComponent from '@components/search/Search';

const Scripts = () => {

    const c = useContext(Context);

    return (
        <SearchComponent initialData={c.scripts} dataKey="name">
            {(script) => script.map(el => 
                <Button key={el.id} label1={shorten(el.name, 15)} color="light" onClick={() => c.onChangeMainContent("built", el)} style={{"marginBottom": "0.5rem"}} selected={c.script?.id === el.id}/> 
            )}
        </SearchComponent>
    )
}

export default Scripts