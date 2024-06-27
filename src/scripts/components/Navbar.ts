import Router from "../core/Router.js"

export default function Navbar (title: string = '📝La Data') {
    document.title = title
    const nav = document.createElement('nav')
    const span = document.createElement('span')
    nav.className = 'navbar'
    span.innerText = title
    span.onclick = function () {
        Router.navigate('/')
    }
    nav.append(span)
    return nav
}