#ifndef JOYSTICK_MONITOR_H
#define JOYSTICK_MONITOR_H

#include "pico/stdlib.h"
#include "hardware/adc.h"
#include <stdio.h>
#include <stdlib.h>

#define ADC_MAX 4095 // Valor máximo do ADC do usado no joystick
#define ADC_MIN 0 // Valor minimo do ADC do usado no joystick
#define AREA_MAX 100    // Aréa imaginária para o joystick se "movimentar"
#define AREA_MIN -100    // Aréa imaginária para o joystick se "movimentar"

typedef struct Vector2D
{
    int x;
    int y;
} Vector2D;

void setup_joystick();
Vector2D read_joystick();
int normalize_value(int position, int area_max, int area_min, int adc_max, int adc_min);

#endif