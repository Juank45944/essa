-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 04-10-2017 a las 05:27:42
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Suspensión', NULL),
(2, 'Reconexión', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos_usuario`
--

CREATE TABLE IF NOT EXISTS `cursos_usuario` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_curso` int(11) NOT NULL,
  `finalizado` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursos_usuario`
--

INSERT INTO `cursos_usuario` (`id`, `fk_usuario`, `fk_curso`, `finalizado`) VALUES
(1, 1, 1, 0),
(2, 2, 2, 0),
(3, 1, 2, 0),
(4, 3, 1, 0),
(5, 4, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_curso`
--

CREATE TABLE IF NOT EXISTS `progreso_curso` (
  `id` int(11) NOT NULL,
  `fk_curso_usuario` int(11) NOT NULL,
  `etapa_finalizada` int(11) NOT NULL,
  `fecha_finalizacion` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `progreso_curso`
--

INSERT INTO `progreso_curso` (`id`, `fk_curso_usuario`, `etapa_finalizada`, `fecha_finalizacion`) VALUES
(1, 4, 1, '2017-10-09 15:29:19'),
(2, 3, 4, '2017-10-03 07:23:13'),
(3, 1, 0, '0000-00-00 00:00:00'),
(4, 2, 5, '2017-09-16 10:00:00'),
(5, 5, 2, '2017-10-01 16:42:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL,
  `cedula` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `pwd` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `genero` enum('M','F') COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `cedula`, `nombre`, `email`, `pwd`, `genero`) VALUES
(1, '1234', 'Test', 'test@mail.com', '1234', 'M'),
(2, '1053838757', 'Juan Camilo Cardona', 'juanc.cardona@umanizales.edu.co', '1234', 'M'),
(3, '1234567890', 'Lina Eme', 'lina@mail.com', '1234', 'F'),
(4, '0987654321', 'Ana María Gómez', 'ana@maria.com', '1234', 'F'),
(5, '1122334455', 'Administrador', 'juanc.cardona@mail.com', '1122334455', 'M'),
(6, '123098', 'Ramon Perez', 'ramon@mail.com', '1234', 'M'),
(7, '123789', 'Pablo Jimenez', 'pablo@mail.com', '1234', 'M'),
(9, '876345', 'Maria Roman', 'maria@mail.com', '1234', 'F'),
(10, '1827365', 'Pedro Lopez', 'pedro@mail.com', '1234', 'M');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cursos_usuario`
--
ALTER TABLE `cursos_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `progreso_curso`
--
ALTER TABLE `progreso_curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
