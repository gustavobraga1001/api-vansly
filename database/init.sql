-- Usuários
INSERT INTO "users" (id, name, email, password_hash) VALUES
('f185999b-d2bc-469a-8275-263e430bb67f','João', 'joao@example.com', '$2a$06$K42VPPNia63NwtVc6PvAZuwbx5BL3xOI0Gjs0rbaS.18FpgmbEara');

INSERT INTO "users" (id, name, email, password_hash) VALUES
('f185999b-d2bc-469a-8275-263e430bb43d','Vinicius', 'vinicius@example.com', '$2a$06$K42VPPNia63NwtVc6PvAZuwbx5BL3xOI0Gjs0rbaS.18FpgmbEara');

-- Motorista
INSERT INTO "drivers" (id, cnh, cpf, user_id) VALUES
('e06fbe78-f47a-4760-84a4-f20e6a3ce0c0','123432453', '12376589076', 'f185999b-d2bc-469a-8275-263e430bb43d');

-- Documentos do motorista
INSERT INTO "images_documents" (id, url, name, created_at, driver_id) VALUES
('77f13921-693f-4546-bf03-bbfca2a1be60','https://res.cloudinary.com/drwmleqnd/image/upload/v1745960985/cnh_wjnryh.jpg', 'CNH', '2025-04-29T21:22:18.844Z', 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0');

INSERT INTO "images_documents" (id, url, name, created_at, driver_id) VALUES
('d49dc26d-bfe3-438e-9b3a-95d1ad4b82e9','https://res.cloudinary.com/drwmleqnd/image/upload/v1745961003/crlv_saaesm.png', 'CRLV', '2025-04-29T21:22:18.844Z', 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0');

-- Veículo
INSERT INTO "vehicles" (id, model, plate, mark, year, total_capacity, driver_id) VALUES
('150e5573-41bc-4118-826e-11ad13e78583', 'FXX', 'EDJ8O30', 'Toyota', '2020', 20, 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0');

-- Anúncio
INSERT INTO "announcements" (id, title, stars, city, "monthlyAmount", driver_id, vehicle_id) VALUES
('e7cf00bd-5d43-4783-9d77-4e66cc350cd0','Van do Vinicius', 5, 'Santo André', 400, 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0', '150e5573-41bc-4118-826e-11ad13e78583');

-- Imagens do anúncio
INSERT INTO "images" (id, url, announcement_id) VALUES
('2f56d6d0-bc32-4c4f-a9ad-45a0b678410e','https://res.cloudinary.com/drwmleqnd/image/upload/v1745961522/vanmotorista_wm4xtm.jpg', 'e7cf00bd-5d43-4783-9d77-4e66cc350cd0');

INSERT INTO "images" (id, url, announcement_id) VALUES
('cadb91d6-16d8-485c-800a-7e4ef94cffa2','https://res.cloudinary.com/drwmleqnd/image/upload/v1745961522/vaninterna_zukdbw.jpg', 'e7cf00bd-5d43-4783-9d77-4e66cc350cd0');

-- Contrato
INSERT INTO "contracts" (id, period, boarding, landing, institution, "monthlyAmount", status, created_at, user_id, driver_id) VALUES
('5b5db636-a321-4055-80da-fa8315e43fc9','MANHA', 'Rua teste, 200', 'Rua teste, 200', 'Uscs - Conceição', 400, 'ACEITO', '2025-04-29T21:22:18.844Z', 'f185999b-d2bc-469a-8275-263e430bb67f', 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0');

-- Novo usuário
INSERT INTO "users" (id, name, email, password_hash) VALUES
('88a7acac-c3c6-4e97-b4ef-e4f42f982a01', 'Maria', 'maria@example.com', '$2a$06$K42VPPNia63NwtVc6PvAZuwbx5BL3xOI0Gjs0rbaS.18FpgmbEara');

-- Novo contrato com motorista Vinicius
INSERT INTO "contracts" (id, period, boarding, landing, institution, "monthlyAmount", status, created_at, user_id, driver_id) VALUES
('1f0bb404-820b-40a4-8de8-13ae5dc9c2e1','MANHA', 'Av. Brasil, 500', 'Av. Paulista, 1000', 'Colégio Objetivo', 450, 'PENDENTE', '2025-04-29T21:22:18.844Z', '88a7acac-c3c6-4e97-b4ef-e4f42f982a01', 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0');

-- Pagamentos dos contratos para FEV
INSERT INTO "payments" (id, value, mouth, payment_at, contract_id) VALUES
('9b2de95e-3e3f-4a9d-8c70-c8bcbb64f8e2', 400, 'FEV', '2025-02-10T08:00:00.000Z', '5b5db636-a321-4055-80da-fa8315e43fc9'),
('3c4379fc-7747-4b1c-b0d3-981f9aef456e', 450, 'FEV', '2025-02-12T08:00:00.000Z', '1f0bb404-820b-40a4-8de8-13ae5dc9c2e1');

-- Criando rota
INSERT INTO "routes" (id, date, period, driver_id, vehicle_id) VALUES
('a3c2c6f2-98e6-40ea-bcb2-7d28fc4387ab', '2025-02-20T07:00:00.000Z', 'MANHA', 'e06fbe78-f47a-4760-84a4-f20e6a3ce0c0', '150e5573-41bc-4118-826e-11ad13e78583');

-- Paradas (stops)
INSERT INTO "stops" (id, address, status, validated_at, user_id) VALUES
('f51f139e-d10f-4ff5-a0a7-e2828b63b738', 'Av. Brasil, 500', true, '2025-02-20T07:10:00.000Z', '88a7acac-c3c6-4e97-b4ef-e4f42f982a01'),
('3f7d5283-113d-4bb5-9eaa-9f452efee3a0', 'Rua teste, 200', true, '2025-02-20T07:20:00.000Z', 'f185999b-d2bc-469a-8275-263e430bb67f');

-- Tabela relacional route_stop
INSERT INTO "RouteStop" (id, route_id, stop_id) VALUES
('a25c537b-2bd4-4fd6-a2ec-0083d0d2c28d', 'a3c2c6f2-98e6-40ea-bcb2-7d28fc4387ab', 'f51f139e-d10f-4ff5-a0a7-e2828b63b738'),
('d7e1d1e9-2481-4cc7-8734-790f26a0c517', 'a3c2c6f2-98e6-40ea-bcb2-7d28fc4387ab', '3f7d5283-113d-4bb5-9eaa-9f452efee3a0');

