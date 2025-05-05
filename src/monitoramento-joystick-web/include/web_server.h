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

#define SERVER_IP "monitoramento-joystick-web-production.up.railway.app" // Defina a URL do servidor (caso esteja na nuvem) ou o IP (caso esteja localmente)
#define SERVER_PORT 8080
#define SERVER_PATH "/dados"

err_t sent_callback(void *arg, struct tcp_pcb *tpcb, u16_t len);
void send_data_to_server(const char *path, char *request_body, const char *type_method);
void create_request(Vector2D vector2d);

#endif