export const shorten = (text: string, length: number = 20): string => text.length >= length ? `${text.substring(0, length).trim()}...` : text;

export const middleElipses = (text: string, start=4, end=4) => `${text.slice(0, start)}...${text.slice(-end)}`;

export const copyToClipboard = (data: any) => {
    if(typeof data !== "string") return navigator.clipboard.writeText(JSON.stringify(data));
    return navigator.clipboard.writeText(data);
}

export const readFromClipboard = async () => {
    let data = await navigator.clipboard.readText();
    if(data.includes("{") || data.includes("[")) data = JSON.parse(data);
    return data;
}

export const updateArrayObject = <T>(arr: T[], index: number, obj: T): T[] => {
    const newArray = [...arr];
    newArray.splice(index, 1, obj);
    return newArray
}

export const removeArrayObject = <T>(index: number, arr: T[]): T[] => {
    let newArray = [...arr];
    if(arr.length !== 0) newArray.splice(index, 1);
    if(arr.length === 0) newArray = []
    return newArray;
}

export const updateArrayItem = <T>(index: number, arr: T[], item: T): T[] => {
    const newArray = [...arr];
    newArray.splice(index, 1, item);
    return newArray;
}

export const localStorageSet = (name: string, data: {} | []) => {
    localStorage.setItem(name, JSON.stringify(data));
} 

export const localStorageGet = (name: string) => {
    const string = localStorage.getItem(name);
    if(string){
        const data = JSON.parse(string);
        return data;
    }
    return null;
}