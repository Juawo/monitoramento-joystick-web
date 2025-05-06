async function atualizarJoystick() {
    try {
      const resp = await fetch('/dados');
      const json = await resp.json();
      const x = json.x;
      const y = json.y;
  
      // atualiza valores numéricos
      document.getElementById('posX').textContent = x.toFixed(0);
      document.getElementById('posY').textContent = y.toFixed(0);
  
      // calcula direção
      const dir = calcularDirecao(x, y);
      document.getElementById('direcao').textContent = dirText(dir);
  
      // destaca a rosa
      atualizarDestaque(dir);
  
    } catch (e) {
      console.error("Erro ao buscar /dados:", e);
    }
  }
  
  // retorne uma string curta para classe: 'norte', 'nordeste', … ou 'centro'
  function calcularDirecao(x, y) {
    const dead = 10; // margem de “centro”
    if (Math.abs(x) <= dead && Math.abs(y) <= dead) return 'centro';
    if (y > dead) {
      if (x > dead)   return 'nordeste';
      if (x < -dead)  return 'noroeste';
      return 'norte';
    }
    if (y < -dead) {
      if (x > dead)   return 'sudeste';
      if (x < -dead)  return 'sudoeste';
      return 'sul';
    }
    if (x > dead)     return 'leste';
    if (x < -dead)    return 'oeste';
    return 'centro';
  }
  
  // texto “bonitão” para o usuário
  function dirText(dir) {
    switch(dir) {
      case 'norte':     return 'Norte';
      case 'nordeste':  return 'Nordeste';
      case 'leste':     return 'Leste';
      case 'sudeste':   return 'Sudeste';
      case 'sul':       return 'Sul';
      case 'sudoeste':  return 'Sudoeste';
      case 'oeste':     return 'Oeste';
      case 'noroeste':  return 'Noroeste';
      default:          return 'Centro';
    }
  }
  
  // adiciona/remover a classe .highlight em cada segment
  function atualizarDestaque(dir) {
    document.querySelectorAll('.rose .segment').forEach(el => {
      el.classList.toggle('highlight', el.dataset.dir === dir);
    });
  }
  
  setInterval(atualizarJoystick, 100);
  atualizarJoystick();
  