#ifndef JOYSTICK_MONITOR_H
#define JOYSTICK_MONITOR_H

#include "pico/stdlib.h"
#include <stdio.h>
#include <stdlib.h>

typedef struct Vector2D
{
    int x;
    int y;
} Vector2D;

void setup_joystick();
Vector2D read_joystick();

#endif