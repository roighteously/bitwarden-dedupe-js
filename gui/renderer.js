const setButton = document.getElementById('btn')
const startBtn = document.getElementById('btn2')
const hyperlink = document.getElementById('hyperlink')
const hyperlinkbtn = document.getElementById('db')
const statmsg = document.getElementById('p')

let sf = '';

setButton.addEventListener('click', () => {
    sf = window.bd_api.openFileDialog();
    statmsg.innerText = "File picked: " + sf;
    window.bd_api.setFile(sf);
})

startBtn.addEventListener('click', () => {
    statmsg.innerText = 'Starting'
    statmsg.innerText = window.bd_api.start()
    startBtn.style.display = 'none'
    setButton.style.display = 'none'
    document.getElementById('p2').style.display = 'none'

    localStorage.setItem('viewer', sf + '.new.json')
    hyperlink.href = 'viewer.html'
    hyperlink.style.display = 'block'
})