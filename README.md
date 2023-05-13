# Pruebas E2E en Cypress

## Pre-requisitos y pasos previos:
- Node.js v14.18.0
- Tener *Ghost* corriendo, se puede ejecutar el archivo *docker-compose.yml* provisto en este repositorio para tal propósito.
- Tener un perfil creado en *Ghost* con permisos de administrador.
- En el archivo *cypress.config.js* se debe especificar la url donde esté corriendo el administrador de *Ghost*,  el usuario y la contraseña del perfil con permisos de administrador, el usuario genérico de Ghost que se crea por defecto (en la versión 3.41.1), la versión de Ghost que se esté corriendo, y adicional se puede especificar la ruta de los scripts a correr y la ruta de los screenshot a generar.

~~~
  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
      e2e: {
          baseUrl: "http://localhost:2368/ghost/",
          env: {
              username: "user@onemail.con",
              password: "Pa55w0rd",
              userghost: "ghost-author@example.com",
              versionGhost: "4.44.0",
           },
          specPattern: "cypress/e2e_10_scenarios/*.cy.js",
          screenshotsFolder: "cypress/screenshots_10_scenarios",
       },
  });
~~~

## Pasos para ejecutar los 10 escenarios escogidos para hacer VRT
1. Clonar o descargar el repositorio.
2. Ubicarse en la carpeta raíz y ejecutar el comando `npm i`.
3. Una vez finalizada la ejecución, modificar en el archivo *cypress.config.js* lo siguiente:

~~~
  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
          specPattern: "cypress/e2e_10_scenarios/*.cy.js",
          screenshotsFolder: "cypress/screenshots_10_scenarios",
       },
  });
~~~
Adicionalmente poner información de la versión que se va a correr. <br/>

4. Correr el comando `npx cypress open`.
5. Debe aparecer una ventana como la siguiente:
![image](https://user-images.githubusercontent.com/17149432/236364140-09b8c0e1-d937-4b30-a6cf-1ed9caf925f2.png)
5. Oprimir el botón **Start E2E Testing in Chrome**.
6. Aparecerá un navegador con los scripts disponibles para ejecutar:
![image](https://github.com/santi8194/Pruebas_VRT_Cypress/assets/17149432/31a432e9-6d50-4189-92b0-751b8e147063)
7. Escoger el script de interés, esto empezará a correr la prueba  a generar los screenshots.


**Nota:** Los nombres de los scripts corresponden con el identificador de cada escenario de prueba. Para conocer qué identificador corresponde a cada escenario, por favor consulte el [siguiente enlace](https://github.com/Molvilada/Pruebas_E2E_Grupo_17/wiki/Escenarios-de-prueba).

## Pasos para ejecutar los 20 escenarios de prueba 
1. Clonar o descargar el repositorio.
2. Ubicarse en la carpeta raíz y ejecutar el comando `npm i`.
3. Una vez finalizada la ejecución, modificar en el archivo *cypress.config.js* con la versión de Ghost que se va a correr y con lo siguiente:

~~~
  const { defineConfig } = require("cypress");

  module.exports = defineConfig({
          ...
          specPattern: "cypress/e2e/*.cy.js",
          screenshotsFolder: "cypress/screenshots",
       },
  });
~~~
5. Correr el comando `npx cypress open`.
6. Debe aparecer una ventana como la siguiente:
![image](https://user-images.githubusercontent.com/17149432/236364140-09b8c0e1-d937-4b30-a6cf-1ed9caf925f2.png)
5. Oprimir el botón **Start E2E Testing in Chrome**.
6. Aparecerá un navegador con los scripts disponibles para ejecutar:
![image](https://user-images.githubusercontent.com/17149432/236364324-ae425d21-29e6-4c9b-bf31-2ced190cc312.png)
7. Escoger el script de interés, esto empezará a correr la prueba.


**Nota:** Los nombres de los scripts corresponden con el identificador de cada escenario de prueba. Para conocer qué identificador corresponde a cada escenario, por favor consulte el [siguiente enlace](https://github.com/Molvilada/Pruebas_E2E_Grupo_17/wiki/Escenarios-de-prueba).

