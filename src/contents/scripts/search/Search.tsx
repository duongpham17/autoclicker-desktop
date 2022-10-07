import {useContext}  from 'react';
import {Context} from 'contents/useContentsContext';

import {shorten} from 'utils';

import Button from 'components/buttons/Button';
import SearchComponent from 'components/search/Search';

const Search = () => {

    const c = useContext(Context);

    return (
        <SearchComponent initialData={c.scripts} dataKey="name">
            {(script) => script.map(el => 
                <Button key={el.id} label1={shorten(el.name, 30)} onClick={() => c.onSelectScript("built", el)} style={{"marginBottom": "0.5rem"}}/> 
            )}
        </SearchComponent>
    )
}

export default Search