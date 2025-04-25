#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include "joystick_monitor.h"



int main()
{
    stdio_init_all();
    setup_joystick();
    Vector2D joystick_state;

    // if (cyw43_arch_init())
    // {
    //     printf("Wi-Fi init failed\n");
    //     return -1;
    // }

    // Example to turn on the Pico W LED
    // cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);

    while (true) {
        joystick_state = read_joystick();
        printf("X : %d | Y : %d\n", joystick_state.x, joystick_state.y);
        sleep_ms(1000);
    }
}
