--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '4d803b2f-6373-4824-b23d-5a4c6ece36f4', 'authenticated', 'authenticated', 'lojista-teste-insomnia-003@example.com', '$2a$10$HHKT2KrPZOIVpt67MtJA1eRwOLuXE/yuGSUYQOinYwx1ukMREaRo.', '2026-07-10 14:03:19.064282+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-10 14:03:19.092403+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4d803b2f-6373-4824-b23d-5a4c6ece36f4", "email": "lojista-teste-insomnia-003@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-07-10 14:03:19.037533+00', '2026-07-10 21:15:48.671249+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', 'authenticated', 'authenticated', 'lojista-teste-insomnia-001@example.com', '$2a$10$Lz/bpRAl9EKMw8qtoE35PujYIAUzjh23JH6EPWTl0yKfb8qrs4w6i', '2026-07-06 00:50:41.604566+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-10 14:00:36.290218+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c6e96b77-b615-4c40-aadf-8ca9c290554d", "email": "lojista-teste-insomnia-001@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-07-06 00:50:41.588021+00', '2026-07-10 14:00:36.297998+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '85c95dc5-eba7-4768-a584-a2ac44112cd7', 'authenticated', 'authenticated', 'test-1783031282278-f3wkgo5nggu@pedeaqui-test.local', '$2a$10$2lkLNNzd9g4m3hsMdAWFIOpToMDNrSqEB5hvAMaBVyXUW/JJS3gwO', '2026-07-02 22:28:02.664967+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 22:28:02.695667+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "85c95dc5-eba7-4768-a584-a2ac44112cd7", "email": "test-1783031282278-f3wkgo5nggu@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 22:28:02.640596+00', '2026-07-02 22:28:02.70603+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '293980f4-a883-414e-aa71-9e8131230bac', 'authenticated', 'authenticated', 'lojista-teste-insomnia-345@example.com', '$2a$10$9cnQSPn0MjxVFAYSpJCyluIltXT6vnXgsAnfaDJ/Z4P7abx.cm98.', '2026-07-09 12:38:43.830127+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-09 12:38:43.856195+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "293980f4-a883-414e-aa71-9e8131230bac", "email": "lojista-teste-insomnia-345@example.com", "email_verified": true, "phone_verified": false}', NULL, '2026-07-09 12:38:43.818467+00', '2026-07-09 13:40:20.196859+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'c3d0827a-7b3a-4e41-8842-cb1b819de1f4', 'authenticated', 'authenticated', 'test-1783194837913-bxh28eubrv@pedeaqui-test.local', '$2a$10$vacyxKEuGaTygE2CVC5hlOejsTLCjQZ5ZJJ8lNjy3bQSEzPr1KoJa', '2026-07-04 19:53:58.159161+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-04 19:53:58.485271+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c3d0827a-7b3a-4e41-8842-cb1b819de1f4", "email": "test-1783194837913-bxh28eubrv@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-04 19:53:58.144461+00', '2026-07-04 19:53:58.492423+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '0dca6300-40d4-4b85-99e4-dcf7c72899c2', 'authenticated', 'authenticated', 'test-1783028073865-wu3jtazf3oi@pedeaqui-test.local', '$2a$10$0RDIFr5B8R53ZiQ3jHkGbeIviGk3Re65Kw4xOGItiPfzdl0m7x5xu', '2026-07-02 21:34:34.530641+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 21:34:35.028019+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "0dca6300-40d4-4b85-99e4-dcf7c72899c2", "email": "test-1783028073865-wu3jtazf3oi@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 21:34:34.506873+00', '2026-07-02 21:34:35.034169+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'cd919f69-fadd-4f91-a273-dd73f59bab43', 'authenticated', 'authenticated', 'test-1783028073887-e3kghd7158a@pedeaqui-test.local', '$2a$10$rbbq/9WLolru8lMTamPoqerKdHJrVzJn3RoPAw8GRtxIlyLBZzjiW', '2026-07-02 21:34:34.532226+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 21:34:34.557537+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "cd919f69-fadd-4f91-a273-dd73f59bab43", "email": "test-1783028073887-e3kghd7158a@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 21:34:34.516307+00', '2026-07-02 21:34:34.57351+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '18044593-8bd8-4dfb-a267-b61ef2872614', 'authenticated', 'authenticated', 'test-1783031282669-f39486f8pvk@pedeaqui-test.local', '$2a$10$PCtSZTWm4C7Io2XSpCVpFuF0qmCgCVQsD5O7YtjGlKgpU7iiHQg8G', '2026-07-02 22:28:02.946298+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 22:28:02.972529+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "18044593-8bd8-4dfb-a267-b61ef2872614", "email": "test-1783031282669-f39486f8pvk@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 22:28:02.925178+00', '2026-07-02 22:28:02.980057+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', 'authenticated', 'authenticated', 'test-1783194597768-ldzpzlhrp0@pedeaqui-test.local', '$2a$10$Ne24gUyNAFXbEGok.ovMjulJk7LXNz0BEu3egnzSuL90VdoDu6t0O', '2026-07-04 19:49:58.015897+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-04 19:49:58.334411+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a492e0f4-3e58-437a-bc4a-3a028a6c0fdf", "email": "test-1783194597768-ldzpzlhrp0@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-04 19:49:58.00033+00', '2026-07-04 19:49:58.340404+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'd01ceec8-066a-4073-a7a0-d74fd5118ce9', 'authenticated', 'authenticated', 'test-1783194904561-rl276n4dt8@pedeaqui-test.local', '$2a$10$Ulm38aw1XxMNRyh5xfFpzu37qhCXppKwxPztSo.G6DgonVgDZ3SfO', '2026-07-04 19:55:04.802186+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-04 19:55:05.139829+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d01ceec8-066a-4073-a7a0-d74fd5118ce9", "email": "test-1783194904561-rl276n4dt8@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-04 19:55:04.78521+00', '2026-07-04 19:55:05.14633+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '9c230d41-afc9-4a35-af21-d6a2fb267d26', 'authenticated', 'authenticated', 'test-1783301184881-yw73j6v7ot@pedeaqui-test.local', '$2a$10$0BvKDhiNJM9ToeiWbQIPTODHfrxDBiI4PU543VdD1ADMg8ZkBnBRC', '2026-07-06 01:26:25.085145+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-06 01:26:25.364854+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9c230d41-afc9-4a35-af21-d6a2fb267d26", "email": "test-1783301184881-yw73j6v7ot@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-06 01:26:25.071854+00', '2026-07-06 01:26:25.370665+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'dbdd50d2-2667-4f87-8fd5-246b27ed78aa', 'authenticated', 'authenticated', 'test-1783301694977-hnm21fkg6u@pedeaqui-test.local', '$2a$10$GHdRDndPMaFcJyzA63Tx6eVrnwfoDYNOTbjwwS9bUlFpjyDCiREe2', '2026-07-06 01:34:55.179673+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-06 01:34:55.471017+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "dbdd50d2-2667-4f87-8fd5-246b27ed78aa", "email": "test-1783301694977-hnm21fkg6u@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-06 01:34:55.163955+00', '2026-07-06 01:34:55.475235+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'f4528ce2-dc68-4752-a203-4dbb9381601b', 'authenticated', 'authenticated', 'test-1783028074779-n1llidmbz2i@pedeaqui-test.local', '$2a$10$/yA8m7OOrYw4U3yKMmUbu.Xhc7EhQSYlBwcdqfi1rOcv2SPgO1rCS', '2026-07-02 21:34:35.036569+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 21:34:35.06331+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f4528ce2-dc68-4752-a203-4dbb9381601b", "email": "test-1783028074779-n1llidmbz2i@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 21:34:35.021818+00', '2026-07-02 21:34:35.071193+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '90a194d0-808c-4906-b48a-8ea10f007972', 'authenticated', 'authenticated', 'test-1783301027403-pygnet4vz2@pedeaqui-test.local', '$2a$10$bmZi6yjKrl/QdqSsOdHVIOz8TgFUCSbVQzrWvIum9rXMEhevj50HO', '2026-07-06 01:23:47.603746+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-06 01:23:47.875137+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "90a194d0-808c-4906-b48a-8ea10f007972", "email": "test-1783301027403-pygnet4vz2@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-06 01:23:47.590782+00', '2026-07-06 01:23:47.879389+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '36812a55-c715-431b-95b8-de96328105f1', 'authenticated', 'authenticated', 'test-1783028073871-x3170k7v7k@pedeaqui-test.local', '$2a$10$36OI5XKxX/una5u40u5lieiv01uTZwM0vJz9KrmiIY3sdAHoM21au', '2026-07-02 21:34:34.530552+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 21:34:34.563722+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "36812a55-c715-431b-95b8-de96328105f1", "email": "test-1783028073871-x3170k7v7k@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 21:34:34.508215+00', '2026-07-02 21:34:34.573519+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'f2ca8122-4cc8-4803-a380-0b8ac7521cd6', 'authenticated', 'authenticated', 'test-1783031282079-al5e91sg79c@pedeaqui-test.local', '$2a$10$zf0iGU4OqCw7/7Hs5F8y9eld9rYWqgQtA6W7dzWZZEi9PlitPXDdK', '2026-07-02 22:28:02.510799+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 22:28:03.288986+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f2ca8122-4cc8-4803-a380-0b8ac7521cd6", "email": "test-1783031282079-al5e91sg79c@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 22:28:02.491452+00', '2026-07-02 22:28:03.296051+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'd215176c-2c87-4834-9b15-53271fad45e5', 'authenticated', 'authenticated', 'test-1783462021094-f98ckcrqbq@pedeaqui-test.local', '$2a$10$Tk7TMdb1VoiVd21AbEHiXeBhQOWVXfNCHh0iwWjdb526NO4EPPZTG', '2026-07-07 22:07:01.341674+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-07 22:07:01.6804+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "d215176c-2c87-4834-9b15-53271fad45e5", "email": "test-1783462021094-f98ckcrqbq@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-07 22:07:01.325433+00', '2026-07-07 22:07:01.687964+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '00330404-3982-467d-8c4d-a5fc7344cd65', 'authenticated', 'authenticated', 'test-1783028073880-8jmr4wenodo@pedeaqui-test.local', '$2a$10$PBpKwp/tVlXOworql4N3LONzC/Vtuub5w5PtS6hjAOvYXNk8H8F22', '2026-07-02 21:34:34.530658+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 21:34:35.382553+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "00330404-3982-467d-8c4d-a5fc7344cd65", "email": "test-1783028073880-8jmr4wenodo@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 21:34:34.505418+00', '2026-07-02 21:34:35.38853+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a', 'authenticated', 'authenticated', 'test-1783194522399-6xv0hlvbr8@pedeaqui-test.local', '$2a$10$Wj5xaV69jY6JY/ElDuDjAepzN1m0FZct2W/edAamWSEHhs.lbbl7.', '2026-07-04 19:48:42.636289+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-04 19:48:42.950284+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a", "email": "test-1783194522399-6xv0hlvbr8@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-04 19:48:42.619842+00', '2026-07-04 19:48:42.957667+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'ad9666c6-573a-4ced-9fde-8cda902a9a4b', 'authenticated', 'authenticated', 'test-1783194802059-gpzc5wdy0t@pedeaqui-test.local', '$2a$10$35yXqugYuuneHtudhUzagODs8RaoewsFhGBWD624y5OYFOEMuUD8C', '2026-07-04 19:53:22.285312+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-04 19:53:22.608251+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ad9666c6-573a-4ced-9fde-8cda902a9a4b", "email": "test-1783194802059-gpzc5wdy0t@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-04 19:53:22.267711+00', '2026-07-04 19:53:22.615319+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', '9b199d1e-a71b-4f78-97f6-7e152f9c035c', 'authenticated', 'authenticated', 'test-1783031282272-0doamtldjade@pedeaqui-test.local', '$2a$10$ZYhPYkMNEFpqRLkOGEMbmuA62DOGKn5gbiA.WJdqTdfFTdf/2dGq.', '2026-07-02 22:28:02.631446+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 22:28:02.660737+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "9b199d1e-a71b-4f78-97f6-7e152f9c035c", "email": "test-1783031282272-0doamtldjade@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 22:28:02.612003+00', '2026-07-02 22:28:02.66807+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000000', 'c15ef782-ec6d-4396-9e23-afd3a3ae46a7', 'authenticated', 'authenticated', 'test-1783031282295-18hrbj6d1fj@pedeaqui-test.local', '$2a$10$5PVju5IeATKBquLzH1Y.celRdoxh7qoLOmy2713Zgc1vdKhTNH1MC', '2026-07-02 22:28:02.637724+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-07-02 22:28:02.666322+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c15ef782-ec6d-4396-9e23-afd3a3ae46a7", "email": "test-1783031282295-18hrbj6d1fj@pedeaqui-test.local", "email_verified": true, "phone_verified": false}', NULL, '2026-07-02 22:28:02.618742+00', '2026-07-02 22:28:02.674047+00', NULL, NULL, '', '', NULL, DEFAULT, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO auth.identities VALUES ('0dca6300-40d4-4b85-99e4-dcf7c72899c2', '0dca6300-40d4-4b85-99e4-dcf7c72899c2', '{"sub": "0dca6300-40d4-4b85-99e4-dcf7c72899c2", "email": "test-1783028073865-wu3jtazf3oi@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 21:34:34.521627+00', '2026-07-02 21:34:34.521702+00', '2026-07-02 21:34:34.521702+00', DEFAULT, '2357a696-c160-4fef-9cc7-dc894d3e2a27');
INSERT INTO auth.identities VALUES ('36812a55-c715-431b-95b8-de96328105f1', '36812a55-c715-431b-95b8-de96328105f1', '{"sub": "36812a55-c715-431b-95b8-de96328105f1", "email": "test-1783028073871-x3170k7v7k@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 21:34:34.521602+00', '2026-07-02 21:34:34.521683+00', '2026-07-02 21:34:34.521683+00', DEFAULT, '597432d1-b84c-4061-b58e-e4ca944b8478');
INSERT INTO auth.identities VALUES ('00330404-3982-467d-8c4d-a5fc7344cd65', '00330404-3982-467d-8c4d-a5fc7344cd65', '{"sub": "00330404-3982-467d-8c4d-a5fc7344cd65", "email": "test-1783028073880-8jmr4wenodo@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 21:34:34.522211+00', '2026-07-02 21:34:34.522537+00', '2026-07-02 21:34:34.522537+00', DEFAULT, '0e3fb1aa-472b-4cce-bb72-125dc4bda001');
INSERT INTO auth.identities VALUES ('cd919f69-fadd-4f91-a273-dd73f59bab43', 'cd919f69-fadd-4f91-a273-dd73f59bab43', '{"sub": "cd919f69-fadd-4f91-a273-dd73f59bab43", "email": "test-1783028073887-e3kghd7158a@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 21:34:34.525946+00', '2026-07-02 21:34:34.526028+00', '2026-07-02 21:34:34.526028+00', DEFAULT, '7809358f-e377-4841-84cc-ec5fda87cdba');
INSERT INTO auth.identities VALUES ('f4528ce2-dc68-4752-a203-4dbb9381601b', 'f4528ce2-dc68-4752-a203-4dbb9381601b', '{"sub": "f4528ce2-dc68-4752-a203-4dbb9381601b", "email": "test-1783028074779-n1llidmbz2i@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 21:34:35.030786+00', '2026-07-02 21:34:35.030908+00', '2026-07-02 21:34:35.030908+00', DEFAULT, '20a80493-1295-495f-bedc-ed7486b98052');
INSERT INTO auth.identities VALUES ('f2ca8122-4cc8-4803-a380-0b8ac7521cd6', 'f2ca8122-4cc8-4803-a380-0b8ac7521cd6', '{"sub": "f2ca8122-4cc8-4803-a380-0b8ac7521cd6", "email": "test-1783031282079-al5e91sg79c@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 22:28:02.503471+00', '2026-07-02 22:28:02.503604+00', '2026-07-02 22:28:02.503604+00', DEFAULT, '1d889fc2-6218-4e0a-9e78-c7907641e7fa');
INSERT INTO auth.identities VALUES ('9b199d1e-a71b-4f78-97f6-7e152f9c035c', '9b199d1e-a71b-4f78-97f6-7e152f9c035c', '{"sub": "9b199d1e-a71b-4f78-97f6-7e152f9c035c", "email": "test-1783031282272-0doamtldjade@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 22:28:02.62381+00', '2026-07-02 22:28:02.623903+00', '2026-07-02 22:28:02.623903+00', DEFAULT, 'e7472a3d-1abb-43b7-ac5a-4c6d79e232c5');
INSERT INTO auth.identities VALUES ('c15ef782-ec6d-4396-9e23-afd3a3ae46a7', 'c15ef782-ec6d-4396-9e23-afd3a3ae46a7', '{"sub": "c15ef782-ec6d-4396-9e23-afd3a3ae46a7", "email": "test-1783031282295-18hrbj6d1fj@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 22:28:02.630031+00', '2026-07-02 22:28:02.630144+00', '2026-07-02 22:28:02.630144+00', DEFAULT, 'c431939b-af2f-4549-9776-a06a3ed1ff5c');
INSERT INTO auth.identities VALUES ('85c95dc5-eba7-4768-a584-a2ac44112cd7', '85c95dc5-eba7-4768-a584-a2ac44112cd7', '{"sub": "85c95dc5-eba7-4768-a584-a2ac44112cd7", "email": "test-1783031282278-f3wkgo5nggu@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 22:28:02.653073+00', '2026-07-02 22:28:02.653292+00', '2026-07-02 22:28:02.653292+00', DEFAULT, '6fa15a4c-63a3-45be-86c7-e2b2c72133c0');
INSERT INTO auth.identities VALUES ('18044593-8bd8-4dfb-a267-b61ef2872614', '18044593-8bd8-4dfb-a267-b61ef2872614', '{"sub": "18044593-8bd8-4dfb-a267-b61ef2872614", "email": "test-1783031282669-f39486f8pvk@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-02 22:28:02.936568+00', '2026-07-02 22:28:02.936709+00', '2026-07-02 22:28:02.936709+00', DEFAULT, 'ed4ea750-bc3e-421f-94a4-a7d537c292d4');
INSERT INTO auth.identities VALUES ('c6e96b77-b615-4c40-aadf-8ca9c290554d', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', '{"sub": "c6e96b77-b615-4c40-aadf-8ca9c290554d", "email": "lojista-teste-insomnia-001@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-06 00:50:41.598767+00', '2026-07-06 00:50:41.598873+00', '2026-07-06 00:50:41.598873+00', DEFAULT, 'c2c3a60a-95ba-4e22-b9a6-307ac28d2088');
INSERT INTO auth.identities VALUES ('90a194d0-808c-4906-b48a-8ea10f007972', '90a194d0-808c-4906-b48a-8ea10f007972', '{"sub": "90a194d0-808c-4906-b48a-8ea10f007972", "email": "test-1783301027403-pygnet4vz2@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-06 01:23:47.597837+00', '2026-07-06 01:23:47.597895+00', '2026-07-06 01:23:47.597895+00', DEFAULT, '5c1ba0e0-910c-49d1-8beb-24da1041a866');
INSERT INTO auth.identities VALUES ('9c230d41-afc9-4a35-af21-d6a2fb267d26', '9c230d41-afc9-4a35-af21-d6a2fb267d26', '{"sub": "9c230d41-afc9-4a35-af21-d6a2fb267d26", "email": "test-1783301184881-yw73j6v7ot@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-06 01:26:25.080141+00', '2026-07-06 01:26:25.080212+00', '2026-07-06 01:26:25.080212+00', DEFAULT, 'cb18bf5d-6593-4b5d-a382-9a19d599966c');
INSERT INTO auth.identities VALUES ('dbdd50d2-2667-4f87-8fd5-246b27ed78aa', 'dbdd50d2-2667-4f87-8fd5-246b27ed78aa', '{"sub": "dbdd50d2-2667-4f87-8fd5-246b27ed78aa", "email": "test-1783301694977-hnm21fkg6u@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-06 01:34:55.173711+00', '2026-07-06 01:34:55.173783+00', '2026-07-06 01:34:55.173783+00', DEFAULT, 'cc2f19aa-ea5b-44d5-8469-16c1e96783cd');
INSERT INTO auth.identities VALUES ('5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a', '5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a', '{"sub": "5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a", "email": "test-1783194522399-6xv0hlvbr8@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-04 19:48:42.630687+00', '2026-07-04 19:48:42.630766+00', '2026-07-04 19:48:42.630766+00', DEFAULT, 'f2537b3e-22d0-43c5-97ca-fa146d76f798');
INSERT INTO auth.identities VALUES ('a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', 'a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', '{"sub": "a492e0f4-3e58-437a-bc4a-3a028a6c0fdf", "email": "test-1783194597768-ldzpzlhrp0@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-04 19:49:58.009215+00', '2026-07-04 19:49:58.009286+00', '2026-07-04 19:49:58.009286+00', DEFAULT, '802e452a-1f8b-4243-a8b2-df6a9ba3ea66');
INSERT INTO auth.identities VALUES ('ad9666c6-573a-4ced-9fde-8cda902a9a4b', 'ad9666c6-573a-4ced-9fde-8cda902a9a4b', '{"sub": "ad9666c6-573a-4ced-9fde-8cda902a9a4b", "email": "test-1783194802059-gpzc5wdy0t@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-04 19:53:22.277858+00', '2026-07-04 19:53:22.277942+00', '2026-07-04 19:53:22.277942+00', DEFAULT, 'a1a00ca9-803f-4ccc-960e-9609380c8205');
INSERT INTO auth.identities VALUES ('c3d0827a-7b3a-4e41-8842-cb1b819de1f4', 'c3d0827a-7b3a-4e41-8842-cb1b819de1f4', '{"sub": "c3d0827a-7b3a-4e41-8842-cb1b819de1f4", "email": "test-1783194837913-bxh28eubrv@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-04 19:53:58.15265+00', '2026-07-04 19:53:58.152753+00', '2026-07-04 19:53:58.152753+00', DEFAULT, 'b41a2e9e-3e0f-4b72-8a65-f5b63076548f');
INSERT INTO auth.identities VALUES ('d01ceec8-066a-4073-a7a0-d74fd5118ce9', 'd01ceec8-066a-4073-a7a0-d74fd5118ce9', '{"sub": "d01ceec8-066a-4073-a7a0-d74fd5118ce9", "email": "test-1783194904561-rl276n4dt8@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-04 19:55:04.795245+00', '2026-07-04 19:55:04.795395+00', '2026-07-04 19:55:04.795395+00', DEFAULT, '0d24abd6-e6bc-44f7-bb2b-e0fba4cc16a0');
INSERT INTO auth.identities VALUES ('d215176c-2c87-4834-9b15-53271fad45e5', 'd215176c-2c87-4834-9b15-53271fad45e5', '{"sub": "d215176c-2c87-4834-9b15-53271fad45e5", "email": "test-1783462021094-f98ckcrqbq@pedeaqui-test.local", "email_verified": false, "phone_verified": false}', 'email', '2026-07-07 22:07:01.334856+00', '2026-07-07 22:07:01.334941+00', '2026-07-07 22:07:01.334941+00', DEFAULT, 'b830a762-9cea-4e4a-b7b6-a451bedee3a2');
INSERT INTO auth.identities VALUES ('293980f4-a883-414e-aa71-9e8131230bac', '293980f4-a883-414e-aa71-9e8131230bac', '{"sub": "293980f4-a883-414e-aa71-9e8131230bac", "email": "lojista-teste-insomnia-345@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-09 12:38:43.825428+00', '2026-07-09 12:38:43.825499+00', '2026-07-09 12:38:43.825499+00', DEFAULT, '184d26fc-833b-44b8-861f-2480e26d4ebd');
INSERT INTO auth.identities VALUES ('4d803b2f-6373-4824-b23d-5a4c6ece36f4', '4d803b2f-6373-4824-b23d-5a4c6ece36f4', '{"sub": "4d803b2f-6373-4824-b23d-5a4c6ece36f4", "email": "lojista-teste-insomnia-003@example.com", "email_verified": false, "phone_verified": false}', 'email', '2026-07-10 14:03:19.055524+00', '2026-07-10 14:03:19.055622+00', '2026-07-10 14:03:19.055622+00', DEFAULT, '98de822a-011a-4a41-a3ff-2fb80ad5db1c');


--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profiles VALUES ('dbdd50d2-2667-4f87-8fd5-246b27ed78aa', 'Outro Lojista', '11944444444', '2026-07-06 01:34:55.249308+00', '2026-07-06 01:34:55.249308+00', '69615818542');
INSERT INTO public.profiles VALUES ('d215176c-2c87-4834-9b15-53271fad45e5', 'Outro Lojista', '11944444444', '2026-07-07 22:07:01.428045+00', '2026-07-07 22:07:01.428045+00', '11242908935');
INSERT INTO public.profiles VALUES ('293980f4-a883-414e-aa71-9e8131230bac', 'teste345', '1134290443', '2026-07-09 12:38:43.912258+00', '2026-07-09 12:38:43.912258+00', '59794076422');
INSERT INTO public.profiles VALUES ('4d803b2f-6373-4824-b23d-5a4c6ece36f4', 'lojista-teste-insomnia-003@example.com', '2290920909', '2026-07-10 14:03:19.149588+00', '2026-07-10 14:03:19.149588+00', '95627296488');
INSERT INTO public.profiles VALUES ('c6e96b77-b615-4c40-aadf-8ca9c290554d', 'Lojista Teste Insomnia', '11999990000', '2026-07-06 00:50:41.715105+00', '2026-07-06 00:50:41.715105+00', '52998224725');
INSERT INTO public.profiles VALUES ('90a194d0-808c-4906-b48a-8ea10f007972', 'Outro Lojista', '11944444444', '2026-07-06 01:23:47.673934+00', '2026-07-06 01:23:47.673934+00', '49867807197');
INSERT INTO public.profiles VALUES ('9c230d41-afc9-4a35-af21-d6a2fb267d26', 'Outro Lojista', '11944444444', '2026-07-06 01:26:25.156263+00', '2026-07-06 01:26:25.156263+00', '71825749779');
INSERT INTO public.profiles VALUES ('5fa0a92c-f2cb-446d-88d1-a8cbd74ee71a', 'Outro Lojista', '11944444444', '2026-07-04 19:48:42.719387+00', '2026-07-04 19:48:42.719387+00', '45476457445');
INSERT INTO public.profiles VALUES ('a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', 'Outro Lojista', '11944444444', '2026-07-04 19:49:58.09433+00', '2026-07-04 19:49:58.09433+00', '22721852906');
INSERT INTO public.profiles VALUES ('ad9666c6-573a-4ced-9fde-8cda902a9a4b', 'Outro Lojista', '11944444444', '2026-07-04 19:53:22.365594+00', '2026-07-04 19:53:22.365594+00', '31610176685');
INSERT INTO public.profiles VALUES ('c3d0827a-7b3a-4e41-8842-cb1b819de1f4', 'Outro Lojista', '11944444444', '2026-07-04 19:53:58.245394+00', '2026-07-04 19:53:58.245394+00', '46747851544');
INSERT INTO public.profiles VALUES ('d01ceec8-066a-4073-a7a0-d74fd5118ce9', 'Outro Lojista', '11944444444', '2026-07-04 19:55:04.8935+00', '2026-07-04 19:55:04.8935+00', '60006520979');


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tenants VALUES ('dbdd50d2-2667-4f87-8fd5-246b27ed78aa', 'active', '34814451000184', 524288000, NULL, '2026-07-06 01:34:55.604+00', '2026-07-06 01:34:55.604+00');
INSERT INTO public.tenants VALUES ('d215176c-2c87-4834-9b15-53271fad45e5', 'active', '74577487000106', 524288000, NULL, '2026-07-07 22:07:01.877+00', '2026-07-07 22:07:01.877+00');
INSERT INTO public.tenants VALUES ('a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', 'active', '88939952000116', 524288000, NULL, '2026-07-04 19:49:58.49+00', '2026-07-04 19:49:58.49+00');
INSERT INTO public.tenants VALUES ('ad9666c6-573a-4ced-9fde-8cda902a9a4b', 'active', '84626332000176', 524288000, NULL, '2026-07-04 19:53:22.77+00', '2026-07-04 19:53:22.77+00');
INSERT INTO public.tenants VALUES ('c3d0827a-7b3a-4e41-8842-cb1b819de1f4', 'active', '59101731000176', 524288000, NULL, '2026-07-04 19:53:58.656+00', '2026-07-04 19:53:58.656+00');
INSERT INTO public.tenants VALUES ('d01ceec8-066a-4073-a7a0-d74fd5118ce9', 'active', '59436976000154', 524288000, NULL, '2026-07-04 19:55:05.309+00', '2026-07-04 19:55:05.309+00');
INSERT INTO public.tenants VALUES ('c6e96b77-b615-4c40-aadf-8ca9c290554d', 'active', '33683111000107', 524288000, NULL, '2026-07-06 01:13:53.517+00', '2026-07-06 01:13:53.517+00');
INSERT INTO public.tenants VALUES ('90a194d0-808c-4906-b48a-8ea10f007972', 'active', '14308754000118', 524288000, NULL, '2026-07-06 01:23:48.006+00', '2026-07-06 01:23:48.006+00');
INSERT INTO public.tenants VALUES ('9c230d41-afc9-4a35-af21-d6a2fb267d26', 'active', '28736600000131', 524288000, NULL, '2026-07-06 01:26:25.507+00', '2026-07-06 01:26:25.507+00');


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.stores (
    id,
    tenant_id,
    slug,
    store_name,
    horario_abertura,
    horario_fechamento,
    endereco,
    city,
    state,
    descricao,
    logo_url,
    whatsapp_number,
    active,
    deleted_at,
    created_at,
    updated_at
) VALUES (
    '386787d1-1f67-489f-bd04-24361c5039cf',
    '90a194d0-808c-4906-b48a-8ea10f007972',
    'loja-teste-1783301025337',
    'Conflito de Slug',
    '08:00:00',
    '18:00:00',
    'Rua Conflito',
    'Sao Paulo',
    'SP',
    NULL,
    NULL,
    '11999990005',
    true,
    NULL,
    '2026-07-06 01:23:48.124+00',
    '2026-07-06 01:23:48.124+00'
);
INSERT INTO public.stores (
    id,
    tenant_id,
    slug,
    store_name,
    horario_abertura,
    horario_fechamento,
    endereco,
    city,
    state,
    descricao,
    logo_url,
    whatsapp_number,
    active,
    deleted_at,
    created_at,
    updated_at
) VALUES (
    'c18cfb14-897c-4d3b-8dd5-90218b6ad21d',
    'c6e96b77-b615-4c40-aadf-8ca9c290554d',
    'loja-teste-insomnia-001',
    'Loja Teste Insomnia Atualizada',
    '09:00:00',
    '19:00:00',
    'Rua Teste Atualizada, 200',
    'Teresina',
    'PI',
    'Loja atualizada via Insomnia',
    NULL,
    '11999990001',
    true,
    NULL,
    '2026-07-06 01:16:05.074+00',
    '2026-07-06 02:05:20.143724+00'
);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES ('d61e6f80-f025-410b-a003-0bf91cd1c8dd', 'c18cfb14-897c-4d3b-8dd5-90218b6ad21d', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', 'Todos', NULL, 0, NULL, '2026-07-06 01:16:05.092+00', '2026-07-06 01:16:05.092+00');
INSERT INTO public.categories VALUES ('293b657d-1152-4d6b-93e0-99d2cdc3ebf3', '386787d1-1f67-489f-bd04-24361c5039cf', '90a194d0-808c-4906-b48a-8ea10f007972', 'Todos', NULL, 0, NULL, '2026-07-06 01:23:48.136+00', '2026-07-06 01:23:48.136+00');
INSERT INTO public.categories VALUES ('6ea88509-0c2e-4afb-a8b4-8ef2d5e17ce0', 'c18cfb14-897c-4d3b-8dd5-90218b6ad21d', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', 'Burgers', 'Lanches artesanais', 1, NULL, '2026-07-08 00:11:08.752+00', '2026-07-08 00:11:08.752+00');


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES ('4101b02f-247e-4af3-a83f-89ebbd6dca75', 'c18cfb14-897c-4d3b-8dd5-90218b6ad21d', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', 'd61e6f80-f025-410b-a003-0bf91cd1c8dd', 'X-Burguer Insomnia', 'Pao, carne, queijo e molho da casa', 3500, 2990, NULL, '{"serve": "1 pessoa", "contains": ["gluten", "lactose"]}', true, NULL, '2026-07-06 02:03:02.902+00', '2026-07-06 02:03:02.902+00');
INSERT INTO public.products VALUES ('0e001ca5-b4e0-47c8-a412-f4634a3f4356', 'c18cfb14-897c-4d3b-8dd5-90218b6ad21d', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', '6ea88509-0c2e-4afb-a8b4-8ef2d5e17ce0', 'X-Burguer Insomnia', 'Pao, carne, queijo e molho da casa', 3500, 2990, NULL, '{"serve": "1 pessoa", "contains": ["gluten", "lactose"]}', true, NULL, '2026-07-08 00:12:15.748+00', '2026-07-08 00:12:15.748+00');


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: product_variations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_variations VALUES ('c1e9dc27-3607-428e-ba59-dbf2826916f4', '0e001ca5-b4e0-47c8-a412-f4634a3f4356', 'Tamanho', 0, '2026-07-08 00:13:23.309+00');


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subscriptions VALUES ('c877480f-13b7-4f19-ac82-85d924ea940e', 'dbdd50d2-2667-4f87-8fd5-246b27ed78aa', NULL, 'active', NULL, '2026-07-06 01:34:55.615+00', '2026-08-05 01:34:55.615+00', '2026-07-06 01:34:55.615+00', '2026-07-06 01:34:55.615+00');
INSERT INTO public.subscriptions VALUES ('7c1b38c9-5ffb-4a12-ba8a-9524e9508eb3', 'd215176c-2c87-4834-9b15-53271fad45e5', NULL, 'active', NULL, '2026-07-07 22:07:01.892+00', '2026-08-06 22:07:01.892+00', '2026-07-07 22:07:01.892+00', '2026-07-07 22:07:01.892+00');
INSERT INTO public.subscriptions VALUES ('d17fe640-acf5-4aba-b2f5-4985f9d76930', 'a492e0f4-3e58-437a-bc4a-3a028a6c0fdf', NULL, 'active', NULL, '2026-07-04 19:49:58.502+00', '2026-08-03 19:49:58.502+00', '2026-07-04 19:49:58.502+00', '2026-07-04 19:49:58.502+00');
INSERT INTO public.subscriptions VALUES ('115dda78-3c55-47bb-ba43-3f3aefa60971', 'ad9666c6-573a-4ced-9fde-8cda902a9a4b', NULL, 'active', NULL, '2026-07-04 19:53:22.782+00', '2026-08-03 19:53:22.782+00', '2026-07-04 19:53:22.782+00', '2026-07-04 19:53:22.782+00');
INSERT INTO public.subscriptions VALUES ('466cc0a7-4845-4176-bd5d-d4da994b0145', 'c3d0827a-7b3a-4e41-8842-cb1b819de1f4', NULL, 'active', NULL, '2026-07-04 19:53:58.668+00', '2026-08-03 19:53:58.668+00', '2026-07-04 19:53:58.668+00', '2026-07-04 19:53:58.668+00');
INSERT INTO public.subscriptions VALUES ('2805207f-7ae1-4cd4-8786-65570658aff4', 'd01ceec8-066a-4073-a7a0-d74fd5118ce9', NULL, 'active', NULL, '2026-07-04 19:55:05.322+00', '2026-08-03 19:55:05.322+00', '2026-07-04 19:55:05.322+00', '2026-07-04 19:55:05.322+00');
INSERT INTO public.subscriptions VALUES ('72af29b4-00fc-46a3-8419-38596af39caa', 'c6e96b77-b615-4c40-aadf-8ca9c290554d', NULL, 'active', NULL, '2026-07-06 01:13:53.535+00', '2026-08-05 01:13:53.535+00', '2026-07-06 01:13:53.535+00', '2026-07-06 01:13:53.535+00');
INSERT INTO public.subscriptions VALUES ('b121accd-2a6f-4346-ad31-dbe80b32d15c', '90a194d0-808c-4906-b48a-8ea10f007972', NULL, 'active', NULL, '2026-07-06 01:23:48.017+00', '2026-08-05 01:23:48.017+00', '2026-07-06 01:23:48.017+00', '2026-07-06 01:23:48.017+00');
INSERT INTO public.subscriptions VALUES ('5af8fe3c-96a9-4032-ab1f-98266dc53a18', '9c230d41-afc9-4a35-af21-d6a2fb267d26', NULL, 'active', NULL, '2026-07-06 01:26:25.519+00', '2026-08-05 01:26:25.519+00', '2026-07-06 01:26:25.519+00', '2026-07-06 01:26:25.519+00');


--
-- Data for Name: variation_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.variation_options VALUES ('b883eae5-c0ec-4649-83ed-45e15db4bc97', 'c1e9dc27-3607-428e-ba59-dbf2826916f4', 'Médio', 500, 0, '2026-07-08 00:14:50.986+00');
INSERT INTO public.variation_options VALUES ('fffe3188-ca16-46f1-9c3d-49446e0285d3', 'c1e9dc27-3607-428e-ba59-dbf2826916f4', 'Pequeno', 250, 0, '2026-07-08 00:15:05.464+00');


--
-- PostgreSQL database dump complete
--

