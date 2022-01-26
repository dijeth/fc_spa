## Сборка приложения
### 1. Отредактируйте запуск скрипта `webpack:build` в `package.json`:
```
"webpack:build": "cross-env API={api_url}/api ROOT_ROUTE={base_route}/ webpack --mode production"
```
Пример:
```
"webpack:build": "cross-env API=https://catalog-data.com/api ROOT_ROUTE=/catalog/ webpack --mode production"
```
#### 1.1 замените `{api_url}` на url, реализующий api
#### 1.2 замените `{base_route}` на публичный путь к каталогу, где будет приложение
### 2. npm install
### 3. npm run build
### 4. Скопируйте public/css, public/bundle.js, public/index.html в каталог указанный в п. 1.2
### 5. Скопируйте public/_fonts в корневой каталог сайта

## Рзработка приложения
### 1. Отредактируйте запуск скрипта `webpack:start` в `package.json`:
```
"webpack:start": "cross-env API={api_url}/api ROOT_ROUTE=/ webpack-dev-server"
```
Пример:
```
"webpack:start": "cross-env API={api_url}/api ROOT_ROUTE=/ webpack-dev-server"
```
#### 1.1 замените `{api_url}` на url, реализующий api
### 2. npm install
### 3. npm run webpack:start
### 4. npm run gulp:start
