import styles from './Donate.module.scss';
import { useState } from 'react';
import { copyToClipboard, middleElipses } from 'utils';
import { BsCurrencyBitcoin } from 'react-icons/bs';

import Button from 'components/buttons/Button';

const Donate = () => {

    const [open, setOpen] = useState(false);

    const [copy, setCopy] = useState("")

    const onCopy = (address: string, name: string) => {
        copyToClipboard(address);
        setCopy(name);
        setTimeout(() => setCopy(""), 2000)
    }

    const crypto_list = [
        {
            name: "cardano",
            qrcode: "https://bafkreiacsewjg5csdeok6yb5brksuowwjlkqeh6j56gvj6cjcoxllmenbu.ipfs.nftstorage.link/",
            address: "addr1qx2m6unxmyye00t6eh3swf60yxa3mgnhrk4rt0csdreuwhdg5e62j6zj6wglh00mxw899zcnj29cdd36muntc8zrkheq0hp3gk"
        },
        {
            name: "bitcoin",
            qrcode: "https://bafkreigbpaaormdfw6xzsejx4git4gbdzwf4ohvk23dxjkvel3ob73sm2u.ipfs.nftstorage.link/",
            address: "18eYRmvB6j8P87YyAb5JVtVd4hbHdubYng"
        }
    ]

    return (
        <div className={styles.container}>

            <Button label1="Donate" label2={<BsCurrencyBitcoin/>} onClick={() => setOpen(!open)} color="blue" style={{"marginBottom": "0.5rem"}}/>

            {open && 
                <div className={styles.map}>
                    {crypto_list.map(el => 
                        <div className={styles.element} key={el.name} onClick={() => onCopy(el.address, el.name)}>
                            <img src={el.qrcode} alt="qr code" />   
                            <p>
                                <span>{el.name}</span>
                                <span>{copy===el.name ? "copied" : middleElipses(el.address)}</span>
                            </p>
                        </div> 
                    )}
                </div>
            }

        </div>
    )
}

export default Donate