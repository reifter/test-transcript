# Install Transcript
Step 1. Creates a build directory with a production build
```sh
$ git clone https://github.com/reifter/test-transcript.git
$ cd test-transcript
$ npm install
$ npm run build
```
Step 2. Install server
```sh
$ cd test-transcript/server
$ npm install
$ cd ../
$ node test-transcript/server/index.js
```
Step 3. Start server
```sh
$ cd test-transcript
$ node test-transcript/server/index.js
```
And open http://localhost:3000/ in your browser.


## Тестовое задание Frontend
Предлагается создать на React интерактивную демо-страницу с функцией караоке
(см. макет). На странице можно воспроизвести аудиозапись с монологом девушки и посмотреть ее текстовую расшифровку — транскрибацию. В транскрибации подсвечивается слово, которое произносится в текущий момент времени. Таким образом, по мере воспроизведения аудио последовательно подсвечиваются все слова, одно за другим.

Аудиозапись и JSON файл со всеми метаданными (включая тайминги начала и конца каждого слова) являются исходными данными и прикреплены к этому заданию.

### Функциональность блока с транскрибацией

- Блок полностью Read Only — ни один из элементов *не* является кликабельным
- В транскрибации в любой момент времени подсвечено *максимум* одно слово, которое попадает на текущий момент воспроизведения плеера
- Если ни одно слово не попадает на текущий момент воспроизведения плеера (например, в момент 0:00), то ничего не подсвечивается
- Подсветка слова остается видимой, даже если плеер на паузе

### Функциональность плеера

- Кнопка Play/Pause меняет внешний вид в зависимости от состояния
- Справа отображается через `/` текущий момент воспроизведения и общая длительность аудиозаписи (см. макет)
- Ползунок воспроизведения можно двигать в режиме паузы, при этом изменяются подсвеченное слово в транскрибации и текущий момент воспроизведения в плеере

### Дополнительные инструкции

- Исходный код решения нужно опубликовать на GitHub
- Обязательно использовать ES6 (без TypeScript) и React, остальные библиотеки и технологии — по выбору
- Рекомендуется применить Redux или MobX
- Верстать по макету, Pixel Perfect необязательно, шрифт Arial; иконки, цвета и размеры элементов нужно соблюдать
- Должна быть возможность собрать готовую страницу с помощью `npm run build`

### Что будет оцениваться

- Главное архитектурное решение — как синхронизируется текущий момент воспроизведения между компонентом плеера и компонентами фраз в блоке транскрибации
- Качество кода, организация файлов, структурирование React-компонентов
- Качество и аккуратность верстки
- Стиль кода, названия переменных/компонентов, следование какому-либо styleguide (например, [airbnb](https://github.com/airbnb/javascript) или [standard](https://standardjs.com/))
- Выбранные библиотеки, а также целесообразность их применения и знание их API
- Настройка инструментов сборки (например, конфигурация webpack, ESLint и т. п.)
- Время работы над задачей

### Макет страницы

<img src="https://github.com/reifter/test-transcript/raw/master/src/static/files/test.png" width="568">

Также доступен .psd макет

### Исходные данные

[audio.wav](https://github.com/reifter/test-transcript/blob/master/src/static/files/audio.wav?raw=true)

[transcript.json](https://raw.githubusercontent.com/reifter/test-transcript/master/src/static/files/transcript.json)

Файл с метаданными **transcript.json** полностью описывает транскрибацию.

Он содержит в себе JSON массив из объектов, каждый из которых содержит информацию по отдельной фразе:

- время начала воспроизведения фразы `timeStart` (в секундах)
- текст фразы `phrase`
- массив `words` со словами и моментами начала и конца воспроизведения каждого отдельного слова в предложении (`timeStart` и `timeEnd`, в секундах)
