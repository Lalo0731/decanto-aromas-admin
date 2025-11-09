-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 10-11-2025 a las 00:13:07
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `perfumes_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes`
--

CREATE TABLE `perfumes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` enum('arabes','disenador','next','nicho') COLLATE utf8mb4_unicode_ci NOT NULL,
  `oldPrice` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `isDecantOnly` tinyint(1) DEFAULT 0,
  `priceDecant` decimal(10,2) DEFAULT NULL,
  `isDecant` tinyint(1) DEFAULT 0,
  `isNew` tinyint(1) DEFAULT 0,
  `available` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfumes`
--

INSERT INTO `perfumes` (`id`, `name`, `description`, `category`, `oldPrice`, `price`, `isDecantOnly`, `priceDecant`, `isDecant`, `isNew`, `available`) VALUES
(42, '“Y” EDP (YVES SAINT LAURENT)', 'Yves Saint Laurent Y de Yves Saint Laurent es una fragancia de la familia olfativa Amaderada Aromática para Hombres. Yves Saint Laurent Y se lanzó en 2017.', 'disenador', '0.00', '0.00', 1, '30.00', 1, 0, 1),
(43, 'LUNA ROSSA CARBON (PRADA)', 'Luna Rossa Carbon de Prada es una fragancia de la familia olfativa Aromática Fougère para Hombres. Luna Rossa Carbon se lanzó en 2017', 'disenador', '0.00', '0.00', 1, '25.00', 1, 0, 1),
(44, 'SPICEBOMB EXTREME (VICTOR & ROLF)', 'Spicebomb Extreme de Viktor&Rolf es una fragancia de la familia olfativa Oriental Especiada para Hombres. Spicebomb Extreme se lanzó en 2015. Spicebomb Extreme fue creada por Carlos Benaïm y Jean-Christophe Hérault.', 'disenador', '0.00', '0.00', 1, '30.00', 1, 0, 1),
(45, 'HAWAS ICE (RASASI)', 'Hawas Ice de Rasasi es una fragancia de la familia olfativa Aromática para Hombres. Esta fragrancia es nueva. Hawas Ice se lanzó en 2023.', 'arabes', '0.00', '0.00', 1, '12.00', 1, 0, 1),
(46, 'CLUB DE NUIT URBAN MAN ELIXIR (ARMAF)', 'Club De Nuit Urban Elixir de Armaf es una fragancia de la familia olfativa para Hombres. Esta fragrancia es nueva. Club De Nuit Urban Elixir se lanzó en 2022.', 'arabes', '0.00', '0.00', 1, '12.00', 1, 0, 1),
(47, 'ASAD (LATTAFA)', 'Asad de Lattafa Perfumes es una fragancia de la familia olfativa Oriental para Hombres. Asad se lanzó en 2021.', 'arabes', '0.00', '0.00', 1, '12.00', 1, 0, 1),
(48, 'Prada luna rossa ocean edp', 'Luna Rossa Ocean Eau de Parfum de Prada es una fragancia de la familia olfativa Oriental Amaderada para Hombres. Esta fragrancia es nueva. Luna Rossa Ocean Eau de Parfum se lanzó en 2023. Luna Rossa Ocean Eau de Parfum fue creada por Anne Flipo y Carlos Benaïm.', 'disenador', '3600.00', '2700.00', 0, NULL, 0, 0, 1),
(49, 'N0.4 APRES L’AMOUR (THOMAS KOSMALA)', 'Après l’Amour de Thomas Kosmala es una fragancia de la familia olfativa Amaderada Aromática para Hombres y Mujeres. Après l’Amour se lanzó en 2018.', 'nicho', '0.00', '0.00', 1, '35.00', 1, 0, 0),
(50, 'FAN YOUR FLAMES (NISHANE)', 'Fan Your Flames de Nishane es una fragancia de la familia olfativa para Hombres y Mujeres. Fan Your Flames se lanzó en 2016.', 'nicho', '0.00', '0.00', 1, '75.00', 1, 0, 1),
(51, 'BOIS IMPERIAL (ESSENTIAL PARFUMS)', 'Bois Impérial de Essential Parfums es una fragancia de la familia olfativa Aromática para Hombres y Mujeres. Bois Impérial se lanzó en 2020.', 'nicho', '0.00', '0.00', 1, '30.00', 1, 0, 1),
(52, 'Dubai Citrine Unisex de Bond No 9', 'Dubai Citrine de Bond No 9 es una fragancia de la familia olfativa Almizcle Amaderado Floral para Hombres y Mujeres. Dubai Citrine se lanzó en 2016', 'next', NULL, '7099.00', 0, NULL, 0, 1, 1),
(53, 'Armaf Odyssey Mandarin Sky Eau de Parfum Spray for Men', 'Odyssey Mandarin Sky de Armaf es una fragancia de la familia olfativa para Hombres. Esta fragrancia es nueva. Odyssey Mandarin Sky se lanzó en 2023', 'arabes', '650.00', '650.00', 0, NULL, 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes_accords`
--

