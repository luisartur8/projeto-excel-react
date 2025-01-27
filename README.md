# Projeto Gerenciador de Planilhas
[badgesaqui]

## 🚧 Projeto em construção 🚧

## Descrição
Uma aplicação que auxilia na validação e manipulação de um tipo de planilha de forma mais eficiente.

# Indice

* [Descrição](#descrição)
* [Como começar](#como-começar)
* [Funcionalidades e demonstração da aplicação](#funcionalidades-e-demonstração-da-aplicação)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Desenvolvedor](#desenvolvedor)

## Como Começar

1. Clone o repositório:
    ```bash
    git clone https://github.com/luisartur8/projeto-excel-react.git

2. Selecione o path para o servidor front-end e back-end respectivamente:
    ``` bash
    cd frontend
    ```
    ``` bash
    cd backend
    ```

3. Instale as dependências para o back-end e front-end.
    ```bash
    npm install
    ```

4. No back-end, rodar as migrations.
    ```bash
    knex migrate:latest
    ```

4. Para rodar o front-end e o servidor back-end:
    ```bash
    npm run dev
    ```

5. O projeto estará rodando em `http://localhost:3333`.
6. O servidor estará rodando em `http://localhost:4444`.

7. Usando ferramentas de teste de API, usar as seguintes rotas:
    - Métodos GET, POST e DELETE, podendo deletar com ou sem ID.
    * 'http://localhost:4444/clientes',
    * 'http://localhost:4444/lancamentos',
    * 'http://localhost:4444/oportunidades',
    * 'http://localhost:4444/produtos'

## Funcionalidades e demonstração da aplicação

1. É possível carregar e baixar planilhas com diferentes extensões (.xlsx, .xls, .csv, .ods).

2. Exportação de planilhas para o banco de dados.

3. Vários tipos de planilhas disponível (cliente, lançamentos, oportunidade, produtos).

4. Validação de diversos tipos de dados, para diferentes tipos de planilhas.

5. Formatar a planilha em um modelo padrão, de acordo com o tipo de planilha.

6. Manipulação de dados e da tabela:
    * Remoção de linhas e colunas de forma personalizada, assim como inserção de novas colunas.
    * Remoção de dados inválidos.
    * Localizar valores e substituir, podendo diferenciar maiúsculas e minúsculas, pesquisar por expressões regulares e corresponder toda célula.
    * Ordenar em ordem alfabética, auxiliando a indentificação de dados inválidos.
    * Juntar DDD e Telefone, informando o que deu errado.
    * É possível mesclar colunas com o mesmo tipo de dado.

<h2 align="center">Tecnologias Utilizadas</h2>

<h3 align="center">Front-End</h3>
<p align="center">
  <img src="https://skillicons.dev/icons?i=react&theme=light" alt="ReactJS" width="50" height="50">
  <br>ReactJS
</p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=vitest&theme=light" alt="Vitest" width="50" height="50">
  <br>Vitest
</p>

<h3 align="center">Back-End</h3>
<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs&theme=light" alt="NodeJS" width="50" height="50">
  <br>NodeJS
</p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=sqlite&theme=light" alt="SQLite" width="50" height="50">
  <br>SQLite
</p>

## Desenvolvedor
- [fotodogithubaq] @luisartur8

## Conclusão

Este projeto tem como objetivo melhorar a eficiência em arrumar e validar tipos específicos de planilhas. Com isso, conseguimos aumentar a velocidade de correção das planilhas.

Embora já tenha implementado as funcionalidades principais, há muitos pontos de melhoria que podem ser adicionados, como a virtualização da tabela, testes automatizados e melhora no CSS.

**Próximos passos:**
- Melhorar a performance, aplicando virtualização na tabela.
- Atualizar o CSS.
- Criar mais testes automatizados e atualizar os atuais.
- Possível melhora na estruturação do projeto.
