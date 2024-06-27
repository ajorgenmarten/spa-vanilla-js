
export type StoreGetter<T> = () => T | null
export type StoreSetter<T> = (value: T) => void
export type StoreDispose = () => void
export type StoreCreateFunctionReturn <T> = [StoreGetter<T>, StoreSetter<T>, StoreDispose]

export type Params = { [key: string]: any }
export interface RouteCompareFunctionReturn { success: boolean, params: Params }

export type StateVariable<T> = { value: T, callback: StateOnChangeCallback<T> | null }
export type StateGetter<T> = () => T | null
export type StateSetter<T> = (value: T) => void
export type StateOnChangeCallback<T> = (value: T) => any
export type StateOnChange<T> = (callback: StateOnChangeCallback<T>) => void
export type StateCreateFunctionReturn <T> = [StateGetter<T>, StateSetter<T>, StateOnChange<T>]