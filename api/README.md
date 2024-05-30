## README

### Como levantar este proyecto
* Requisitos
* * Docker

* Pasos
* * Clonar el repositorio
* * Ejecutar el comando `docker-compose build` en la raíz del proyecto
* * Ejecutar el comando `docker-compose up` en la raíz del proyecto
* * Acceder a `http://localhost:3000` en el navegador
* * Listo!

### Como generar otro proyecto rails desde cero
* Requisitos
* * Docker

* Pasos
* * Copiar el archivo `Dockerfile-setup` & `docker-compose-setup.yml` de este proyecto en la raíz del nuevo proyecto
* * `docker-compose -f docker-compose-setup.yml run --service-ports web bash`
* * Una vez adentro del bash de docker, `gem install rails --version 7.1`
* * `rails new . ---name=my-app`
* * `rails s -b 0.0.0.0` para asegurarnos que el proyecto anda perfecto
* * Abrir `http://localhost:3000` en el navegador
* * Cerrar terminal
* * Copiar archivos `Dockerfile` & `docker-compose.yml` de este proyecto en la raíz del nuevo proyecto
* * Copiar la carpeta `docker` de este proyecto en la raíz del nuevo proyecto
* * Crear un archivo `.env` en la raíz del nuevo proyecto
* * Copiar el archivo `Makefile` de este proyecto en la raíz del nuevo proyecto
* * Abrir el gemfile y remplazar la gema `sqlite3` por `gem 'pg'`
* * Correr `docker-compose build` en la raíz del nuevo proyecto
* * Correr `docker-compose up` en la raíz del nuevo proyecto

### Comandos utiles
Agregue un archivo Makefile que va a ser la vida mas facil a la hora de ejecutrar comandos.

Los clasicos comoandos como `rails s` `bundle install` `rails db:migrate` se podrian correr de la siguiente manera
```
docker-compose run --rm web bin/rails db:migrate
```

El archivo makefile hace que puedas correr comandos como
```
make migrate # realiza rails db:migrate
```

```
make bundle # realiza bundle install
```

```
make rails ARGS="generate migration add_my_custo_column" # realiza rails y todo lo que se pase dentro de ARGS seguido
```

#### Lista de comandos
* `make build`
* `make run`
* `make bundle`
* `make rails`
* `make console`
* `make migrate`
* `make rspec`

Mirar el archivo `Makefile` para ver como funcionan