import BackBtn from "../components/BackBtn.js"
import MaterialButton from "../components/MaterialButton.js"
import Navbar from "../components/Navbar.js"
import UserSelect from "../components/UserSelect.js"
import { setStyleToElement } from "../libs/style.js"

export default function NewGame () {
    const mountEl = document.getElementById('app') as HTMLDivElement

    const view = () => {
        const form = document.createElement('form')
        const fragment = document.createDocumentFragment()
        const p1 = UserSelect({ required: true })
        const p2 = UserSelect({ required: true })
        const p3 = UserSelect({ required: true })
        const p4 = UserSelect({ required: true })
        const t1 = document.createElement('span')
        const t2 = document.createElement('span')
        const btn = MaterialButton('Let\'s Go!')

        t1.innerText = 'Team 1'
        t2.innerText = 'Team 2'
        setStyleToElement(form, { padding: '10px', display: 'flex', flexFlow: 'column', gap: '10px' })
        setStyleToElement(btn, { justifyContent: 'center', textTransform: 'uppercase' })

        fragment.append(t1,p1,p2, t2,p3,p4, btn)
        form.append( fragment )
        return form
    }

    mountEl.innerHTML = ''
    mountEl.append( Navbar('🕹️ New Game'), BackBtn(), view())
}