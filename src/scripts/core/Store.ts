import { StoreCreateFunctionReturn, StoreDispose, StoreGetter, StoreSetter } from "../../types/core";

export default class Store {
    /**
     * Funcion para crear una nueva entrada para persistir datos de la aplicacion
     * @param {string} name identificador donde se va a persistir los datos
     * @param {any} value valor que se va a persistir en este identificador
     */
    static create<T>( name: string , value: T ): StoreCreateFunctionReturn<T> {
        if ( localStorage.getItem(name) == null ) {
            const stringValue = JSON.stringify(value)
            localStorage.setItem(name, stringValue)
        }
        return this.use<T>(name)
    }

    private static getter<T> (name: string) {
        const stringValue = localStorage.getItem(name)
        if (!stringValue) return null
        return JSON.parse(stringValue) as T
    }

    private static setter<T> (name: string, value: T) {
        const exists = localStorage.getItem(name)
        if ( !exists ) throw new Error('Store no exists')
        const stringValue = JSON.stringify(value)
        localStorage.setItem( name, stringValue )
    }

    private static dispose (name: string) {
        localStorage.removeItem(name)
    }

    /**
     * Funcion para usar una entrada de persistencia creada
     * @param name identificador de persistencia de datos
     */
    static use<T > (name: string): StoreCreateFunctionReturn<T> {
        /** Funcion para obtener los datos persistidos de este identificador */
        const getter: StoreGetter<T> = () => this.getter<T>(name)
        /** Funcion para establecer datos nuevos a persistir en este identificador */
        const setter: StoreSetter<T> = (value: T) => this.setter(name, value)
        /** Funcion para eliminar esta entrada */
        const dispose: StoreDispose = () => this.dispose(name)
        return [getter, setter, dispose]
    }
}