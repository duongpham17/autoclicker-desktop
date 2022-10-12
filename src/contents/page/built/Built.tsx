import {useContext} from 'react';
import {Context} from 'contents/useContentsContext';
import {copyToClipboard} from 'utils';

import useOpen from 'hooks/useOpen';

import Scripts from 'contents/@components/print/Scripts';
import Flex from 'components/flex/Flex';
import Button from 'components/buttons/Button';
import ScriptDescription from 'contents/@components/description/Description';
import SideWindow from 'components/sideWindow/SideWindow';

const Built = () => {

    const {onOpenValue, openValue} = useOpen<"scripts" | "description">("scripts");

    const c = useContext(Context);

    return ( c.script &&
        <>

            <Flex sticky style={{"marginBottom": "0.5rem"}}>

                <Button label1={c.intervalId ? "STOP" : "START"} onClick={() => c.intervalId ? c.onStopScript("stop") : c.onStartScript()} color="black" />

                <SideWindow>
                    {c.script.build !== "default" && <Button label1="Edit" onClick={() => c.script && c.onSelectAction("edit", c.script)} color="blue" />}
                    <Button label1="Export" onClick={() => copyToClipboard(c.script)} />
                </SideWindow>

            </Flex>

            <Flex>
                <Button label1="Script" onClick={() => onOpenValue("scripts", true)} selected={openValue === "scripts"}/>
                <Button label1="Description" onClick={() => onOpenValue("description", true)} selected={openValue === "description"} />
            </Flex>

            { openValue === "scripts" &&
                <Scripts script={c.script} />
            }
        
            { openValue === "description" &&
                <ScriptDescription data={c.script.description} />  
            }

        </>
  )
}

export default Built