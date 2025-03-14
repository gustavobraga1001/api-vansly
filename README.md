# App

Api Vasly 

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
- [ ] Deve ser possível um motorista editar um anuncio;   
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