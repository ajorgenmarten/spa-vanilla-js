import { StateCreateFunctionReturn, StateGetter, StateOnChange, StateOnChangeCallback, StateSetter, StateVariable } from "../../types/core";

export default class State {
    /**
     * Crea un nuevo estado
     * @param value Valor inicial del estado
     */
    static create<T>(value: T): StateCreateFunctionReturn<T> {
        const state: StateVariable<T> = { value, callback: null }

        /** Obtiene el valor actual del estado */
        const getter: StateGetter<T> = () => {
            return state.value
        }

        /**
         * Establece un nuevo valor al estado
         * @param {T} value Nuevo valor para establecer al estado
         */
        const setter: StateSetter<T> = (value) => {
            state.value = value
            state.callback && state.callback(value)
        }

        /**
         * Ejecuta un callback cuando se modifica el estado
         * @param {StateOnChangeCallback<T>} callback Callback a ejecutar cuando se modifica el estado
         */
        const onChange: StateOnChange<T> = (callback) => {
            state.callback = callback
        }
        return [getter, setter, onChange]
    }
}