-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-04-2018 a las 01:33:54
-- Versión del servidor: 5.7.19
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jqueryfinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
CREATE TABLE IF NOT EXISTS `imagenes` (
  `id_imagen` int(11) NOT NULL AUTO_INCREMENT,
  `id_propiedad` int(11) DEFAULT NULL,
  `ruta_imagen` varchar(100) NOT NULL,
  `orden` int(11) NOT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `id_propiedad` (`id_propiedad`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `id_propiedad`, `ruta_imagen`, `orden`) VALUES
(26, NULL, 'includes/photos/01d0cc9d8d353c6f19148b27506d7193.jpg', 1),
(27, NULL, 'includes/photos/I3X8LI340553-02.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedad`
--

DROP TABLE IF EXISTS `propiedad`;
CREATE TABLE IF NOT EXISTS `propiedad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle_altura` varchar(200) NOT NULL,
  `barrio` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `descripcion_corta` varchar(200) NOT NULL,
  `valor` double NOT NULL,
  `entre_calles` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `propiedad`
--

INSERT INTO `propiedad` (`id`, `calle_altura`, `barrio`, `descripcion`, `descripcion_corta`, `valor`, `entre_calles`) VALUES
(1, 'calle 200', 'barrio1', '3 ambientes, frente a la plaza', 'es normal', 3200, ''),
(2, 'Av Callao 210', 'Monserrat', 'Apartamento de 3 ambientes', 'Espacioso', 30122234.21, 'Calle 1 y Calle 2'),
(3, 'Warnes 291', 'Villa Crespo', 'Es un departamento viejo pero está en buen estado', 'Frente a la YPF', 2134421.82, 'Av. Acoyte y Padilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

DROP TABLE IF EXISTS `prueba`;
CREATE TABLE IF NOT EXISTS `prueba` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`id`) VALUES
(3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
