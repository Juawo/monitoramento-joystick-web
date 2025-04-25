#include "joystick_monitor.h"

void setup_joystick()
{
    adc_init();
    adc_gpio_init(26);
    adc_gpio_init(27);
}

Vector2D read_joystick()
{
    Vector2D vector2d;

    adc_select_input(1);
    vector2d.x = normalize_value(adc_read(), AREA_MAX, AREA_MIN, ADC_MAX, ADC_MIN);

    adc_select_input(0);
    vector2d.y = normalize_value(adc_read(), AREA_MAX, AREA_MIN, ADC_MAX, ADC_MIN);

    return vector2d;
}

int normalize_value(int position, int area_max, int area_min, int adc_max, int adc_min)
{
    return (int)(((float)(position - adc_min) * (area_max - area_min) / (adc_max - adc_min)) + area_min);
}