// Importando namespaces necessários
using System.Net;
using MonitoramentoJoystickWebApi;

// Criando um construtor de WebApplication
var builder = WebApplication.CreateBuilder(args);

// Configurando o host da web para escutar em todas as interfaces de rede na porta 5000
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Construindo a aplicação
var app = builder.Build();

// Inicializando um objeto PicoData com valores padrão
PicoData? data = new(50, 20);

// Habilitando o serviço de arquivos padrão
app.UseDefaultFiles();
// Habilitando o serviço de arquivos estáticos
app.UseStaticFiles();

// Mapeando um endpoint GET para retornar o PicoData atual
app.MapGet("/dados", () =>
{
    // Retornando os dados atuais, se existirem, caso contrário, retornando valores padrão
    if (data != null)
    {
        return Results.Json(data);
    }
    return Results.Json(new { X = 0, Y = 80 });
});

// Mapeando um endpoint POST para atualizar o PicoData
app.MapPost("/dados", async (HttpContext context) =>
{
    // Lendo o corpo JSON da requisição
    var body = await context.Request.ReadFromJsonAsync<PicoData>();
    if (body != null)
    {
        // Atualizando os dados e registrando os valores recebidos
        data = body;
        Console.WriteLine($"Dados recebidos da Pico W -> X : {body.X} | Y : {body.Y}");
        return Results.Ok("Dados recebidos");
    }
    // Retornando uma resposta de requisição inválida se o JSON for inválido
    return Results.BadRequest("JSON inválido!");
});

// Obtendo o endereço IP local do servidor
var localIp = GetLocalIpAdress();
// Registrando o URL do servidor
Console.WriteLine($"Servidor rodando em : http://{localIp}:5000");

// Executando a aplicação
app.Run();

// Método para recuperar o endereço IP local
static string GetLocalIpAdress()
{
    // Obtendo a entrada do host para a máquina atual
    var host = Dns.GetHostEntry(Dns.GetHostName());
    foreach (var ip in host.AddressList)
    {
        // Retornando o primeiro endereço IPv4 encontrado
        if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
        {
            return ip.ToString();
        }
    }
    // Retornando "localhost" se nenhum endereço IPv4 for encontrado
    return "localhost";
}