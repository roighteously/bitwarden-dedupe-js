const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    let sf = window.bd_api.openFileDialog();
    document.getElementById('p').innerText = "File picked: " + sf;
    window.bd_api.setFile(sf);
})