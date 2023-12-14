# API Food Explorer - Rocketseat
Bem-vindo à API desenvolvida para o desafio final do curso "Explorer" da Rocketseat. Esta API foi construída em Node.js, utilizando JavaScript como linguagem principal, e faz uso das tecnologias SQL, SQLite e Express. Ela possui funcionalidades essenciais para gerenciamento de usuários, itens (pratos) e ingredientes, contribuindo para uma experiência completa e integrada.

<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens">
</p>


## Pré-requisitos
Certifique-se de ter o Node.js instalado em seu ambiente. Você pode instalar as dependências do projeto utilizando o seguinte comando:
```
npm install
```

## Migrations
A API vem com três migrations pré-configuradas: **users**, **items**, e **ingredients**. Essas migrations são automaticamente criadas quando o servidor é iniciado, caso ainda não existam no banco de dados.


## Tabela Users
A tabela users é responsável pelo gerenciamento de usuários, e possui a coluna roles que pode ter os valores **"admin"** ou **"customer"**. Cada role atribui diferentes permissões na aplicação.

- **Admin:** Possui permissões amplas, permitindo o gerenciamento completo da aplicação.
- **Customer:** Conta com permissões restritas, adequadas para interações básicas na aplicação.

> [!TIP]
> O banco de dados já está com alguns exemplos de itens cadastrados e usuários com permissões.

<details>
<summary>Login de usuário admin:</summary>
  
```
(email: admin | password: admin)
 ```
</details>

<details>
<summary>Login de usuário customer:</summary>
  
 ```
(email: customer | password: customer)
 ```
</details>

  
## Multer para Upload de Imagens
A API utiliza o multer para facilitar o upload de imagens.

## Middlewares
Dois middlewares foram adicionados:

1. Middleware para Verificar Informações do Usuário:
Este middleware é responsável por validar as informações do usuário, incluindo o ID e o JWT token.

2. Middleware para Verificar Role do Usuário:
Este middleware verifica a role do usuário, permitindo ou bloqueando o acesso a determinadas funcionalidades com base nas permissões associadas a cada role (admin ou customer).


## Como Iniciar o Servidor
Execute o seguinte comando para iniciar o servidor:

```
npm start
```
Isso iniciará o servidor na porta default (3333), mas você pode configurar a porta no arquivo **.env** caso necessário.

> [!TIP]
> A dependência pm2 foi instalada para que a aplicação se mantenha online mesmo se ocorrer algum erro interno.
