#include "web_server.h"

err_t sent_callback(void *arg, struct tcp_pcb *tcpb, u16_t len)
{
    printf("Dados enviados com sucesso!\n");
    tcp_close(tcpb);
    return ERR_OK;
}

void send_data_to_server(const char *path, char *request_body, const char *type_method)
{
    struct tcp_pcb *pcb = tcp_new();
    if(!pcb)
    {
        printf("Erro ao criar pcb\n");
        return;
    }

    ip_addr_t server_ip;
    server_ip.addr = ipaddr_addr(SERVER_IP);

    if(tcp_connect(pcb, &server_ip, SERVEE_PORT, NULL) != ERR_OK)
    {
        printf("Erro ao conectar com o servidor!\n");
        tcp_abort(pcb);
        return;
    }

    char request[521];
    snprintf(request, sizeof(request),
             "%s %s HTTP/1.1\r\n"
             "Host: %s \r\n"
             "Content-Type: application/json\r\n"
             "Content-Length: %d\r\n"
             "\r\n"
             "%s",
             type_method, path, SERVER_IP, strlen(request_body), request_body);

    printf("Requisição HTTP : %s\n", request);

    tcp_sent(pcb, sent_callback);

    if(tcp_write(pcb, request, strlen(request), TCP_WRITE_FLAG_COPY) != ERR_OK)
    {
        printf("Erro ao enviar dados!\n");
        tcp_abort(pcb);
        return;
    }

    if(tcp_output(pcb) != ERR_OK)
    {
        printf("Erro ao enviar dados (tcp_output)\n");
        tcp_abort(pcb);
        return;
    }

}

void create_request(Vector2D vector2d)
{
    const char *type_meethod = "POST";
    const char *path = SERVER_PATH;
    char json_request[256];

    snprintf(json_request, sizeof(json_request),
             "{ \"x\" : %d, "
             "\"y\" : %d }",
             vector2d.x, vector2d.y);
    printf("JSON gerado : %s", json_request);
    send_data_to_server(path, json_request, type_meethod);
}