CREATE DATABASE farmacia_db;
USE farmacia_db;
CREATE TABLE `medicamentos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `costo` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;
INSERT INTO `medicamentos` (`id`, `nombre`, `costo`, `stock`) VALUES
(1, 'paracetamol', 19, 47),
(2, 'ibuprofeno', 39, 34),
(3, 'losartan', 8, 46);
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `medicamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;