import { User } from "../../types/models.js"
import BackBtn from "../components/BackBtn.js"
import MaterialButton from "../components/MaterialButton.js"
import Navbar from "../components/Navbar.js"
import Router from "../core/Router.js"
import State from "../core/State.js"
import Store from "../core/Store.js"
import { setStyleToElement } from "../libs/style.js"

export default function NewPlayer () {
    const mountEl = document.getElementById('app') as HTMLElement

    const view = () => {
        const fragment = document.createDocumentFragment()
        const fileinput = document.createElement('input')

        const container = document.createElement('form')
        const selectimg = MaterialButton('🖼️ Select image...', () => fileinput.click())
        const inputname = document.createElement('input')
        const btnsubmit = MaterialButton('Create')
        
        const preview = document.createElement('div')
        const img = document.createElement('img')
        const name = document.createElement('span')

        const [onkeyup, fileonchange, formsubmit] = hook(name, fileinput, img, selectimg)

        inputname.className = 'material-input'
        inputname.required = true
        inputname.pattern = '[a-zA-Z0-9\\s]{3,50}'
        
        fileinput.type = 'file'
        fileinput.multiple = false
        fileinput.accept = 'image/jpeg,image/png,image/gif'
        
        selectimg.type = "button"
        
        img.src = '../../assets/user.jpg'
        
        inputname.onkeyup = onkeyup
        fileinput.onchange = fileonchange
        container.onsubmit = formsubmit

        setStyleToElement(container, styleForm)
        setStyleToElement(preview, stylePreview)
        setStyleToElement(img, styleImg)
        setStyleToElement(name, styleName)
        setStyleToElement(btnsubmit, stylebtnsubmit)

        preview.append(img, name)
        fragment.append(selectimg, inputname, btnsubmit, preview)
        container.append(fragment)

        return container        
    }

    mountEl.innerHTML = ''
    mountEl.append( Navbar('👤Create New Player'), BackBtn(), view() )
}

const styleForm: Partial<CSSStyleDeclaration> = {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: '10px',
    padding: '10px'
}

const styleImg: Partial<CSSStyleDeclaration> = {
    width: '40px',
    height: '40px',
    border: 'none',
    userSelect: 'none',
    objectFit: 'cover'
}

const styleName: Partial<CSSStyleDeclaration> = {
    fontSize: '26px',
    fontWeight: '500',
    color: 'var(--color-secondary)'
}

const stylePreview: Partial<CSSStyleDeclaration> = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
}

const stylebtnsubmit: Partial<CSSStyleDeclaration> = {
    textTransform: 'uppercase',
    justifyContent: 'center'
}

const hook = (namepreviewEl: HTMLSpanElement, fileinputEl: HTMLInputElement, imgpreviewEl: HTMLImageElement, selectimgBtn: HTMLButtonElement): HookReturn => {
    const [users, setUsers] = Store.use<User[]>('users')
    const [img, setImg, onChangeImg] = State.create('')
    const [name, setName, onChangeName] = State.create('')

    const onkeyup = function (evt: KeyboardEvent) {
        setName( (evt.target as HTMLInputElement).value )
    }

    const fileonchange = function () {
        const fileimg = fileinputEl.files?.length && fileinputEl.files[0]
        const fr = new FileReader()
        if (!fileimg) return
        fr.readAsDataURL(fileimg)
        fr.onload = function (loadevt) {
            selectimgBtn.innerText = '🖼️ '+fileimg.name
            setImg(loadevt.target?.result?.toString() ?? '')
        }
    }

    const formsubmit = function (evt: SubmitEvent) {
        evt.preventDefault()
        const regexp = /\/assets\/user.jpg$/
        const storeusers = users() as User[]
        const id = crypto.randomUUID()
        const user: User = { id, name: name() as string }
        const avatarid = `avatar:${id}`
        storeusers.push(user)
        setUsers(storeusers)
        if ( regexp.test(imgpreviewEl.src) == false ) {
            Store.create(avatarid, img())
        }
        Router.navigate('/')
    }

    onChangeImg(function(value) {
        imgpreviewEl.src = value
    })

    onChangeName(function(value) {
        namepreviewEl.innerText = value
    })

    return [onkeyup, fileonchange, formsubmit]
}


type HookKeyUp = (evt: KeyboardEvent) => void
type HookOnChange = () => void
type HookOnSubmit = (evt: SubmitEvent) => void
type HookReturn = [HookKeyUp, HookOnChange, HookOnSubmit]