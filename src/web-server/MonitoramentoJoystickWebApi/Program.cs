using System.Net;
using MonitoramentoJoystickWebApi;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

PicoData? data = new(50, 20);

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/dados", () =>
{
    if (data != null)
    {
        return Results.Json(data);
    }
    return Results.Json(new { X = 0, Y = 0 });
});

app.MapPost("/dados", async (HttpContext context) =>
{
    var body = await context.Request.ReadFromJsonAsync<PicoData>();
    if (body != null)
    {
        data = body;
        Console.WriteLine($"Dados recebidos da Pico W -> X : {body.X} | Y : {body.Y}");
        return Results.Ok("Dados recebidos");
    }
    return Results.BadRequest("JSON inválido!");

});

var localIp = GetLocalIpAdress();
Console.WriteLine($"Servidor rodando em : http://{localIp}:5000");

app.Run();

static string GetLocalIpAdress()
{
    var host = Dns.GetHostEntry(Dns.GetHostName());
    foreach (var ip in host.AddressList)
    {
        if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
        {
            return ip.ToString();
        }
    }
    return "localhost";
}