# Projeto Monitoramento Joystick Web

Este projeto consiste em um sistema para monitorar a posição de um joystick utilizando uma placa Raspberry Pi Pico W. Os dados do joystick são enviados via Wi-Fi para um servidor web, que exibe as informações em uma interface gráfica.

## Funcionalidades

- Leitura da posição do joystick em dois eixos (X e Y).
- Envio dos dados via HTTP para um servidor web.
- Exibição dos dados em tempo real em uma interface web com uma "Rosa dos Ventos".

## Estrutura do Projeto

### Diretórios Principais

- **`monitoramento-joystick-web`**: Contém o código-fonte para a Pico W, responsável por capturar os dados do joystick e enviá-los ao servidor.
- **`web-server/MonitoramentoJoystickWebApi`**: Contém o código do servidor web, que recebe os dados da Pico W e exibe na interface gráfica.

### Arquivos Importantes

#### Código para a Pico W

- **`monitoramento-joystick-web.c`**: Arquivo principal que inicializa o joystick, conecta ao Wi-Fi e envia os dados ao servidor.
- **`joystick_monitor.c`**: Código responsável por capturar os valores do joystick e normalizá-los.
- **`wifi_connection.c`**: Configuração e conexão da Pico W à rede Wi-Fi.
- **`web_server.c`**: Implementa a lógica de envio de dados ao servidor via protocolo HTTP.

#### Código do Servidor Web

- **`Program.cs`**: Configura o servidor web utilizando ASP.NET Core. Define as rotas para receber e exibir os dados do joystick.
- **`wwwroot/index.html`**: Interface gráfica que exibe os dados do joystick em tempo real.
- **`wwwroot/script.js`**: Atualiza dinamicamente os dados na interface utilizando requisições HTTP.
- **`wwwroot/styles.css`**: Estilização da interface gráfica.

## Requisitos

### Hardware

- Raspberry Pi Pico W.
- Joystick analógico conectado aos pinos ADC da Pico W.

### Software

- **Para a Pico W**:
  - SDK do Raspberry Pi Pico configurado.
  - Compilador ARM GCC.
  - Ferramentas como `CMake` e `Ninja`.

- **Para o Servidor Web**:
  - .NET SDK 9.0 ou superior.
  - Navegador web para acessar a interface gráfica.

## Configuração e Execução

### Configuração da Pico W

1. Configure o arquivo `wifi_connection.h` com o SSID e a senha da sua rede Wi-Fi:
   ```c
   #define WIFI_SSID "SEU_SSID"
   #define WIFI_PASSWORD "SUA_SENHA"

2. Compile o código da Pico W:
    ```bash
    cd monitoramento-joystick-web
    mkdir build
    cd build
    cmake ..
    make
    ```
3. Envie o código compilado para a Pico W

### Configuração do Servidor Web
1. Navegue até o diretório do servidor:
    ```bash
    cd web-server/MonitoramentoJoystickWebApi
    ```
2. Restaure as dependências do projeto:
    ```bash
    dotnet restore
    ```
3. Inicie o servidor:
    ```bash
    dotnet run
    ```
4. Acesse a interface web no navegador:
    ```    
    http://<IP_DO_SERVIDOR>:5000
    ```
    O IP do servidor será exibido no terminal ao iniciar o servidor.

## Fluxo de Funcionamento
1. A Pico W lê os valores do joystick utilizando os pinos ADC.
2. Os valores são normalizados e enviados ao servidor via HTTP POST.
3. O servidor recebe os dados e os exibe na interface gráfica.
4. A interface gráfica atualiza os valores em tempo real e destaca a direção correspondente na "Rosa dos Ventos".

## Estrutura do Código
### Pico W
- **`setup_wifi`**: Configura e conecta a Pico W à rede Wi-Fi.
- **`read_joystick`**: Lê os valores do joystick e os normaliza.
- **`create_request`**: Cria e envia uma requisição HTTP com os dados do joystick.

### Servidor Web
- *Rotas:*    
    - **`GET /dados`**: Retorna os dados atuais do joystick.
    - **`POST /dados`**: Recebe os dados enviados pela Pico W.
- *Interface Web:*
    - Atualiza os valores de posição e direção do joystick em tempo real.

## Observações
- Certifique-se de que a Pico W e o servidor estão na mesma rede Wi-Fi.
- Caso enfrente problemas de conexão, verifique o IP e a porta configurados no código.