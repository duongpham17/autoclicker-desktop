import {useState} from 'react';

const useOpen = <T>(initialState?: T) => {

    const [open, setOpen] = useState(false);

    const [openValue, setOpenValue] = useState<T | null>(initialState || null);

    const onOpen = () => setOpen(!open);

    const onOpenValue = (value:T, change=false) => {
        if((value === openValue) && !change) return setOpenValue(null);
        setOpenValue(value);
    }

    return {
        setOpen,
        onOpen,
        open,
        openValue,
        onOpenValue,
        setOpenValue
    }
};

export default useOpen;