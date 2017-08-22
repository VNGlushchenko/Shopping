-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 22 2017 г., 20:13
-- Версия сервера: 5.5.50
-- Версия PHP: 5.3.29

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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

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
(72, 'Автобус Н', 8),
(73, 'Поезд ДЛ', 8),
(74, 'Поезд ЛД', 8),
(75, 'Поезд ЛИФ', 8),
(76, 'Зубочистки', 2),
(77, 'Ксерокопия', 2),
(78, 'Хлебцы', 3),
(79, 'Картина', 9);

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tGoods`
--
ALTER TABLE `tGoods`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=80;
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


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
