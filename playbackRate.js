let dTimeout = null

function keydownHandler(e) {
    if (e.key !== '>' && e.key !== '<') {
        return
    }

    let video = document.querySelector('video')
    if (e.key === '>') video.playbackRate += 0.5
    if (e.key === '<' && video.playbackRate > 0) video.playbackRate -= 0.5

    let d = document.getElementById('playbackRate')
    d.innerHTML = video.playbackRate + 'x'
    d.classList.add('active')
    clearTimeout(dTimeout)
    dTimeout = setTimeout(() => d.classList.remove('active'), 500)
}

function init() {
    let video = document.querySelector('video')
    if (!video) {
        return
    }
    console.log('loaded playbackRate.js...')

    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = `
        #playbackRate {
            height: 50px;
            width: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
            border-radius: 5px;
            background-color: rgba(0,0,0,0.65);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0;
            transition: all, 0.5s ease;
            font-family: Arial, sans-serif;
            font-size: 15px;
        }
        #playbackRate.active {
            opacity: 1 !important;
            transition: all 0.05s ease !important
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)

    let d = document.createElement('div')
    d.id = 'playbackRate'    
    video.parentNode.appendChild(d)
    
    document.addEventListener('keydown', keydownHandler)
}

const observer = new MutationObserver(function() {
    let videos = document.getElementsByTagName('video')
    if (videos.length > 0) {
        this.disconnect()
        init()
    }
})
if (!/.*(\/|\.)youtube\..*/.test(window.location.toString())) {
    observer.observe(document, { childList: true, subtree: true })
}
