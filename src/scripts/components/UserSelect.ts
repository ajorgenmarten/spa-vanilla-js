import { UserSelectProps } from "../../types/components"
import { User } from "../../types/models"
import Store from "../core/Store.js"

export default function UserSelect (props?: UserSelectProps) {
    const userselect = document.createElement('div')
    const input = document.createElement('input')
    const img = document.createElement('img')
    const results = document.createElement('div')
    const [onkeyup] = hook(input, img, results, props?.onSelect)

    //set classes
    input.className = 'material-input'
    userselect.className = 'user-select'
    results.className = 'results'

    img.src = '/assets/user.jpg'
    input.onkeyup = onkeyup
    input.placeholder = props?.placeholder ?? 'type a user name...'
    input.required = props?.required ?? false

    userselect.append(input, img, results)

    return userselect
}

const hook = (input: HTMLInputElement, image: HTMLImageElement, results: HTMLDivElement, onSelect?: OnSelectCallback) => {
    const [users] = Store.use<User[]>('users')

    const find = ( text: string ) => 
        text == '' ? [] : 
        (users() as User[])
        .filter(u => new RegExp(text, 'gi').test(u.name))

    function selectUser (user: User) {
        const [avatar] = Store.use(`avatar:${user.id}`)
        input.value = user.name
        image.src = avatar() == null ? '/assets/user.jpg' : avatar() as string
        input.focus()
        results.style.display = 'none'
    }

    function listener (evt: MouseEvent) {
        if ( evt.target == results ) 
            results.style.display = 'flex'
        else {
            results.style.display = 'none'
            document.removeEventListener('click', listener)
        }
    }

    function resultItem (user: User) {
        const [avatar] = Store.use<string>(`avatar:${user.id}`)
        const div = document.createElement('div')
        const img = document.createElement('img')
        const span = document.createElement('span')

        img.src = avatar() == null ? '/assets/user.jpg' : avatar() as string
        span.innerText = user.name
        div.onclick = () => {
            selectUser(user)
            onSelect && onSelect(user)
            document.removeEventListener('click', listener)
        }

        div.append(img, span)

        return div
    }

    function onkeyup (evt: KeyboardEvent) {
        const { value } = evt.target as HTMLInputElement
        const userMatches = find( value )
        
        document.removeEventListener('click', listener)
        document.addEventListener('click', listener)
        
        if ( userMatches.length ) {
            results.innerHTML = ''
            results.append( ...userMatches.map(resultItem) )
            results.style.display = 'flex'
        } else results.style.display = 'none'
    }


    return [onkeyup]
}

type OnSelectCallback = (user: User) => void