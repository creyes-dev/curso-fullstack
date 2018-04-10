-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2015 a las 05:39:35
-- Versión del servidor: 5.6.11
-- Versión de PHP: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `jqueryfinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE IF NOT EXISTS `imagenes` (
  `id_imagen` int(11) NOT NULL AUTO_INCREMENT,
  `id_propiedad` int(11) NOT NULL,
  `ruta_imagen` varchar(100) NOT NULL,
  `orden` int(11) NOT NULL,
  PRIMARY KEY (`id_imagen`),
  KEY `id_propiedad` (`id_propiedad`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `id_propiedad`, `ruta_imagen`, `orden`) VALUES
(2, 1, 'admin/imagenes/gal00502.jpg', 2),
(3, 1, 'admin/imagenes/gal00503.jpg', 1),
(4, 1, 'admin/imagenes/gal00507.jpg', 4),
(5, 1, 'admin/imagenes/gal00506.jpg', 3),
(6, 1, 'admin/imagenes/gal00508.jpg', 5),
(7, 2, 'admin/imagenes/blancoencalada4709.jpg', 1),
(8, 4, 'admin/imagenes/prop0002.jpg', 1),
(9, 5, 'admin/imagenes/altolaguirre2195.jpg', 1),
(11, 3, 'admin/imagenes/Frente.jpeg', 1),
(14, 6, 'admin/imagenes/novedades4.jpg', 1),
(15, 6, 'admin/imagenes/hand shake.jpg', 2),
(16, 6, 'admin/imagenes/novedades1.jpg', 3),
(17, 7, 'admin/imagenes/teclado.jpg', 1);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
