# Собираем из образа
FROM node:14.16

# Создаем директорию
RUN mkdir -p /usr/src/app/
# Устанавливаем директорию как рабочую
WORKDIR /usr/src/app/

# Копируем содержимое c хоста
# . - путь, начиная с точки запуска сборки
COPY . /usr/src/app/

# Выполняем команду с аргументами
CMD ["npm", "start"]