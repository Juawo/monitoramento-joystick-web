// async function atualizarJoystick() {
//     try {
//       const resp = await fetch('/dados');
//       const json = await resp.json();
//       const x = json.x;
//       const y = json.y;
  
//       // atualiza valores numéricos
//       document.getElementById('posX').textContent = x.toFixed(0);
//       document.getElementById('posY').textContent = y.toFixed(0);
  
//       // calcula direção
//       const dir = calcularDirecao(x, y);
//       document.getElementById('direcao').textContent = dirText(dir);
  
//       // destaca a rosa
//       atualizarDestaque(dir);
  
//     } catch (e) {
//       console.error("Erro ao buscar /dados:", e);
//     }
//   }
  
//   // retorne uma string curta para classe: 'norte', 'nordeste', … ou 'centro'
//   function calcularDirecao(x, y) {
//     const dead = 10; // margem de “centro”
//     if (Math.abs(x) <= dead && Math.abs(y) <= dead) return 'centro';
//     if (y > dead) {
//       if (x > dead)   return 'nordeste';
//       if (x < -dead)  return 'noroeste';
//       return 'norte';
//     }
//     if (y < -dead) {
//       if (x > dead)   return 'sudeste';
//       if (x < -dead)  return 'sudoeste';
//       return 'sul';
//     }
//     if (x > dead)     return 'leste';
//     if (x < -dead)    return 'oeste';
//     return 'centro';
//   }
  
//   // texto “bonitão” para o usuário
//   function dirText(dir) {
//     switch(dir) {
//       case 'norte':     return 'Norte';
//       case 'nordeste':  return 'Nordeste';
//       case 'leste':     return 'Leste';
//       case 'sudeste':   return 'Sudeste';
//       case 'sul':       return 'Sul';
//       case 'sudoeste':  return 'Sudoeste';
//       case 'oeste':     return 'Oeste';
//       case 'noroeste':  return 'Noroeste';
//       default:          return 'Centro';
//     }
//   }
  
//   // adiciona/remover a classe .highlight em cada segment
//   function atualizarDestaque(dir) {
//     document.querySelectorAll('.rose .segment').forEach(el => {
//       el.classList.toggle('highlight', el.dataset.dir === dir);
//     });
//   }
  
//   setInterval(atualizarJoystick, 500);
//   atualizarJoystick();
  
class JoystickMonitor {
  constructor() {
      this.position = { x: 0, y: 0 };
      this.direction = 'Centro';
      this.DIRECTION_THRESHOLD = 20;
      
      // Elements
      this.posX = document.getElementById('position-x');
      this.posY = document.getElementById('position-y');
      this.directionElement = document.getElementById('direction');
      this.canvas = document.getElementById('compass');
      this.ctx = this.canvas.getContext('2d');
      
      // Start fetching data
      this.startFetching();
  }
  
  calculateDirection(x, y) {
      if (Math.abs(x) < this.DIRECTION_THRESHOLD && Math.abs(y) < this.DIRECTION_THRESHOLD) {
          return 'Centro';
      }
      
      const isNorth = y <= -this.DIRECTION_THRESHOLD;
      const isSouth = y >= this.DIRECTION_THRESHOLD;
      const isEast = x >= this.DIRECTION_THRESHOLD;
      const isWest = x <= -this.DIRECTION_THRESHOLD;
      
      if (isNorth && isEast) return 'Nordeste';
      if (isNorth && isWest) return 'Noroeste';
      if (isSouth && isEast) return 'Sudeste';
      if (isSouth && isWest) return 'Sudoeste';
      if (isNorth) return 'Norte';
      if (isSouth) return 'Sul';
      if (isEast) return 'Leste';
      if (isWest) return 'Oeste';
      
      return 'Centro';
  }
  
  async fetchData() {
      try {
          const response = await fetch('https://monitoramento-joystick-web-production.up.railway.app/dados');
          const data = await response.json();
          this.updatePosition(data.x, data.y);
      } catch (error) {
          console.error('Erro ao buscar dados do joystick:', error);
      }
  }

  startFetching() {
      // Initial fetch
      this.fetchData();
      
      // Set up interval for continuous fetching
      this.interval = setInterval(() => this.fetchData(), 500);
  }
  
  updatePosition(x, y) {
      this.position = { x, y };
      this.direction = this.calculateDirection(x, y);
      
      // Update display
      this.posX.textContent = Math.round(x);
      this.posY.textContent = Math.round(y);
      this.directionElement.textContent = this.direction;
      
      // Trigger animations
      this.posX.style.animation = 'none';
      this.posY.style.animation = 'none';
      this.directionElement.style.animation = 'none';
      
      requestAnimationFrame(() => {
          this.posX.style.animation = 'pulse 0.5s ease-out';
          this.posY.style.animation = 'pulse 0.5s ease-out';
          this.directionElement.style.animation = 'highlight 0.5s ease-out';
      });
      
      this.drawCompass();
  }
  
  drawCompass() {
      const width = this.canvas.width;
      const height = this.canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;
      
      // Clear canvas
      this.ctx.clearRect(0, 0, width, height);
      
      const directions = [
          { label: 'N', angle: 270, main: true },
          { label: 'NE', angle: 315, main: false },
          { label: 'L', angle: 0, main: true },
          { label: 'SE', angle: 45, main: false },
          { label: 'S', angle: 90, main: true },
          { label: 'SO', angle: 135, main: false },
          { label: 'O', angle: 180, main: true },
          { label: 'NO', angle: 225, main: false }
      ];
      
      directions.forEach(({ label, angle, main }) => {
          const radians = (angle * Math.PI) / 180;
          const isHighlighted = this.direction.startsWith(label) ||
              (label === 'N' && this.direction === 'Norte') ||
              (label === 'S' && this.direction === 'Sul') ||
              (label === 'L' && this.direction === 'Leste') ||
              (label === 'O' && this.direction === 'Oeste');
          
          // Draw line
          this.ctx.beginPath();
          this.ctx.moveTo(centerX, centerY);
          this.ctx.lineTo(
              centerX + radius * Math.cos(radians),
              centerY + radius * Math.sin(radians)
          );
          
          this.ctx.strokeStyle = isHighlighted ? '#22C55E' : '#666666';
          this.ctx.lineWidth = isHighlighted ? 3 : 2;
          
          if (!main) {
              this.ctx.setLineDash([5, 5]);
          } else {
              this.ctx.setLineDash([]);
          }
          
          this.ctx.stroke();
          
          // Draw label
          const labelX = centerX + (radius + 30) * Math.cos(radians);
          const labelY = centerY + (radius + 30) * Math.sin(radians);
          
          this.ctx.font = isHighlighted ? 'bold 20px Arial' : '18px Arial';
          this.ctx.fillStyle = isHighlighted ? '#22C55E' : '#666666';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText(label, labelX, labelY);
      });
      
      // Draw center point
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#3056D3';
      this.ctx.fill();
      
      // Draw joystick position
      const scaleFactor = radius / 100;
      const indicatorX = centerX + this.position.x * scaleFactor;
      const indicatorY = centerY + this.position.y * scaleFactor;
      
      this.ctx.beginPath();
      this.ctx.arc(indicatorX, indicatorY, 8, 0, Math.PI * 2);
      this.ctx.fillStyle = '#22C55E';
      this.ctx.fill();
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
  }
  
  cleanup() {
      if (this.interval) {
          clearInterval(this.interval);
      }
  }
}

// Initialize the monitor
const monitor = new JoystickMonitor();