import Button from 'components/buttons/Button';
import Flex from 'components/flex/Flex';
import {CreatePropsTypes} from '../Create';


const Options = ({setViewing, viewing}: CreatePropsTypes) => {
  return (
    <Flex style={{"marginBottom": "0.5rem"}}>
        <Button label1="Build script" onClick={() => setViewing("script")} color="black" selected={viewing === "script"} />
        <Button label1='Description' onClick={() => setViewing("description")} color="black"  selected={viewing === "description"} />
    </Flex>
  )
};

export default Options