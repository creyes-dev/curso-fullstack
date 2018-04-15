-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 14, 2018 at 08:42 AM
-- Server version: 5.5.52-0+deb8u1
-- PHP Version: 5.6.33-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jqueryfinal`
--

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE IF NOT EXISTS `imagenes` (
`id_imagen` int(11) NOT NULL,
  `id_propiedad` int(11) NOT NULL,
  `ruta_imagen` varchar(100) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `imagenes`
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

-- --------------------------------------------------------

--
-- Table structure for table `propiedad`
--

CREATE TABLE IF NOT EXISTS `propiedad` (
`id` int(11) NOT NULL,
  `calle_altura` varchar(200) NOT NULL,
  `barrio` varchar(200) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `descripcion_corta` varchar(200) NOT NULL,
  `valor` double NOT NULL,
  `entre_calles` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propiedad`
--

INSERT INTO `propiedad` (`id`, `calle_altura`, `barrio`, `descripcion`, `descripcion_corta`, `valor`, `entre_calles`) VALUES
(1, 'calle 200', 'barrio1', '3 ambientes, frente a la plaza', 'es normal', 3200, ''),
(2, 'Av Callao 210', 'Monserrat', 'Apartamento de 3 ambientes', 'Espacioso', 30122234.21, 'Calle 1 y Calle 2'),
(3, 'Warnes 291', 'Villa Crespo', 'Es un departamento viejo pero está en buen estado', 'Frente a la YPF', 2134421.82, 'Av. Acoyte y Padilla');

-- --------------------------------------------------------

--
-- Table structure for table `prueba`
--

CREATE TABLE IF NOT EXISTS `prueba` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prueba`
--

INSERT INTO `prueba` (`id`) VALUES
(3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `imagenes`
--
ALTER TABLE `imagenes`
 ADD PRIMARY KEY (`id_imagen`), ADD KEY `id_propiedad` (`id_propiedad`);

--
-- Indexes for table `propiedad`
--
ALTER TABLE `propiedad`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `id` (`id`), ADD KEY `id_2` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `imagenes`
--
ALTER TABLE `imagenes`
MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `propiedad`
--
ALTER TABLE `propiedad`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
