let indicatorTimeout = null
let allVideos = []

function changePlaybackRate(e, video) {
    if (e.key === '>') video.playbackRate += 0.5
    if (e.key === '<' && video.playbackRate > 0) video.playbackRate -= 0.5

    let indicator = video.parentNode.querySelector('.playbackRate')
    indicator.textContent = `${video.playbackRate.toString()}x`
    indicator.classList.add('active')
    clearTimeout(indicatorTimeout)
    indicatorTimeout = setTimeout(() => indicator.classList.remove('active'), 500)
}

function keydownHandler(e) {
    if (e.key !== '>' && e.key !== '<') {
        return
    }

    let videos = document.querySelectorAll('video')
    if (videos.length > 1 && document.activeElement.tagName === 'VIDEO') {
        changePlaybackRate(e, document.activeElement)
    } else if (videos.length === 1) {
        changePlaybackRate(e, videos[0])
    }
}

function init() {
    let videos = document.querySelectorAll('video:not(.playbackRateInit)')
    if (!videos.length) {
        return
    }
    console.log('loaded playbackRate.js...')

    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = `
        .playbackRate {
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
        .playbackRate.active {
            opacity: 1 !important;
            transition: all 0.05s ease !important
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)

    let indicator = document.createElement('div')
    indicator.classList.add('playbackRate')
    videos.forEach(v => {
        v.parentNode.appendChild(indicator.cloneNode())
        v.classList.add('playbackRateInit')
    })

    document.addEventListener('keydown', keydownHandler)
}

if (!/.*(\/|\.)youtube\..*/.test(window.location.toString())) {
    init()
    new MutationObserver(() => {
        if (document.getElementsByTagName('video').length)
            init()
    }).observe(document, { childList: true, subtree: true })
}
