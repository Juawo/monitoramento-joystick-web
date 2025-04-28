async function atualizarJoystick() {
    try {
        const response = await fetch('/dados');
        const json = await response.json();

        console.log(json);

        document.getElementById('posX').textContent = json.x;
        document.getElementById('posY').textContent = json.y;
    } catch (e) {
        console.error("Erro ao buscar dados: ", e);
    }
}

setInterval(atualizarJoystick, 500); // Atualiza a cada 0.5s
atualizarJoystick();
