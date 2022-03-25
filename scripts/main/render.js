function openWindow() {
    window.open('../windows/list.html', '_blank', frame = false, nodeIntegration = true);
}

document.getElementById('btn-add').addEventListener('click', () => {
    openWindow()
})