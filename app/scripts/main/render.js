const button = document.getElementById('btn-help');

button.addEventListener('click', () => {
    alert(process.env.HOME + __dirname + 'app/scripts/main/data.csv');
});