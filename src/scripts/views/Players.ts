import { User } from "../../types/models.js"
import BackBtn from "../components/BackBtn.js"
import MaterialButton from "../components/MaterialButton.js"
import Navbar from "../components/Navbar.js"
import Store from "../core/Store.js"
import { setStyleToElement } from "../libs/style.js"

export default function Players () {
    const mountEl = document.getElementById('app') as HTMLElement
    const container = document.createElement('div')
    setStyleToElement(container, styleContainer)

    const render = () => {
        const [users] = Store.use<User[]>('users')
        const fragment = document.createDocumentFragment()
        fragment.append( ...(users() as User[]).map(usercard) )
        container.innerHTML = ''
        container.append( fragment )
    }

    const usercard = (user: User) => {
        const [avatar] = Store.use<string>(`avatar:${user.id}`)
        const [deleteUser] = hook(user, render)
        const div = document.createElement('div')
        const img = document.createElement('img')
        const rightDiv = document.createElement('div')
        const optionsDiv = document.createElement('div')
        const span = document.createElement('span')
        
        const metrics = MaterialButton('📊 metrics')
        const remove = MaterialButton('🗑️ delete', deleteUser)

        setStyleToElement(metrics, styleOptionButton)
        setStyleToElement(remove, { ...styleOptionButton, ...styleRemove })
        
        div.className = 'user-card'
        span.innerText = user.name
        img.src =  avatar() ? avatar() as string : '../assets/user.jpg'
        
        optionsDiv.append( metrics, remove )
        rightDiv.append(span, optionsDiv)
        div.append( img, rightDiv )
        return div
    }

    render()
    
    mountEl.innerHTML = ''
    mountEl.append( Navbar('👥 Players'), BackBtn(), container )
}

const styleOptionButton: Partial<CSSStyleDeclaration> = {
    height: '30px',
}

const styleRemove: Partial<CSSStyleDeclaration> = {
    backgroundColor: 'var(--color-danger)',
}

const styleContainer: Partial<CSSStyleDeclaration> = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
}

const hook = (user: User, render: CallableFunction) => {
    const [users, setUsers] = Store.use<User[]>('users')
    const [_avatar, _setAvatar, dispose] = Store.use(`avatar:${user.id}`)

    function deleteUser () {
        setUsers((users() as User[]).filter(u => u.id !== user.id))
        dispose()
        render()
    }

    return [deleteUser]
}