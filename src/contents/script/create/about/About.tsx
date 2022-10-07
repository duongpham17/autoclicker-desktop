import {CreatePropsTypes} from '../Create';

import Flex from 'components/flex/Flex';
import Input from 'components/inputs/Input';



const About = ({values, errors, onChange}: CreatePropsTypes) => {
  return (
    <Flex>
      <Input type="text" smallLabelColor="red" placeholder='...' name="name" value={values.name || ""} onChange={onChange} label1="Script name" label2={errors.name && errors.name} />
      <Input type="number" smallLabelColor="red" placeholder='...' name="max_loops" value={values.max_loops || ""} onChange={onChange} label1="Max loops" label2={errors.max_loops && errors.max_loops} />
    </Flex>
  )
}

export default About