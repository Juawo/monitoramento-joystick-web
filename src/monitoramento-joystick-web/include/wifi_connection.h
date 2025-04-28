#ifndef WIFI_CONNECTION_H
#define WIFI_CONNECTION_H

#include "pico/stdlib.h"
#include <stdio.h>
#include <stdlib.h>
#include "pico/cyw43_arch.h"

#define WIFI_SSID "MAMBEE"           // Nome da rede
#define WIFI_PASSWORD "1fp1mamb33"     // Senha da rede, caso não tenha coloque NULL

void setup_wifi();

#endif