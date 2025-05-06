 # Projeto de Monitoramento de Joystick via Web

Este projeto monitora a posição de um joystick analógico utilizando a Raspberry Pi Pico W e envia os dados via HTTP para um servidor web.

🔗 Servidor remoto: [monitoramento-joystick-web](https://monitoramento-joystick-web-production.up.railway.app/)

## 📁 Estrutura

- **Firmware (C)**: Lê os eixos X/Y do joystick (pinos ADC) e envia os dados ao servidor.
- **Servidor Web (ASP.NET Core)**: API REST e interface com Rosa dos Ventos em tempo real.

## ⚙️ Requisitos

### Pico W
- Raspberry Pi Pico W
- Joystick analógico (2 eixos)
- Pico SDK, GCC, CMake, Ninja

### Web Server
- .NET SDK 9.0+
- Navegador moderno

## 🚀 Execução

### 🔧 Execução Local
1. **Servidor:**
   ```bash
   cd web-server/MonitoramentoJoystickWebApi
   dotnet restore
   dotnet run
    ```
2. **Pico W**: configure wifi_connection.h com sua rede:
    ``` c
    #define WIFI_SSID "SEU_SSID"
    #define WIFI_PASSWORD "SUA_SENHA"
    ```
    Configure o IP local no firmware:

    ``` c
    #define SERVER_IP "192.168.X.X" // IP do seu PC local
    ```
3. Compile e envie o firmware para a Pico.

## 🌐 Execução Remota com Proxy
1. Servidor Proxy: execute o projeto proxy-server:

``` bash
cd src/proxy-server
dotnet restore
dotnet run
```
2. Pico W: configure SERVER_IP com o IP do seu PC que está rodando o proxy.

3. O proxy redirecionará os dados para o servidor remoto (Railway).

## 🔄 Funcionamento
1. Pico W lê os eixos do joystick.

2. Envia via HTTP POST para o servidor.

3. Interface web exibe a direção e valores em tempo real.

## 🗂️ Principais Arquivos
### Firmware
- monitoramento-joystick-web.c

- joystick_monitor.[h/c]

- wifi_connection.[h/c]

- web_server.[h/c]

### Web Server
- Program.cs

- PicoData.cs

- wwwroot/index.html, script.js, styles.css

