using System.Text.Json.Serialization;

namespace MonitoramentoJoystickWebApi;
public class PicoData
{
    [JsonPropertyName("x")]
    public int X { get; set; }

    [JsonPropertyName("y")]
    public int Y { get; set; }

    public PicoData(){  }

    public PicoData(int x, int y)
    {
        X = x;
        Y = y;
    }
}
