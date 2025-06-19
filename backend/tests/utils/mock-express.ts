/**
 * Express é um framework web para Node.js que facilita a criação de servidores HTTP.
 * Ele organiza o tratamento das requisições em funções chamadas "middlewares" e "controllers".
 *
 * Quando o servidor recebe uma requisição HTTP, o Express cria objetos `Request` (req) e `Response` (res),
 * que são passados para essas funções para manipular a requisição e construir a resposta.
 *
 * O objeto `Request` contém dados da requisição (como parâmetros, corpo, query string),
 * enquanto o objeto `Response` possui métodos para enviar respostas ao cliente (como status, JSON, texto).
 *
 * Nos testes unitários, para testar controllers isoladamente,
 * simulamos (mockamos) esses objetos para verificar o comportamento do código sem precisar rodar o servidor.

 * O conceito de **mock** se refere à criação de versões "falsas", controladas e previsíveis de objetos ou funções reais.
 * Com eles, conseguimos testar a lógica do controller sem depender da execução real do framework Express.
 */

/**
 * Simula o objeto `Response` do Express.
 * Fornece métodos como `.status()`, `.json()` e `.send()`,
 * que podem ser monitorados durante os testes com `jest.fn()`.
 */

export function mockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

/**
 * Simula o objeto `Request` do Express.
 * Permite passar dados no corpo (`body`), nos parâmetros (`params`) e nas queries (`query`).
 * Útil para testar diferentes tipos de requisições simuladas ao controller.
 */

export function mockRequest(body = {}, params = {}, query = {}) {
  return {
    body,
    params,
    query,
  } as any;
}
