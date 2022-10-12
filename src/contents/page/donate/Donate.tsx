import styles from './Donate.module.scss';
import { useState } from 'react';
import { copyToClipboard, middleElipses } from 'utils';

import Flex from 'components/flex/Flex';
import Button from 'components/buttons/Button';

const Donate = () => {

    const [copy, setCopy] = useState("");

    const [crypto, setCrypto] = useState("Bitcoin");

    const onCopy = (address: string, name: string) => {
        copyToClipboard(address);
        setCopy(name);
        setTimeout(() => setCopy(""), 2000)
    }

    const crypto_list = [
        {
            name: "Bitcoin",
            qrcode: "https://bafkreigkgvfn2q4jlheyxnvesqy675to3v7smsy2gaazzg5jbinuuvjcbq.ipfs.nftstorage.link/",
            address: "18eYRmvB6j8P87YyAb5JVtVd4hbHdubYng"
        },
        {
            name: "Cardano",
            qrcode: "https://bafkreiacsewjg5csdeok6yb5brksuowwjlkqeh6j56gvj6cjcoxllmenbu.ipfs.nftstorage.link/",
            address: "addr1qx2m6unxmyye00t6eh3swf60yxa3mgnhrk4rt0csdreuwhdg5e62j6zj6wglh00mxw899zcnj29cdd36muntc8zrkheq0hp3gk"
        },
    ]

    return (
        <div className={styles.container}>

            <Flex>
                {crypto_list.map(el => 
                    <Button label1={el.name} color="black" key={el.name} selected={crypto === el.name} onClick={() => setCrypto(el.name)} />  
                )}
            </Flex>

            {crypto_list.map(el => el.name === crypto &&
                <div className={styles.element} key={el.name} onClick={() => onCopy(el.address, el.name)}>
                    <img src={el.qrcode} alt="qr code" />   
                    <p>{copy===el.name ? "Copied address" : middleElipses(el.address, 5, 5)}</p>
                </div> 
            )}

        </div>
    )
}

export default Donate