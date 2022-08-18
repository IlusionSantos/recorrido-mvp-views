# Recorrido mvp Proyecto en Vue

En el siguiente repositorio encontrara los archivos necesarios para ejecutar la parte visual del projecto de monitoreo

## Estructura

El proyecto tiene la siguiente estructura

```
RECORRIDO-MVP-VIEWS
│   README.md
│   babel.config.js
│   jsconfig.json
│   package.json
│   vue.config.js
│   yarn.lock.json
│
└─── public
└─── src
    │   App.vue
    │   main.js
        └───assets
        │   alert.png
            └───sass
        └───components
        │   CustomTable.vue
        │   ListTable.vue
        │   MainNav.vue
        └───router
        │   index.js
        └───views
            └───Schedules
            │   AvailabilityView.vue
            │   MonitoringView.vue

```

La estructura mostrada anteriormente ha sido acortada a los archivos que se utilizan en el project.

### Views

##### AvailabilityView.vue

En este archivo se encuentra toda la logica y estrucura de la vista que permite editar la disponibilidad de las personas.

##### MonitoringView.vue

En este archivo se encuentra toda la logica y estrucura de la vista que permite visualizar la disponibilidad de las personas.

##### App.vue

La vista principal contiene un `<router-view>` en el cual se cargan las demás vistas

##### CustomTable.vue y ListTable.vue

Ambos son componentes que le dan estructura a como se despliegan la información en AvailabilityView.vue y MonitoringView.vue

## Setup

Al igual que cualquier proyecto de vuejs es necesario tener instalado [Node](https://nodejs.org/es/download/). Recuerde que es necesario un manejador de paquetes. Al seleccionar su manejador de paquetes necesita instalar los paquetes necesarios para el funcinamiento del proyecto.

### Yarn

```
yarn install
```

### Node

```
npm install
```

### Development

Para que el servidor se comience a ejecutar es necesario que se corra el siguiente comando, al resolverse el comando este te guiara a [http://localhost:8080/ ](http://localhost:8080/) en dado caso se haya cambiado el puerto es necesario cambiar `:8080` por el puerto indicado

```
yarn serve
```
