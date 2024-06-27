import { setStyleToElement } from "../libs/style.js";
import MaterialButton from "./MaterialButton.js";

export default function BackBtn () {
    const button = MaterialButton('⬅️ Back', () => location.pathname !== '/' && history.back())
    setStyleToElement(button, BackBtnStyles)
    return button
}

const BackBtnStyles: Partial<CSSStyleDeclaration> = {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-white)',
    margin: '10px'
}