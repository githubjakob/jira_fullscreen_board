const version = '0.20.0708'
const link = document.createElement('link')

let hBoard = ''

const ButtonFS = function ButtonFS() {
    this.element = document.createElement('BUTTON')
    this.element.setAttribute('id', 'button_fs')
    this.element.setAttribute('class', 'aui-button aui-button-primary')
    this.element.style.float = 'left'
    this.element.style.margin = '4px 8px 0px 0px'
    this.element.innerHTML = '<span class="material-icons">settings_overscan</span>'
    this.element.addEventListener('click', () => {
        try {
            console.log("####clicked")
            if (this.clicked) {
                
                console.log("##clicked unset")
                const main = document.querySelector("div[data-test-id='software-board.board-area']")
                main.parentNode.previousSibling.style.display = "block";
            
                const topNav = document.querySelector("#ak-jira-navigation")
                topNav.style.display = "block"

                const sideNav = document.querySelector("#ak-side-navigation")
                sideNav.style.display = "block"
                
                
            } else {
                console.log("##clicked set")
                const board = document.querySelector("div[data-test-id='software-board.board-area']")
                board.parentNode.previousSibling.style.display = "none";
            
                const topNav = document.querySelector("#ak-jira-navigation")
                topNav.style.display = "none"

                const sideNav = document.querySelector("#ak-side-navigation")
                sideNav.style.display = "none"
    
    
                const main = document.querySelector('#ak-main-content')
                main.style.position = 'fixed'
                main.style.top = '0px'
    
            }
        } catch (error) {
            console.log("##error", error)
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
            this.element.innerHTML = '<span class="material-icons">settings_overscan</span>'
        } else {
            this.clicked = true
            this.element.innerHTML = '<span class="material-icons">cancel_presentation</span>'
        }
    }
}

const button = new ButtonFS()

function init() {
  
    const main = document.querySelector("header")

    if (main === null || main === undefined) {
        // try again in 500ms
        const ms = 1000
        setTimeout(init, ms)
    } else {
        link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons'
        link.type = 'text/css'
        link.rel = 'stylesheet'
        link.media = 'screen,print'
        document.getElementsByTagName('head')[0].appendChild(link)

        // eslint-disable-next-line no-console
        console.log('FSAB4JIRA : Full-Screen agile board mode for Jira')
        // eslint-disable-next-line no-console
        console.log(`FSAB4JIRA : Loading version ${version}`)

        // NOTE: Observe for modifications of content when navigating pages
        const observer = new MutationObserver(() => {
            if (document.querySelector('#button_fs') === null || document.querySelector('#button_fs') === undefined) {
                //main.insertBefore(button.getElement(), main.childNodes[0])


                const floatingButtons = document.querySelector('#jira-frontend > div:last-child')

                button.getElement().style.marginLeft = "20px"
                button.getElement().style.pointerEvents = "auto"
                                
                floatingButtons.appendChild(button.getElement());
            }
        })
        observer.observe(main, { subtree: true, childList: true })

        // initiliaze
        hBoard = document.getElementById('ghx-work').style.height
    }
}

init()
