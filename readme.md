# Проект https://goit.ua/marathon/, продающий лендинг

```
https://goit.ua/marathon/
```

## Особенности:

1. За веткой main данного проекта следит jenkins GO IT и при пушах и пулл реквестах в ветку main, данные автоматически выгружаются на https://goit.ua/marathon/

2. Логика при регистрации юзера построена согласно схеме:

```
https://drive.google.com/file/d/187BBUkBVBf2JIyH8vvF28HlyXG1wyGL4/view?usp=sharing
```

3. Документация нашего API для получения id:

```
   https://github.com/goitacademy/goit-integrations
```

Сервис развернут здесь: https://integrations.goit.global

4. Ссылка на репозиторий лендинга:

```
https://github.com/goitacademy/frontend-marathon-integrated-landing
```

## Настройка автодеплоя с помощью jenkins ветки main нужного репозитория

1. ссылка на скрин 1:
   https://gyazo.com/9de782807ee4af0da2503898d30e486c

ссылка в Payload url:

````

http://jenkins.goit.ua/github-webhook/

```

2. ссылка на скрин 2:
   https://gyazo.com/e7cf858605021e9728d865910f3b8d8e

3. В коллаборацию репозитория добавлен github аккаунт - goitProjects
```
````

## Каждый раз при необходимости поменять product_id или url_hash

1.  В редакторе кода Visual studio code (или любом другом) открываем папку склонированного проекта у себя на компьютере:

```
https://github.com/goitacademy/frontend-marathon-integrated-landing
```

2. Открываем консоль, забираем крайние изменения с github (вы должны находиться в ветке git'а - main, проверяем это):

```
git pull
```

3. В редакторе кода открываем у себя файл в папке js с названием variables.js
   https://gyazo.com/49b8d8ba461a245a90007d8775b5aab3

4. Изменяем содержимое внутри двойных кавычек

```js
export default {
  product_id: "тут пишите нужное вам значение",
  url_hash: "тут пишите нужное вам значение",
};
```

5. Последовательно выполняем три комманды в консоле, и через 1-2 минуты проверяем сайт goit.ua/marathon ваши изменения вступят в силу:

```
git add .

git commit -m "Change variables"

git push origin main
```
