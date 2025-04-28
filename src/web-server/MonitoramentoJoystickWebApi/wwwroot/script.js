async function atualizarJoystick() {
    try {
        const response = await fetch('/dados');
        const json = await response.json();

        console.log(json);

        document.getElementById('posX').textContent = json.X.toFixed(2);
        document.getElementById('posY').textContent = json.Y.toFixed(2);
    } catch (e) {
        console.error("Erro ao buscar dados: ", e);
    }
}

setInterval(atualizarJoystick, 500); // Atualiza a cada 0.5s
atualizarJoystick();
