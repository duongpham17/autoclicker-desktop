// convert object into conditional types
export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface AnyKeys {
    [key: string]: string
}