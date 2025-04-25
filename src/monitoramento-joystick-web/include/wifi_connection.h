#ifndef WIFI_CONNECTION_H
#define WIFI_CONNECTION_H

#include "pico/stdlib.h"
#include <stdio.h>
#include <stdlib.h>
#include "pico/cyw43_arch.h"

#define WIFI_SSID "nome-da-rede"           // Nome da rede
#define WIFI_PASSWORD "senha-da-rede"     // Senha da rede, caso não tenha coloque NULL

void setup_wifi();

#endif