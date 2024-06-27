export default function MaterialButton (text?: string, onclick?: CallableFunction) {
    const button = document.createElement('button')
    button.className = 'material-button'
    button.onclick = function (evt) {
        const posx = evt.pageX - button.getBoundingClientRect().left
        const posy = evt.pageY - button.getBoundingClientRect().top
        const [x,y] = [posx, posy]
        const ripple = document.createElement('div')
        
        ripple.className = 'ripple'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'

        button.append(ripple)

        setTimeout(() => ripple.remove(), 500)

        if ( onclick )
            setTimeout(onclick, 250);
    }
    if ( text ) button.innerText = text
    return button
}