CREATE TABLE `perfumes_accords` (
  `id` int(11) NOT NULL,
  `perfume_id` int(11) DEFAULT NULL,
  `accord` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfumes_accords`
--

INSERT INTO `perfumes_accords` (`id`, `perfume_id`, `accord`) VALUES
(438, 42, 'Manzana verde'),
(439, 42, 'jengibre'),
(440, 42, 'salvia'),
(441, 42, 'bayas de henebro'),
(442, 42, 'habatonka'),
(443, 43, 'Bergamota'),
(444, 43, 'lavanda'),
(445, 43, 'pimienta'),
(446, 43, 'carbón'),
(447, 43, 'ambroxán'),
(448, 44, 'Whiskey bourbon'),
(449, 44, 'tabaco'),
(450, 44, 'especias'),
(451, 44, 'vainilla'),
(452, 45, 'Manzana'),
(453, 45, 'anís'),
(454, 45, 'ciruela'),
(455, 45, 'ámbar'),
(456, 45, 'maderas'),
(457, 46, 'Bergamota'),
(458, 46, 'pimienta rosa'),
(459, 46, 'lavanda'),
(460, 46, 'ambroxán'),
(461, 46, 'cedro'),
(462, 47, 'Pimienta negra'),
(463, 47, 'tabaco'),
(464, 47, 'pachulí'),
(465, 47, 'madera seca'),
(466, 47, 'vainilla'),
(467, 48, 'Ámbar'),
(468, 48, 'amaderado'),
(469, 48, 'avainillado'),
(470, 48, 'cítrico'),
(471, 48, 'balsámico'),
(472, 48, 'atalcado'),
(473, 49, 'Entusiasmo de limón'),
(474, 49, 'flor de azahar de naranjo amargo'),
(475, 49, 'almizcle'),
(476, 49, 'ámbar'),
(477, 49, 'notas amaderadas'),
(478, 50, 'Coco'),
(479, 50, 'ron'),
(480, 50, 'tabaco'),
(481, 50, 'habatonka'),
(482, 50, 'cedro de china'),
(483, 50, 'musgo de roble'),
(484, 51, 'Hojas de albahaca tailandesa'),
(485, 51, 'de Timut de Nepal'),
(486, 51, 'vétiver haitiano'),
(487, 51, 'pachulí indonesio'),
(488, 51, 'akigalawood'),
(489, 52, 'aromático'),
(490, 52, 'cítrico'),
(491, 52, 'amaderado'),
(492, 52, 'dulce'),
(493, 52, 'afrutados'),
(494, 53, 'cítrico'),
(495, 53, 'caramelo'),
(496, 53, 'dulce'),
(497, 53, 'ámbar'),
(498, 53, 'avainillado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes_images`
--

CREATE TABLE `perfumes_images` (
  `id` int(11) NOT NULL,
  `perfume_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfumes_images`
--

INSERT INTO `perfumes_images` (`id`, `perfume_id`, `image_url`) VALUES
(73, 42, '1760240979023-153492592.avif'),
(74, 42, '1760240979026-870271616.webp'),
(75, 42, '1760240979026-36422007.jpg'),
(76, 43, '1760241318481-145529383.jpg'),
(77, 43, '1760241318484-493081370.jpg'),
(78, 43, '1760241318497-835316486.jpg'),
(79, 44, '1760241656464-748046765.jpg'),
(80, 44, '1760241656464-520683639.webp'),
(81, 44, '1760241656465-315316488.png'),
(82, 45, '1760242230542-276804039.avif'),
(83, 45, '1760242230543-114997273.webp'),
(84, 45, '1760242230544-387800124.webp'),
(85, 46, '1760242839210-550315493.jpg'),
(86, 46, '1760242839210-868933462.webp'),
(87, 46, '1760242839211-668062088.webp'),
(88, 47, '1760243236262-628014902.webp'),
(89, 47, '1760243236262-493982608.webp'),
(90, 47, '1760243236263-548867979.jpg'),
(91, 48, '1760244067267-682857318.avif'),
(92, 48, '1760244067270-69218576.webp'),
(93, 48, '1760244067267-752544270.jpg'),
(94, 49, '1760284452486-480770173.webp'),
(95, 49, '1760284452494-718153782.webp'),
(96, 49, '1760284452495-516839776.jpeg'),
(97, 50, '1760286123255-13530754.webp'),
(98, 50, '1760286123256-751833114.webp'),
(99, 50, '1760286123261-657596877.jpeg'),
(100, 51, '1760286706462-375194077.avif'),
(101, 51, '1760286706463-351812312.jpg'),
(102, 51, '1760286706466-540379964.jpg'),
(103, 52, '1760287150783-492074094.webp'),
(104, 52, '1760287150784-296105353.webp'),
(105, 52, '1760287150785-906116345.webp'),
(106, 53, '1760287680815-945083066.jpg'),
(107, 53, '1760287680816-976505153.webp'),
(108, 53, '1760287680817-166762368.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes_special_for`
--

CREATE TABLE `perfumes_special_for` (
  `id` int(11) NOT NULL,
  `perfume_id` int(11) DEFAULT NULL,
  `context` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfumes_special_for`
--

INSERT INTO `perfumes_special_for` (`id`, `perfume_id`, `context`) VALUES
(220, 42, 'Primavera'),
(221, 42, 'verano'),
(222, 42, 'día'),
(223, 42, 'otoño'),
(224, 43, 'Primavera'),
(225, 43, 'verano'),
(226, 43, 'otoño'),
(227, 43, 'día'),
(228, 43, 'noche'),
(229, 44, 'Otoño'),
(230, 44, 'invierno'),
(231, 44, 'noche'),
(232, 45, 'Primavera'),
(233, 45, 'verano'),
(234, 45, 'día'),
(235, 45, 'noche'),
(236, 46, 'Primavera'),
(237, 46, 'verano'),
(238, 46, 'otoño'),
(239, 46, 'día'),
(240, 46, 'noche'),
(241, 46, 'invierno'),
(242, 47, 'Otoño'),
(243, 47, 'noche'),
(244, 47, 'invierno'),
(245, 47, 'día'),
(246, 48, 'Primavera'),
(247, 48, 'verano'),
(248, 48, 'invierno'),
(249, 48, 'otoño'),
(250, 48, 'día'),
(251, 48, 'noche'),
(252, 49, 'Otoño'),
(253, 49, 'invierno'),
(254, 49, 'noche'),
(255, 49, 'primavera'),
(256, 49, 'verano'),
(257, 49, 'día'),
(258, 50, 'Otoño'),
(259, 50, 'invierno'),
(260, 50, 'noche'),
(261, 50, 'primavera'),
(262, 50, 'día'),
(263, 51, 'Primavera'),
(264, 51, 'verano'),
(265, 51, 'día'),
(266, 51, 'otoño'),
(267, 51, 'noche'),
(268, 52, 'Primavera'),
(269, 52, 'verano'),
(270, 52, 'día'),
(271, 53, 'Primavera'),
(272, 53, 'invierno'),
(273, 53, 'otoño'),
(274, 53, 'noche'),
(275, 53, 'día');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfumes_users`
--

CREATE TABLE `perfumes_users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfumes_users`
--

INSERT INTO `perfumes_users` (`id`, `name`, `lastname`, `email`, `password`, `created_at`) VALUES
(1, 'lalo', 'rodriguez', 'lalo01@gmail.com', '$2b$10$HbBM80gdZU53nf5/AahOquoifGr9VMJeCseYbYjyP.xYbLaumz4rK', '2025-10-13 00:58:14'),
(2, 'Marcos', 'De la Cruz', 'marcos07@gmail.com', '$2b$10$HbBM80gdZU53nf5/AahOquoifGr9VMJeCseYbYjyP.xYbLaumz4rK', '2025-10-13 01:06:57'),
(6, 'Marcos', 'Santiago', 'decanto@gmail.com', '$2b$10$1GzlyIBSxx8jj191KvRjpOMfxsqFNIuhgjfyyIYf/Lzqywx2OrjjK', '2025-10-26 15:45:55');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `perfumes`
--
ALTER TABLE `perfumes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `perfumes_accords`
--
ALTER TABLE `perfumes_accords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perfume_id` (`perfume_id`);

--
-- Indices de la tabla `perfumes_images`
--
ALTER TABLE `perfumes_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perfume_id` (`perfume_id`);

--
-- Indices de la tabla `perfumes_special_for`
--
ALTER TABLE `perfumes_special_for`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perfume_id` (`perfume_id`);

--
-- Indices de la tabla `perfumes_users`
--
ALTER TABLE `perfumes_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `perfumes`
--
ALTER TABLE `perfumes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `perfumes_accords`
--
ALTER TABLE `perfumes_accords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=499;

--
-- AUTO_INCREMENT de la tabla `perfumes_images`
--
ALTER TABLE `perfumes_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de la tabla `perfumes_special_for`
--
ALTER TABLE `perfumes_special_for`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT de la tabla `perfumes_users`
--
ALTER TABLE `perfumes_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `perfumes_accords`
--
ALTER TABLE `perfumes_accords`
  ADD CONSTRAINT `perfumes_accords_ibfk_1` FOREIGN KEY (`perfume_id`) REFERENCES `perfumes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfumes_images`
--
ALTER TABLE `perfumes_images`
  ADD CONSTRAINT `perfumes_images_ibfk_1` FOREIGN KEY (`perfume_id`) REFERENCES `perfumes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfumes_special_for`
--
ALTER TABLE `perfumes_special_for`
  ADD CONSTRAINT `perfumes_special_for_ibfk_1` FOREIGN KEY (`perfume_id`) REFERENCES `perfumes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
