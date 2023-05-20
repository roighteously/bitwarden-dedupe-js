const setButton = document.getElementById('btn')
const startBtn = document.getElementById('btn2')

setButton.addEventListener('click', () => {
    let sf = window.bd_api.openFileDialog();
    document.getElementById('p').innerText = "File picked: " + sf;
    window.bd_api.setFile(sf);
})

startBtn.addEventListener('click', () => {
    window.bd_api.start()
})