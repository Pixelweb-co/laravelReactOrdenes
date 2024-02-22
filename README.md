<h1>Prueba tecnica php pgsql</h1>

Para instalar :

en la carpeta raiz ejecutar

 composer install

 para la conexion a la db ir al achivo .env
 setear 
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=facturacion
DB_USERNAME=root
DB_PASSWORD=root1234

luego
php artisan make migrations

con  esto queda el backend instalado

para correr el backend

php artisan serve

acceder a la api en http//:locahost:8000

________________________________________________________

frontend

en la carpeta frontend ejecutar

npm install

y ejecutar en otra instancia de terminal

npm start

para ingresar 

https://localhost:3000

<img src="/img/vista.jpg">