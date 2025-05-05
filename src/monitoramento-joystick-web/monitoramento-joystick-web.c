#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include "joystick_monitor.h"
#include "web_server.h"
#include "wifi_connection.h"

// Função principal do programa
int main()
{
    // Inicializa todas as funções padrão de entrada e saída
    stdio_init_all();
    // Configura o joystick
    setup_joystick();
    // Configura a conexão Wi-Fi
    setup_wifi();
    // Declara uma variável para armazenar o estado do joystick
    Vector2D joystick_state;

    // Loop principal do programa
    while (true) {
        // Lê o estado atual do joystick
        joystick_state = read_joystick();
        // Cria uma requisição com base no estado do joystick
        create_request(joystick_state);
        // Aguarda 1000 milissegundos (1 segundo)
        sleep_ms(1000);
    }
}
