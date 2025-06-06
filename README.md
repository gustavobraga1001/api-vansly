# Back-End Vansly

Api Vasly desenvolvida para integrar o sistema com um banco de dados

# 🚀 Como subir o back-end

Este guia explica como clonar e rodar o projeto localmente.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Verifique as versões com:

```bash
node -v
npm -v
git --version 
docker -v
```

# 📦 Clonando o projeto
Clone o repositório para sua máquina local:

```bash
git clone https://github.com/gustavobraga1001/api-vansly.git
```
Entre na pasta do projeto:

```bash
cd api-vasnly
```

# 📁 Instalando dependências
Instale as dependências do projeto com:

```bash
npm install
```

ou, se estiver usando yarn:

```bash
yarn install
```

# 🐘 Subindo o banco PostgreSQL com Docker
Edite o arquivo docker-compose.yml com os seus dados escolhidos.
Para iniciar o container com o PostgreSQL, execute:
**O Banco irá vir sem dados cadastrados**

```bash
docker-compose up -d
```

O banco estará disponível em:

```bash
host: localhost
porta: 5432
usuário: docker
senha: docker
banco: yourdatabase
```

# 🔐 Variáveis de ambiente
Renomeie o arquivo .env.example e popule com os seguintes dados no seu ambiente:
```bash
JWT_SECRET=yourJWTsecret
DATABASE_URL="postgresql://docker:docker@localhost:5434/yourdatabase?schema=public"
```

# ▶️ Criando tabelas do Banco de dados com o Prisma
Rode no terminal o comando:
```bash
npx prisma migrate dev
```

Agora pra subir dados de teste rode no terminal:
```bash
npx prisma db execute --file ./database/init.sql
```

Se quiser ver no navegador uma UI simples do banco de dados, digite no terminal:
```bash
npx prisma studio
```

O Banco estará disponível em:

```bash
http://localhost:5555
```

# ▶️ Rodando o projeto
Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run start:dev
```

ou

```bash
yarn run start:dev
```

O projeto estará disponível em:

```bash
http://localhost:3333
```

Use as credênciais do João para logar no sistema como aluno
email: joao@example.com
senha: 123456

Use as credênciais do Vinicius para logar no sistema como motorista
email: vinicius@example.com
senha: 123456

## Funcionalidades do sistema na versão atual V(1.0)

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar um passageiro; 
- [x] Deve ser possível se autenticar;   
- [x] Deve ser possível um passageiro visualizar ofertas de serviço;   
- [ ] Deve ser possível um passageiro filtrar ofertas de serviço;   
- [x] Deve ser possível um passageiro contratar um serviço;   
- [x] Deve ser possível um passageiro confirmar falta;   
- [x] Deve ser possível um passageiro acompanhar um trajeto;   
- [x] Deve ser possível se cadastrar um motorista;   
- [x] Deve ser possível um motorista cadastrar um veiculo;  
- [x] Deve ser possível um motorista anunciar um serviço com imagens (url); 
- [x] Deve ser possível um motorista editar um anuncio;   
- [x] Deve ser possível um motorista iniciar um trajeto;   
- [x] Deve ser possível um motorista confirmar o embarque de um passageiro;   
- [x] Deve ser possível um motorista enviar documentos (url da imagem);
- [x] Deve ser possível um motorista verificar as estatisticas de faturamento;   
- [x] Deve ser possível um motorista aceitar ou negar um contrato;
- [x] Deve ser possível um motorista verificar contratos pagos/a pagar;  
- [x] Deve ser possível um motorista verificar contratos;  
- [x] Deve ser possível um motorista verificar o status de ocupação do veiculo;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não deve poder confirmar mais de uma falta no mesmo dia;
- [x] O passageiro não pode estar na rota se tiver uma falta no dia atual;
- [x] O motorista não pode iniciar uma rota sem no minimo um passageiro na rota;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário tem que estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (Json Web Token);
- [x] O usuário deve poder redefinir sua senha por meio de um código enviado para o e-mail;
- [ ] O usuário enviar imagens (arquivo) e serem salvas em um serviço de uploads;