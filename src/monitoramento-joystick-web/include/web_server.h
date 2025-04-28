#ifndef WEB_SERVER_H
#define WEB_SERVER_H

#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"
#include <stdio.h>
#include <stdlib.h>
#include "lwip/netif.h"
#include "lwip/tcp.h"
#include "lwip/pbuf.h"
#include "joystick_monitor.h"

#define SERVER_IP "0.0.0.0"
#define SERVEE_PORT 5000
#define SERVER_PATH "/dados"

err_t sent_callback(void *arg, struct tcp_pcb *tpcb, u16_t len);
void send_data_to_server(const char *path, char *request_body, const char *type_method);
void create_request(Vector2D vector2d);

#endif