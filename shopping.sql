-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 30 2017 г., 18:40
-- Версия сервера: 5.5.50
-- Версия PHP: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shopping`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tGoods`
--

CREATE TABLE IF NOT EXISTS `tGoods` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tGoods`
--

INSERT INTO `tGoods` (`product_id`, `product_name`, `category_id`) VALUES
(1, 'Кулон', 1),
(2, 'Сережки', 1),
(3, 'Биотополь', 2),
(4, 'Бумага для заметок', 2),
(5, 'Вилки однораз.', 2),
(6, 'Крот для труб', 2),
(7, 'Лак для волос', 2),
(8, 'Ластик', 2),
(9, 'Мыло', 2),
(10, 'Пакет', 2),
(11, 'Пакеты-майки', 2),
(12, 'Пакеты-слайдеры', 2),
(13, 'Полотенца бумажные', 2),
(14, 'Салфетка для пола', 2),
(15, 'Салфетки влажные', 2),
(16, 'Салфетки сухие', 2),
(17, 'Скотч', 2),
(18, 'Стаканы пластиковые', 2),
(19, 'Тарелки однораз.', 2),
(20, 'Туалетная бумага', 2),
(21, 'Фольга', 2),
(22, 'Апельсин', 3),
(23, 'Балык', 3),
(24, 'Банан', 3),
(25, 'Батончик', 3),
(26, 'Бразильский орех', 3),
(27, 'Вода', 3),
(28, 'Горчица', 3),
(29, 'Гречка', 3),
(30, 'Жвачка', 3),
(31, 'Капуста', 3),
(32, 'Кетчуп', 3),
(33, 'Клюква', 3),
(34, 'Лайм', 3),
(35, 'Лимон', 3),
(36, 'Майонез', 3),
(37, 'Макароны', 3),
(38, 'Масло растительное', 3),
(39, 'Масло сливочное', 3),
(40, 'Мороженое', 3),
(41, 'Пирожные', 3),
(42, 'Сметана', 3),
(43, 'Смородина замор.', 3),
(44, 'Суши', 3),
(45, 'Сыр', 3),
(46, 'Сырок', 3),
(47, 'Творог', 3),
(48, 'Торт', 3),
(49, 'Хлеб', 3),
(50, 'Хлопья', 3),
(51, 'Яйца', 3),
(69, 'Тушь', 6),
(70, 'Графин', 7),
(71, 'Автобус ИФЛ', 8),
(72, 'Автобус НД', 8),
(73, 'Поезд ДЛ', 8),
(74, 'Поезд ЛД', 8),
(75, 'Поезд ЛИФ', 8),
(76, 'Зубочистки', 2),
(77, 'Ксерокопия', 2),
(78, 'Хлебцы', 3),
(79, 'Картина', 9),
(82, 'Кофе', 3),
(83, 'Чай', 3),
(87, 'Латте', 3),
(88, 'Сок', 3),
(89, 'Мандарин', 3),
(90, 'Сахар', 3),
(91, 'Соль', 3),
(92, 'Сода', 2),
(93, 'Чеснок', 3),
(94, 'Лук', 3),
(98, 'Кефир', 3),
(99, 'Perwoll', 2),
(100, 'Яблоко', 3),
(101, 'Груша', 3),
(103, 'Сухари', 3),
(105, 'Гвозди', 2),
(106, 'Рис', 3),
(107, 'Булгур', 3),
(108, 'Горох', 3),
(109, 'Филе куриное', 3),
(110, 'Марципан', 3),
(111, 'Йогурт', 3),
(112, 'Уксус яблочный', 3),
(116, 'Субстрат для цветов', 2),
(117, 'Удобрение', 2),
(118, 'Подкормка для цветов', 2),
(119, 'Горшок для цветов', 2),
(120, 'Плитка для потолка', 2),
(121, 'Герметик', 2),
(122, 'Перчатки для огорода', 2),
(123, 'Крем', 4),
(124, 'Domestos', 2),
(125, 'Шампунь', 4),
(127, 'Соевый соус', 3),
(128, 'Приправа', 3),
(129, 'Горошек зеленый', 3),
(130, 'Пицца', 3),
(132, 'Скрепки', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `tGoodsCategories`
--

CREATE TABLE IF NOT EXISTS `tGoodsCategories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tGoodsCategories`
--

INSERT INTO `tGoodsCategories` (`category_id`, `category_name`) VALUES
(1, 'Аксессуары'),
(2, 'Дом'),
(3, 'Еда'),
(4, 'Здоровье'),
(5, 'Коммуналка'),
(6, 'Косметика'),
(7, 'Подарки'),
(8, 'Транспорт'),
(9, 'Хобби');

-- --------------------------------------------------------

--
-- Структура таблицы `tPurchases`
--

CREATE TABLE IF NOT EXISTS `tPurchases` (
  `purchase_date` datetime NOT NULL,
  `product_id` int(11) NOT NULL,
  `unit` decimal(10,3) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `sales_receipt_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `timezone_offset` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tPurchases`
--

INSERT INTO `tPurchases` (`purchase_date`, `product_id`, `unit`, `price`, `cost`, `sales_receipt_id`, `timezone_offset`) VALUES
('2017-06-14 12:00:00', 26, '0.100', '500.00', '50.00', '1497441600000', -180),
('2017-06-19 12:00:00', 23, '0.134', '198.19', '26.56', '1497873600000', -180),
('2017-07-12 12:00:00', 35, '0.134', '59.99', '8.04', '1499860800000', -180),
('2017-06-21 12:00:00', 23, '0.142', '230.69', '32.76', '1498046400000', -180),
('2017-06-14 12:00:00', 23, '0.144', '230.69', '33.22', '1497441600000', -180),
('2017-06-12 12:00:00', 34, '0.176', '69.99', '12.32', '1497268800000', -180),
('2017-05-30 12:00:00', 23, '0.182', '198.19', '36.07', '1496145600000', -180),
('2017-07-12 12:00:00', 23, '0.182', '233.70', '42.53', '1499860800000', -180),
('2017-06-14 12:00:00', 33, '0.200', '170.00', '34.00', '1497441600000', -180),
('2017-06-08 12:00:00', 23, '0.204', '139.90', '28.54', '1496923200000', -180),
('2017-07-04 12:00:00', 24, '0.404', '24.99', '10.10', '1499169600000', -180),
('2017-06-11 12:00:00', 24, '0.456', '29.49', '13.45', '1497182400000', -180),
('2017-07-01 12:00:00', 24, '0.708', '30.99', '21.94', '1498910400000', -180),
('2017-05-30 12:00:00', 24, '0.710', '30.99', '22.00', '1496145600000', -180),
('2017-07-01 12:00:00', 2, '1.000', '120.00', '120.00', '1498910400000', -180),
('2017-07-02 12:00:00', 1, '1.000', '140.00', '140.00', '1498996800000', -180),
('2017-05-22 12:00:00', 10, '1.000', '1.99', '1.99', '1495454400000', -180),
('2017-05-29 12:00:00', 10, '1.000', '0.75', '0.75', '1496059200000', -180),
('2017-06-07 12:00:00', 10, '1.000', '1.99', '1.99', '1496836800000', -180),
('2017-06-12 12:00:00', 9, '1.000', '15.59', '15.59', '1497268800000', -180),
('2017-06-14 12:00:00', 10, '1.000', '0.75', '0.75', '1497441600000', -180),
('2017-06-14 12:00:00', 10, '1.000', '0.75', '0.75', '1497441600000', -180),
('2017-06-14 12:00:00', 15, '1.000', '15.90', '15.90', '1497441600000', -180),
('2017-06-14 12:00:00', 16, '1.000', '7.95', '7.95', '1497441600000', -180),
('2017-06-14 12:00:00', 12, '1.000', '29.99', '29.99', '1497441600000', -180),
('2017-06-15 12:00:00', 4, '1.000', '15.95', '15.95', '1497528000000', -180),
('2017-06-15 12:00:00', 17, '1.000', '53.30', '53.30', '1497528000000', -180),
('2017-06-21 12:00:00', 13, '1.000', '24.95', '24.95', '1498046400000', -180),
('2017-06-21 12:00:00', 20, '1.000', '15.90', '15.90', '1498046400000', -180),
('2017-06-21 12:00:00', 15, '1.000', '15.90', '15.90', '1498046400000', -180),
('2017-06-22 12:00:00', 3, '1.000', '81.00', '81.00', '1498132800000', -180),
('2017-06-22 12:00:00', 10, '1.000', '1.99', '1.99', '1498132800000', -180),
('2017-06-22 12:00:00', 21, '1.000', '21.99', '21.99', '1498132800000', -180),
('2017-07-01 12:00:00', 10, '1.000', '1.98', '1.98', '1498910400000', -180),
('2017-07-01 12:00:00', 16, '1.000', '7.40', '7.40', '1498910400000', -180),
('2017-07-07 12:00:00', 8, '1.000', '9.50', '9.50', '1499428800000', -180),
('2017-07-14 12:00:00', 14, '1.000', '17.95', '17.95', '1500033600000', -180),
('2017-07-14 12:00:00', 15, '1.000', '11.90', '11.90', '1500033600000', -180),
('2017-07-17 12:00:00', 14, '1.000', '17.95', '17.95', '1500292800000', -180),
('2017-07-17 12:00:00', 18, '1.000', '9.09', '9.09', '1500292800000', -180),
('2017-05-17 12:00:00', 44, '1.000', '247.00', '247.00', '1495022400000', -180),
('2017-05-30 12:00:00', 27, '1.000', '8.69', '8.69', '1496145600000', -180),
('2017-05-30 12:00:00', 32, '1.000', '9.69', '9.69', '1496145600000', -180),
('2017-05-30 12:00:00', 49, '1.000', '13.99', '13.99', '1496145600000', -180),
('2017-06-07 12:00:00', 42, '1.000', '11.89', '11.89', '1496836800000', -180),
('2017-06-07 12:00:00', 49, '1.000', '13.99', '13.99', '1496836800000', -180),
('2017-06-08 12:00:00', 56, '1.000', '22.04', '22.04', '1496923200000', -180),
('2017-06-08 12:00:00', 46, '1.000', '10.94', '10.94', '1496923200000', -180),
('2017-06-11 12:00:00', 27, '1.000', '17.79', '17.79', '1497182400000', -180),
('2017-06-11 12:00:00', 49, '1.000', '13.99', '13.99', '1497182400000', -180),
('2017-06-13 12:00:00', 47, '1.000', '32.85', '32.85', '1497355200000', -180),
('2017-06-13 12:00:00', 47, '1.000', '30.80', '30.80', '1497355200000', -180),
('2017-06-14 12:00:00', 42, '1.000', '10.95', '10.95', '1497441600000', -180),
('2017-06-14 12:00:00', 32, '1.000', '11.39', '11.39', '1497441600000', -180),
('2017-06-14 12:00:00', 27, '1.000', '10.89', '10.89', '1497441600000', -180),
('2017-06-14 12:00:00', 49, '1.000', '13.99', '13.99', '1497441600000', -180),
('2017-06-15 12:00:00', 27, '1.000', '22.59', '22.59', '1497528000000', -180),
('2017-06-15 12:00:00', 27, '1.000', '10.89', '10.89', '1497528000000', -180),
('2017-06-15 12:00:00', 27, '1.000', '20.69', '20.69', '1497528000000', -180),
('2017-06-16 12:00:00', 56, '1.000', '22.04', '22.04', '1497614400000', -180),
('2017-06-16 12:00:00', 40, '1.000', '9.99', '9.99', '1497614400000', -180),
('2017-06-17 12:00:00', 27, '1.000', '8.70', '8.70', '1497700800000', -180),
('2017-06-17 12:00:00', 29, '1.000', '25.30', '25.30', '1497700800000', -180),
('2017-06-19 12:00:00', 47, '1.000', '31.94', '31.94', '1497873600000', -180),
('2017-06-19 12:00:00', 49, '1.000', '13.99', '13.99', '1497873600000', -180),
('2017-06-19 12:00:00', 50, '1.000', '32.94', '32.94', '1497873600000', -180),
('2017-06-21 12:00:00', 44, '1.000', '269.00', '269.00', '1498046400000', -180),
('2017-06-21 12:00:00', 27, '1.000', '22.59', '22.59', '1498046400000', -180),
('2017-06-21 12:00:00', 49, '1.000', '13.99', '13.99', '1498046400000', -180),
('2017-06-22 12:00:00', 56, '1.000', '23.65', '23.65', '1498132800000', -180),
('2017-06-22 12:00:00', 45, '1.000', '23.50', '23.50', '1498132800000', -180),
('2017-07-01 12:00:00', 56, '1.000', '12.99', '12.99', '1498910400000', -180),
('2017-07-01 12:00:00', 56, '1.000', '13.65', '13.65', '1498910400000', -180),
('2017-07-01 12:00:00', 49, '1.000', '15.60', '15.60', '1498910400000', -180),
('2017-07-03 12:00:00', 27, '1.000', '9.09', '9.09', '1499083200000', -180),
('2017-07-03 12:00:00', 28, '1.000', '11.19', '11.19', '1499083200000', -180),
('2017-07-03 12:00:00', 50, '1.000', '32.94', '32.94', '1499083200000', -180),
('2017-07-04 12:00:00', 27, '1.000', '8.29', '8.29', '1499169600000', -180),
('2017-07-04 12:00:00', 43, '1.000', '32.97', '32.97', '1499169600000', -180),
('2017-07-04 12:00:00', 49, '1.000', '13.99', '13.99', '1499169600000', -180),
('2017-07-10 12:00:00', 32, '1.000', '11.39', '11.39', '1499688000000', -180),
('2017-07-10 12:00:00', 49, '1.000', '13.99', '13.99', '1499688000000', -180),
('2017-07-11 12:00:00', 41, '1.000', '76.99', '76.99', '1499774400000', -180),
('2017-07-12 12:00:00', 27, '1.000', '22.59', '22.59', '1499860800000', -180),
('2017-07-12 12:00:00', 47, '1.000', '33.34', '33.34', '1499860800000', -180),
('2017-07-12 12:00:00', 49, '1.000', '13.99', '13.99', '1499860800000', -180),
('2017-07-14 12:00:00', 56, '1.000', '21.30', '21.30', '1500033600000', -180),
('2017-07-14 12:00:00', 56, '1.000', '22.04', '22.04', '1500033600000', -180),
('2017-07-14 12:00:00', 51, '1.000', '14.95', '14.95', '1500033600000', -180),
('2017-07-17 12:00:00', 27, '1.000', '22.59', '22.59', '1500292800000', -180),
('2017-07-17 12:00:00', 36, '1.000', '17.60', '17.60', '1500292800000', -180),
('2017-07-17 12:00:00', 38, '1.000', '35.95', '35.95', '1500292800000', -180),
('2017-07-17 12:00:00', 39, '1.000', '36.35', '36.35', '1500292800000', -180),
('2017-07-17 12:00:00', 42, '1.000', '20.65', '20.65', '1500292800000', -180),
('2017-07-17 12:00:00', 49, '1.000', '13.99', '13.99', '1500292800000', -180),
('2017-07-18 12:00:00', 27, '1.000', '20.69', '20.69', '1500379200000', -180),
('2017-07-18 12:00:00', 27, '1.000', '10.89', '10.89', '1500379200000', -180),
('2017-07-18 12:00:00', 56, '1.000', '22.04', '22.04', '1500379200000', -180),
('2017-07-19 12:00:00', 29, '1.000', '25.30', '25.30', '1500465600000', -180),
('2017-07-19 12:00:00', 37, '1.000', '22.50', '22.50', '1500465600000', -180),
('2017-07-19 12:00:00', 37, '1.000', '23.50', '23.50', '1500465600000', -180),
('2017-05-29 12:00:00', 55, '1.000', '21.30', '21.30', '1496059200000', -180),
('2017-07-17 12:00:00', 55, '1.000', '33.30', '33.30', '1500292800000', -180),
('2017-06-21 12:00:00', 7, '1.000', '58.00', '58.00', '1498046400000', -180),
('2017-06-14 12:00:00', 69, '1.000', '221.00', '221.00', '1497441600000', -180),
('2017-07-01 12:00:00', 70, '1.000', '110.00', '110.00', '1498910400000', -180),
('2017-06-07 12:00:00', 31, '1.128', '13.79', '15.56', '1496836800000', -180),
('2017-06-22 12:00:00', 24, '1.192', '27.94', '33.30', '1498132800000', -180),
('2017-05-22 12:00:00', 24, '1.206', '35.99', '43.40', '1495454400000', -180),
('2017-05-22 12:00:00', 22, '1.362', '29.99', '40.85', '1495454400000', -180),
('2017-06-21 12:00:00', 16, '2.000', '19.70', '39.40', '1498046400000', -180),
('2017-06-22 12:00:00', 11, '2.000', '12.30', '24.60', '1498132800000', -180),
('2017-07-14 12:00:00', 16, '2.000', '19.70', '39.40', '1500033600000', -180),
('2017-07-17 12:00:00', 6, '2.000', '4.35', '8.70', '1500292800000', -180),
('2017-05-29 12:00:00', 56, '2.000', '23.65', '47.30', '1496059200000', -180),
('2017-06-07 12:00:00', 25, '2.000', '9.99', '19.98', '1496836800000', -180),
('2017-06-07 12:00:00', 27, '2.000', '8.69', '17.38', '1496836800000', -180),
('2017-06-08 12:00:00', 25, '2.000', '9.99', '19.98', '1496923200000', -180),
('2017-06-14 12:00:00', 56, '2.000', '21.30', '42.60', '1497441600000', -180),
('2017-06-17 12:00:00', 40, '2.000', '6.95', '13.90', '1497700800000', -180),
('2017-06-19 12:00:00', 27, '2.000', '8.99', '17.98', '1497873600000', -180),
('2017-06-19 12:00:00', 56, '2.000', '22.04', '44.08', '1497873600000', -180),
('2017-06-21 12:00:00', 27, '2.000', '8.99', '17.98', '1498046400000', -180),
('2017-06-21 12:00:00', 56, '2.000', '23.65', '47.30', '1498046400000', -180),
('2017-06-22 12:00:00', 49, '2.000', '8.35', '16.70', '1498132800000', -180),
('2017-06-22 12:00:00', 45, '2.000', '24.50', '49.00', '1498132800000', -180),
('2017-07-01 12:00:00', 27, '2.000', '8.10', '16.20', '1498910400000', -180),
('2017-07-04 12:00:00', 27, '2.000', '9.09', '18.18', '1499169600000', -180),
('2017-07-10 12:00:00', 25, '2.000', '9.99', '19.98', '1499688000000', -180),
('2017-07-12 12:00:00', 27, '2.000', '9.34', '18.68', '1499860800000', -180),
('2017-07-17 12:00:00', 56, '2.000', '21.30', '42.60', '1500292800000', -180),
('2017-07-19 12:00:00', 27, '2.000', '9.55', '19.10', '1500465600000', -180),
('2017-07-19 12:00:00', 40, '2.000', '7.75', '15.50', '1500465600000', -180),
('2017-06-08 12:00:00', 72, '2.000', '65.00', '130.00', '1496923200000', -180),
('2017-06-24 12:00:00', 71, '2.000', '90.64', '181.28', '1498305600000', -180),
('2017-07-06 12:00:00', 72, '2.000', '65.00', '130.00', '1499342400000', -180),
('2017-05-22 12:00:00', 48, '2.856', '89.94', '256.87', '1495454400000', -180),
('2017-05-22 12:00:00', 5, '3.000', '4.99', '14.97', '1495454400000', -180),
('2017-06-12 12:00:00', 27, '3.000', '8.69', '26.07', '1497268800000', -180),
('2017-06-22 12:00:00', 27, '3.000', '8.99', '26.97', '1498132800000', -180),
('2017-05-22 12:00:00', 48, '3.168', '94.94', '300.77', '1495454400000', -180),
('2017-05-22 12:00:00', 19, '4.000', '19.49', '77.96', '1495454400000', -180),
('2017-06-14 12:00:00', 15, '4.000', '6.90', '27.60', '1497441600000', -180),
('2017-06-14 12:00:00', 16, '4.000', '2.25', '9.00', '1497441600000', -180),
('2017-06-22 12:00:00', 15, '4.000', '6.90', '27.60', '1498132800000', -180),
('2017-05-29 12:00:00', 40, '4.000', '6.55', '26.20', '1496059200000', -180),
('2017-06-07 12:00:00', 40, '4.000', '7.75', '31.00', '1496836800000', -180),
('2017-06-14 12:00:00', 30, '4.000', '8.50', '34.00', '1497441600000', -180),
('2017-06-14 12:00:00', 40, '4.000', '6.95', '27.80', '1497441600000', -180),
('2017-06-22 12:00:00', 40, '4.000', '7.75', '31.00', '1498132800000', -180),
('2017-07-12 12:00:00', 40, '4.000', '7.75', '31.00', '1499860800000', -180),
('2017-07-14 12:00:00', 27, '4.000', '8.16', '32.64', '1500033600000', -180),
('2017-05-30 12:00:00', 25, '6.000', '9.99', '59.94', '1496145600000', -180),
('2017-07-21 12:00:00', 13, '1.000', '24.95', '24.95', '1500638400000', -180),
('2017-07-21 12:00:00', 20, '1.000', '15.90', '15.90', '1500638400000', -180),
('2017-07-21 12:00:00', 50, '1.000', '32.94', '32.94', '1500638400000', -180),
('2017-07-21 12:00:00', 56, '1.000', '23.95', '23.95', '1500638400000', -180),
('2017-07-21 12:00:00', 72, '1.000', '61.00', '61.00', '1500638400000', -180),
('2017-07-21 12:00:00', 72, '1.000', '65.00', '65.00', '1500638400000', -180),
('2017-07-21 12:00:00', 76, '1.000', '14.90', '14.90', '1500638400000', -180),
('2017-07-21 12:00:00', 77, '10.000', '3.50', '35.00', '1500638400000', -180),
('2017-07-21 12:00:00', 78, '2.000', '9.97', '19.94', '1500638400000', -180),
('2017-07-21 12:00:00', 79, '1.000', '150.00', '150.00', '1500638400000', -180),
('2017-09-13 20:57:29', 22, '1.000', '29.99', '29.99', '1505336549747', -180),
('2017-09-13 21:01:55', 31, '1.000', '13.79', '13.79', '1505336549747', -180),
('2017-09-13 21:02:19', 1, '1.000', '140.00', '140.00', '1505336549747', -180),
('2017-09-07 21:00:00', 10, '1.000', '1.40', '1.40', '1505337118915', -180),
('2017-09-07 21:00:00', 27, '2.000', '9.95', '19.90', '1505337118915', -180),
('2017-09-07 21:00:00', 40, '2.000', '7.95', '15.90', '1505337118915', -180),
('2017-09-12 21:00:00', 109, '0.721', '95.95', '69.18', '1505337394611', -180),
('2017-09-06 21:00:00', 35, '0.230', '44.99', '10.35', '1505337702578', -180),
('2017-09-12 21:00:00', 40, '4.000', '7.95', '31.80', '1505337897059', -180),
('2017-09-12 21:00:00', 25, '1.000', '15.95', '15.95', '1505337897059', -180),
('2017-09-06 21:00:00', 23, '0.188', '230.69', '43.37', '1505338142309', -180),
('2017-09-13 21:28:42', 32, '1.000', '11.14', '11.14', '1505338142309', -180),
('2017-09-08 21:00:00', 27, '1.000', '24.69', '24.69', '1505338281957', -180),
('2017-09-08 21:00:00', 49, '1.000', '14.49', '14.49', '1505338281957', -180),
('2017-09-06 21:00:00', 42, '1.000', '20.65', '20.65', '1505338405045', -180),
('2017-09-06 21:00:00', 47, '1.000', '30.80', '30.80', '1505338405045', -180),
('2017-09-05 21:00:00', 110, '2.000', '34.29', '68.58', '1505338608485', -180),
('2017-09-05 21:00:00', 49, '1.000', '14.49', '14.49', '1505376593756', -180),
('2017-09-05 21:00:00', 111, '2.000', '21.30', '42.60', '1505376859076', -180),
('2017-09-05 21:00:00', 10, '1.000', '0.75', '0.75', '1505376859076', -180),
('2017-09-05 21:00:00', 11, '2.000', '12.30', '24.60', '1505376859076', -180),
('2017-09-05 21:00:00', 44, '1.000', '242.00', '242.00', '1505376906260', -180),
('2017-09-03 21:00:00', 111, '1.000', '21.30', '21.30', '1505377176220', -180),
('2017-09-03 21:00:00', 112, '1.000', '14.95', '14.95', '1505377176220', -180),
('2017-09-03 21:00:00', 49, '1.000', '4.65', '4.65', '1505377176220', -180),
('2017-09-03 21:00:00', 47, '1.000', '30.80', '30.80', '1505377176220', -180),
('2017-09-04 21:00:00', 27, '1.000', '9.94', '9.94', '1505377224403', -180),
('2017-09-04 21:00:00', 27, '1.000', '24.69', '24.69', '1505377224403', -180),
('2017-09-09 21:00:00', 111, '2.000', '26.54', '53.08', '1505377288108', -180),
('2017-09-09 21:00:00', 50, '1.000', '32.94', '32.94', '1505377288108', -180),
('2017-09-08 21:00:00', 113, '1.000', '98.25', '98.25', '1505377325003', -180),
('2017-09-05 21:00:00', 113, '1.000', '98.25', '98.25', '1505377441772', -180),
('2017-09-05 21:00:00', 114, '0.667', '69.90', '46.62', '1505377441772', -180),
('2017-09-05 21:00:00', 10, '1.000', '0.55', '0.55', '1505377441772', -180),
('2017-09-05 21:00:00', 115, '1.000', '12.40', '12.40', '1505377441772', -180),
('2017-09-11 21:00:00', 10, '1.000', '0.99', '0.99', '1505377561068', -180),
('2017-09-11 21:00:00', 49, '1.000', '14.99', '14.99', '1505377561068', -180),
('2017-09-11 21:00:00', 47, '1.000', '34.29', '34.29', '1505377561068', -180),
('2017-09-11 21:00:00', 111, '2.000', '26.54', '53.08', '1505377561068', -180),
('2017-09-09 21:00:00', 68, '1.000', '29.60', '29.60', '1505377601396', -180),
('2017-09-10 21:00:00', 10, '1.000', '1.40', '1.40', '1505377724507', -180),
('2017-09-10 21:00:00', 27, '2.000', '9.95', '19.90', '1505377724507', -180),
('2017-09-10 21:00:00', 14, '1.000', '17.95', '17.95', '1505377724507', -180),
('2017-09-10 21:00:00', 40, '2.000', '7.95', '15.90', '1505377724507', -180),
('2017-09-10 21:00:00', 30, '1.000', '8.90', '8.90', '1505377724507', -180),
('2017-09-02 21:00:00', 27, '3.000', '9.94', '29.82', '1505377815939', -180),
('2017-09-02 21:00:00', 49, '1.000', '14.49', '14.49', '1505377815939', -180),
('2017-08-29 21:00:00', 111, '2.000', '21.30', '42.60', '1505377903428', -180),
('2017-08-29 21:00:00', 40, '4.000', '7.95', '31.80', '1505377903428', -180),
('2017-08-27 21:00:00', 40, '6.000', '7.95', '47.70', '1505377938579', -180),
('2017-08-28 21:00:00', 57, '1.000', '57.90', '57.90', '1505378000173', -180),
('2017-08-28 21:00:00', 57, '1.000', '59.90', '59.90', '1505378000173', -180),
('2017-04-07 21:00:00', 10, '1.000', '2.75', '2.75', '1505378307548', -180),
('2017-04-07 21:00:00', 116, '1.000', '9.00', '9.00', '1505378307548', -180),
('2017-04-07 21:00:00', 116, '1.000', '20.94', '20.94', '1505378307548', -180),
('2017-04-07 21:00:00', 117, '1.000', '16.20', '16.20', '1505378307548', -180),
('2017-04-07 21:00:00', 118, '1.000', '23.60', '23.60', '1505378307548', -180),
('2017-04-07 21:00:00', 119, '1.000', '81.00', '81.00', '1505378307548', -180),
('2017-08-12 21:00:00', 120, '1.000', '36.78', '36.78', '1505381934912', -180),
('2017-08-12 21:00:00', 10, '1.000', '2.00', '2.00', '1505381934912', -180),
('2017-08-12 21:00:00', 119, '2.000', '57.96', '115.92', '1505381934912', -180),
('2017-08-12 21:00:00', 121, '2.000', '115.20', '230.40', '1505381934912', -180),
('2017-08-28 21:00:00', 47, '1.000', '32.79', '32.79', '1505381974628', -180),
('2017-08-24 21:00:00', 122, '1.000', '16.90', '16.90', '1505382015524', -180),
('2017-08-24 21:00:00', 123, '2.000', '21.75', '43.50', '1505382099086', -180),
('2017-08-24 21:00:00', 10, '1.000', '0.99', '0.99', '1505382310452', -180),
('2017-08-24 21:00:00', 124, '1.000', '47.34', '47.34', '1505382310452', -180),
('2017-08-24 21:00:00', 125, '1.000', '53.39', '53.39', '1505382310452', -180),
('2017-08-24 21:00:00', 9, '2.000', '15.59', '31.18', '1505382310452', -180),
('2017-08-17 21:00:00', 6, '1.000', '18.89', '18.89', '1505382380381', -180),
('2017-08-17 21:00:00', 10, '1.000', '0.99', '0.99', '1505382380381', -180),
('2017-08-17 21:00:00', 50, '1.000', '32.94', '32.94', '1505382380381', -180),
('2017-08-07 21:00:00', 111, '2.000', '26.54', '53.08', '1505392897077', -180),
('2017-08-07 21:00:00', 47, '1.000', '32.79', '32.79', '1505392897077', -180),
('2017-08-07 21:00:00', 9, '1.000', '15.59', '15.59', '1505392897077', -180),
('2017-08-07 21:00:00', 49, '1.000', '13.99', '13.99', '1505392897077', -180),
('2017-08-23 21:00:00', 27, '2.000', '9.95', '19.90', '1505392964683', -180),
('2017-08-23 21:00:00', 40, '4.000', '7.95', '31.80', '1505392964683', -180),
('2017-08-17 21:00:00', 10, '1.000', '0.18', '0.18', '1505393120346', -180),
('2017-08-17 21:00:00', 126, '1.000', '49.29', '49.29', '1505393120346', -180),
('2017-08-17 21:00:00', 68, '1.000', '28.15', '28.15', '1505393120346', -180),
('2017-08-23 21:00:00', 109, '0.721', '92.95', '67.02', '1505393819571', -180),
('2017-08-23 21:00:00', 127, '1.000', '20.60', '20.60', '1505393819571', -180),
('2017-08-23 21:00:00', 111, '2.000', '23.65', '47.30', '1505393819571', -180),
('2017-08-23 21:00:00', 128, '1.000', '11.95', '11.95', '1505393819571', -180),
('2017-08-23 21:00:00', 30, '1.000', '8.50', '8.50', '1505393819571', -180),
('2017-08-23 21:00:00', 129, '1.000', '18.80', '18.80', '1505393819571', -180),
('2017-07-31 21:00:00', 40, '4.000', '7.15', '28.60', '1505394041061', -180),
('2017-07-31 21:00:00', 27, '1.000', '9.55', '9.55', '1505394041061', -180),
('2017-08-13 21:00:00', 57, '1.000', '62.00', '62.00', '1505394081219', -180),
('2017-09-17 18:45:57', 111, '2.000', '23.65', '47.30', '1505674010434', -180),
('2017-09-17 18:46:09', 40, '4.000', '7.95', '31.80', '1505674010434', -180),
('2017-09-17 18:52:57', 27, '1.000', '9.94', '9.94', '1505674404523', -180),
('2017-09-17 18:53:16', 27, '1.000', '9.59', '9.59', '1505674404523', -180),
('2017-07-23 21:00:00', 111, '1.000', '22.04', '22.04', '1505674906580', -180),
('2017-07-23 21:00:00', 25, '1.000', '5.24', '5.24', '1505674906580', -180),
('2017-07-23 21:00:00', 25, '1.000', '7.99', '7.99', '1505674906580', -180),
('2017-09-13 21:00:00', 41, '1.000', '57.54', '57.54', '1505675327300', -180),
('2017-09-13 21:00:00', 41, '1.000', '58.79', '58.79', '1505675327300', -180),
('2017-09-13 21:00:00', 43, '1.000', '32.97', '32.97', '1505675327300', -180),
('2017-09-13 21:00:00', 27, '1.000', '9.94', '9.94', '1505675327300', -180),
('2017-09-19 21:00:00', 130, '2.000', '45.90', '91.80', '1505987350467', -180),
('2017-09-19 21:00:00', 45, '1.000', '47.59', '47.59', '1505987350467', -180),
('2017-09-19 21:00:00', 49, '1.000', '14.49', '14.49', '1505987350467', -180),
('2017-09-18 21:00:00', 27, '1.000', '9.24', '9.24', '1505987507627', -180),
('2017-09-18 21:00:00', 25, '1.000', '18.99', '18.99', '1505987507627', -180),
('2017-09-18 21:00:00', 10, '1.000', '1.99', '1.99', '1505987833091', -180),
('2017-09-18 21:00:00', 27, '1.000', '9.94', '9.94', '1505987833091', -180),
('2017-09-18 21:00:00', 27, '1.000', '9.59', '9.59', '1505987833091', -180),
('2017-09-18 21:00:00', 41, '1.000', '52.19', '52.19', '1505987833091', -180),
('2017-08-28 21:00:00', 10, '1.000', '2.20', '2.20', '1505988136797', -180),
('2017-08-28 21:00:00', 13, '1.000', '24.95', '24.95', '1505988136797', -180),
('2017-08-28 21:00:00', 20, '1.000', '15.95', '15.95', '1505988136797', -180),
('2017-08-28 21:00:00', 15, '1.000', '15.90', '15.90', '1505988136797', -180),
('2017-08-28 21:00:00', 16, '2.000', '19.70', '39.40', '1505988136797', -180),
('2017-08-28 21:00:00', 14, '1.000', '17.95', '17.95', '1505988136797', -180),
('2017-09-17 21:00:00', 131, '1.000', '63.00', '63.00', '1505988710299', -180),
('2017-09-17 21:00:00', 57, '1.000', '57.00', '57.00', '1505988710299', -180),
('2017-09-16 21:00:00', 111, '2.000', '23.65', '47.30', '1505988825632', -180),
('2017-09-16 21:00:00', 40, '4.000', '7.95', '31.80', '1505988825632', -180),
('2017-09-17 21:00:00', 77, '1.000', '6.00', '6.00', '1505989114611', -180),
('2017-09-17 21:00:00', 132, '1.000', '8.49', '8.49', '1505992129954', -180),
('2017-09-17 21:00:00', 57, '1.000', '65.45', '65.45', '1505992184778', -180),
('2017-07-23 21:00:00', 111, '1.000', '23.65', '23.65', '1505995679730', -180),
('2017-07-23 21:00:00', 14, '1.000', '17.95', '17.95', '1505995679730', -180),
('2017-07-23 21:00:00', 16, '2.000', '17.70', '35.40', '1505995679730', -180),
('2017-07-23 21:00:00', 15, '2.000', '15.90', '31.80', '1505995679730', -180),
('2017-07-23 21:00:00', 133, '2.000', '22.30', '44.60', '1505995679730', -180),
('2017-07-23 21:00:00', 16, '3.000', '2.25', '6.75', '1505995679730', -180),
('2017-07-23 21:00:00', 15, '3.000', '1.80', '5.40', '1505995679730', -180),
('2017-07-23 21:00:00', 28, '1.000', '12.20', '12.20', '1505995679730', -180),
('2017-07-23 21:00:00', 40, '4.000', '7.75', '31.00', '1505995679730', -180),
('2017-09-25 13:54:46', 134, '1.000', '28.00', '28.00', '1506347699793', -180);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tGoods`
--
ALTER TABLE `tGoods`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `UC_Goods` (`product_id`,`category_id`),
  ADD UNIQUE KEY `product_name` (`product_name`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `tGoodsCategories`
--
ALTER TABLE `tGoodsCategories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name_unique` (`category_name`);

--
-- Индексы таблицы `tPurchases`
--
ALTER TABLE `tPurchases`
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tGoods`
--
ALTER TABLE `tGoods`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=135;
--
-- AUTO_INCREMENT для таблицы `tGoodsCategories`
--
ALTER TABLE `tGoodsCategories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `tGoods`
--
ALTER TABLE `tGoods`
  ADD CONSTRAINT `tgoods_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tGoodsCategories` (`category_id`);

--
-- Ограничения внешнего ключа таблицы `tPurchases`
--
ALTER TABLE `tPurchases`
  ADD CONSTRAINT `tpurchases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tGoods` (`product_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
