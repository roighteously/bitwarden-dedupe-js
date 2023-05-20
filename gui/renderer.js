const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  window.bd_api.setFile(window.bd_api.openFileDialog());
})