# App

Api Vasly 

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar um passageiro; 
- [ ] Deve ser possível se autenticar;   
- [ ] Deve ser possível um passageiro visualizar ofertas de serviço;   
- [ ] Deve ser possível um passageiro filtrar ofertas de serviço;   
- [ ] Deve ser possível um passageiro enviar uma proposta;   
- [ ] Deve ser possível um passageiro confirmar falta;   
- [ ] Deve ser possível um passageiro acompanhar um trajeto;   
- [ ] Deve ser possível se cadastrar um motorista;   
- [ ] Deve ser possível um motorista cadastrar um veiculo;   
- [ ] Deve ser possível um motorista anunciar um serviço;   
- [ ] Deve ser possível um motorista aceitar ou recusar proposta;   
- [ ] Deve ser possível um motorista iniciar um trajeto;   
- [ ] Deve ser possível um motorista confirmar o embarque de um passageiro;   

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O passageiro não pode estar na rota se tiver uma falta no dia atual;
- [] O motorista não pode iniciar uma rota sem no minimo um passageiro na rota;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário tem que estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [] O usuário deve ser identificado por um JWT (Json Web Token);