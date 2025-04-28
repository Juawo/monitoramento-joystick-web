#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include "joystick_monitor.h"
#include "web_server.h"
#include "wifi_connection.h"

int main()
{
    stdio_init_all();
    setup_joystick();
    setup_wifi();
    Vector2D joystick_state;

    while (true) {
        joystick_state = read_joystick();
        create_request(joystick_state);
        sleep_ms(1000);
    }
}
