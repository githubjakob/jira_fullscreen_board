const link = document.createElement('link')

const ButtonFS = function ButtonFS() {
    this.element = document.createElement('BUTTON')
    this.element.style.float = 'left'
    this.element.style.margin = '4px 8px 0px 0px'
    this.element.innerHTML = '<span>Fullscreen</span>'
    this.element.addEventListener('click', () => {
        if (this.clicked) {
            const main = document.querySelector("div[data-test-id='software-board.board-area']")
            main.parentNode.previousSibling.style.display = 'block'

            const topNav = document.querySelector('#ak-jira-navigation')
            topNav.style.display = 'block'

            const sideNav = document.querySelector('#ak-side-navigation')
            sideNav.style.display = 'block'
        } else {
            const board = document.querySelector("div[data-test-id='software-board.board-area']")
            board.parentNode.previousSibling.style.display = 'none'

            const topNav = document.querySelector('#ak-jira-navigation')
            topNav.style.display = 'none'

            const sideNav = document.querySelector('#ak-side-navigation')
            sideNav.style.display = 'none'

            const main = document.querySelector('#ak-main-content')
            main.style.position = 'fixed'
            main.style.top = '0px'
        }
        this.click()
    })

    this.getElement = function getElement() {
        return this.element
    }

    this.clicked = false

    this.click = function click() {
        if (this.clicked) {
            this.clicked = false
            this.element.innerHTML = '<span>Fullscreen</span>'
        } else {
            this.clicked = true
            this.element.innerHTML = '<span>Close</span>'
        }
    }
}

const button = new ButtonFS()

function init() {
    const main = document.querySelector('header')

    if (main === null || main === undefined) {
        // try again in 500ms
        const ms = 1000
        setTimeout(init, ms)
    } else {
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.media = 'screen,print'
        document.getElementsByTagName('head')[0].appendChild(link)

        // NOTE: Observe for modifications of content when navigating pages
        const observer = new MutationObserver(() => {
            if (document.querySelector('#button_fs') === null || document.querySelector('#button_fs') === undefined) {
                const floatingButtons = document.querySelector('#jira-frontend > div:last-child')

                button.getElement().style.marginLeft = '20px'
                button.getElement().style.pointerEvents = 'auto'

                floatingButtons.appendChild(button.getElement())
            }
        })
        observer.observe(main, { subtree: true, childList: true })
    }
}

init()
