-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 11-10-2017 a las 00:00:07
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `essa_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Suspensión', NULL),
(2, 'Reconexión', NULL),
(3, 'Call Center', NULL),
(4, 'Presencial', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos_usuario`
--

CREATE TABLE IF NOT EXISTS `cursos_usuario` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_curso` int(11) NOT NULL,
  `finalizado` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursos_usuario`
--

INSERT INTO `cursos_usuario` (`id`, `fk_usuario`, `fk_curso`, `finalizado`) VALUES
(1, 1, 1, 0),
(2, 2, 2, 0),
(3, 1, 2, 0),
(15, 7, 1, 0),
(16, 9, 1, 0),
(17, 10, 1, 0),
(18, 4, 2, 0),
(19, 6, 2, 0),
(24, 1, 3, 0),
(25, 2, 3, 0),
(26, 4, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_curso`
--

CREATE TABLE IF NOT EXISTS `progreso_curso` (
  `id` int(11) NOT NULL,
  `fk_curso_usuario` int(11) NOT NULL,
  `etapa_finalizada` int(11) NOT NULL,
  `fecha_finalizacion` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `progreso_curso`
--

INSERT INTO `progreso_curso` (`id`, `fk_curso_usuario`, `etapa_finalizada`, `fecha_finalizacion`) VALUES
(1, 4, 1, '2017-10-09 15:29:19'),
(4, 2, 5, '2017-09-16 10:00:00'),
(5, 5, 2, '2017-10-01 16:42:00'),
(6, 14, 0, '0000-00-00 00:00:00'),
(7, 15, 0, '0000-00-00 00:00:00'),
(8, 16, 0, '0000-00-00 00:00:00'),
(9, 17, 0, '2017-10-08 10:43:50'),
(10, 18, 0, '2017-10-08 10:44:49'),
(11, 19, 0, '2017-10-08 10:44:49'),
(13, 3, 1, '2017-10-08 08:53:29'),
(16, 3, 2, '2017-10-08 09:01:48'),
(20, 19, 1, '2017-10-08 09:44:04'),
(21, 1, 0, '2017-10-08 10:58:26'),
(22, 1, 1, '2017-10-08 11:16:59'),
(23, 1, 2, '2017-10-08 11:17:47'),
(25, 1, 3, '2017-10-08 11:36:14'),
(29, 23, 0, '2017-10-09 10:05:22'),
(30, 24, -1, '2017-10-09 10:06:05'),
(33, 3, 5, '2017-10-09 10:45:54'),
(37, 24, 0, '2017-10-09 11:11:05'),
(44, 24, 1, '2017-10-09 11:19:27'),
(71, 1, 4, '2017-10-09 11:55:38'),
(96, 24, 2, '2017-10-10 12:19:24'),
(99, 15, 1, '2017-10-10 04:42:45'),
(104, 15, 2, '2017-10-10 04:44:55'),
(105, 25, -1, '2017-10-10 04:46:58'),
(106, 26, -1, '2017-10-10 04:46:58'),
(107, 25, 0, '2017-10-10 04:48:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL,
  `cedula` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `genero` enum('M','F') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `cedula`, `nombre`, `email`, `genero`) VALUES
(1, '1234', 'Test', 'test@mail.com', 'M'),
(2, '1053838757', 'Juan Camilo Cardona', 'juanc.cardona@umanizales.edu.co', 'M'),
(3, '1234567890', 'Lina Eme', 'lina@mail.com', 'F'),
(4, '0987654321', 'Ana María Gómez', 'ana@maria.com', 'F'),
(5, '1122334455', 'Administrador', 'juanc.cardona@mail.com', 'M'),
(6, '123098', 'Ramon Perez', 'ramon@mail.com', 'M'),
(7, '123789', 'Pablo Jimenez', 'pablo@mail.com', 'M'),
(9, '876345', 'Maria Roman', 'maria@mail.com', 'F'),
(10, '1827365', 'Pedro Lopez', 'pedro@mail.com', 'M');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cursos_usuario`
--
ALTER TABLE `cursos_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `progreso_curso`
--
ALTER TABLE `progreso_curso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_curso_usuario_2` (`fk_curso_usuario`,`etapa_finalizada`),
  ADD KEY `fk_curso_usuario` (`fk_curso_usuario`,`etapa_finalizada`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `cursos_usuario`
--
ALTER TABLE `cursos_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `progreso_curso`
--
ALTER TABLE `progreso_curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=109;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
