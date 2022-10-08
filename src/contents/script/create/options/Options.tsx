import Button from 'components/buttons/Button';
import Flex from 'components/flex/Flex';
import {CreatePropsTypes} from '../Create';


const Options = ({setViewing, viewing}: CreatePropsTypes) => {
  return (
    <Flex style={{"marginBottom": "0.5rem"}}>
        <Button label1="Build script" onClick={() => setViewing("script")} color="dark" selected={viewing === "script"} />
        <Button label1='Description' onClick={() => setViewing("description")} color="dark"  selected={viewing === "description"} />
    </Flex>
  )
};

export default Options