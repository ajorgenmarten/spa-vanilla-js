import MaterialButton from "../components/MaterialButton.js";
import Navbar from "../components/Navbar.js";
import Router from "../core/Router.js";
import { setStyleToElement } from "../libs/style.js";

export default function Home() {
    const mountEl = document.getElementById('app') as HTMLElement

    const options: OptionMenu[] = [
        { path: '/game/new', text: '🕹️ new game' },
        { path: '/player/new', text: '👤 new player' },
        { path: '/players', text: '👥 players' },
        { path: '/games', text: '📊 games' },
    ]

    const view = () => {
        const div = document.createElement('div')
        const fragment = document.createDocumentFragment()

        setStyleToElement(div, stylesForm)

        fragment.append( ...options.map(button) )
        div.append( fragment )
        
        return div
    }

    const button = (optionmenu: OptionMenu) => {
        const button = MaterialButton(optionmenu.text, () => Router.navigate(optionmenu.path))
        return button
    }
    
    mountEl.innerHTML = ''
    mountEl.append( Navbar(), view() )
}

const stylesForm: Partial<CSSStyleDeclaration> = {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: '10px',
    padding: '10px'
}

type OptionMenu = {
    path: string
    text: string
}