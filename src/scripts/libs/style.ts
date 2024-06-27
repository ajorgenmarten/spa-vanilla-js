/** 
 * Aplica varios estilos en linea a un elemento html 
 * @param {HTMLElement} element Elemento al que se le van a aplicar los estilos
 * @param {CSSStyleDeclaration} styles Estilos a aplicar  
 * */
export function setStyleToElement(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
    for (const style in styles) {
        const value = styles[style]
        if (value == undefined) continue;
        element.style[style] = value
    }
}