using System.Text.Json.Serialization;

namespace MonitoramentoJoystickWebApi;

// Classe que representa os dados do joystick recebidos do Pico
public class PicoData
{
    // Propriedade que representa o valor do eixo X
    [JsonPropertyName("x")]
    public int X { get; set; }

    // Propriedade que representa o valor do eixo Y
    [JsonPropertyName("y")]
    public int Y { get; set; }

    // Construtor padrão da classe PicoData
    public PicoData(){  }

    // Construtor que inicializa os valores de X e Y
    public PicoData(int x, int y)
    {
        X = x;
        Y = y;
    }
}
