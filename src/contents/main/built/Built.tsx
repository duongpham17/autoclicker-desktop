import {useContext} from 'react';
import {Context} from 'contents/@context/useContentsContext';
import {copyToClipboard} from 'utils';
import {preload} from 'third-party/electron';

import useOpen from '@hooks/useOpen';

import Scripts from 'contents/@components/scripts/Scripts';
import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button';
import ScriptDescription from 'contents/@components/description/Description';
import SideWindow from '@components/sideWindow/SideWindow';

const Built = () => {

    const {onOpenValue, openValue} = useOpen<"scripts" | "description">("scripts");

    const c = useContext(Context);

    const {width, height} = preload.robot.getScreenSize();

    return ( c.script &&
        <>

            <Flex sticky style={{"marginBottom": "0.5rem"}}>

                <Button label1={c.intervalId ? "STOP" : "START"} onClick={() => c.intervalId ? c.onStopScript("stop") : c.onStartScript()} color="bright" />

                <SideWindow>
                    {c.script.build !== "prebuilt" && <Button color="light" label1="Edit" onClick={() => c.script && c.onChangeMainContent("edit", c.script)} />}
                    <Button color="light" label1="Export" onClick={() => copyToClipboard(c.script)} />
                </SideWindow>

            </Flex>

            <Flex style={{"margin": "1rem 0"}}>
                <Button label1="Script" onClick={() => onOpenValue("scripts", true)} selected={openValue === "scripts"}/>
                <Button label1="Description" onClick={() => onOpenValue("description", true)} selected={openValue === "description"} />
            </Flex>

            { openValue === "scripts" &&
                <Scripts data={c.script} />
            }
        
            { openValue === "description" &&
                <>
                    {c.script.build !== "prebuilt" &&
                        <Flex style={{"margin": "0.5rem 0"}}>
                            <p>Built on</p>
                            <p>Width ( {c.script.window?.width} ) Height ( {c.script.window?.height} )</p>
                        </Flex>
                    }
                    <Flex style={{"margin": "0.5rem 0"}}>
                        <p>Your screen </p>
                        <p>Width ( {width} ) Height ( {height} )</p>
                    </Flex>

                    <ScriptDescription data={c.script.description} />       
                </>
            }

        </>
  )
}

export default Built