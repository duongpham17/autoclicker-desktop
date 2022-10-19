import Button from '@components/buttons/Button';
import Flex from '@components/flex/Flex';
import {CreatePropsTypes} from '../Create';


const Options = ({setViewing, viewing}: CreatePropsTypes) => {
  return (
    <Flex style={{"marginBottom": "1rem"}}>
        <Button label1="Build script" onClick={() => setViewing("script")} selected={viewing === "script"} />
        <Button label1='Description' onClick={() => setViewing("description")} selected={viewing === "description"} />
    </Flex>
  )
};

export default Options