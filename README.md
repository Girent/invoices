# invoices
## Для розгортання проєкту потрібно...
Клонувати проєкт, змінити назву файлу example.env на .env, при необхідності в тому ж файлі прописати ваш порт, та можливо рядок підключення до MongoDb <br>
![image](https://user-images.githubusercontent.com/98615658/187085405-a7f2cba4-2cf0-4961-bc40-b14a3bd031e9.png) <br>
```
PORT = 5000
DB = "mongodb://localhost:27017/"
```

### Встановлення залежностей 
Після клонування проєкту відкрийте консоль, у папці проєкту, та пропишіть 
```
npm install
```
Коли залежності встановленні можна запустити проєкт у 2х режимах дев, та прод
```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
```
Для запуску дева використовуйте команду 
```
npm run dev
```
Для запуску прода використовуйте команду 
```
npm run start
```
### Версія Node.js v16.14.1

[Отримати повну інформацію по використанню АПІ](https://documenter.getpostman.com/view/11043215/VUxKT9fk)
![image](https://user-images.githubusercontent.com/98615658/187085033-1a5dcb5f-68b7-497a-a835-a2ecfd5556fc.png)
