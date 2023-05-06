# Pruebas E2E en Cypress

## Pre-requisitos y pasos previos:
- Node.js v14.18.0
- Tener *ghost* corriendo en el puerto 2368, se puede ejecutar el archivo *docker-compose.yml* provisto en este repositorio para tal propósito.
- En el archivo *cypress.config.js* se deben especificar el usuario y la contraseña del perfil en el que se correrán las pruebas, por ejemplo:
    ~~~
      const { defineConfig } = require("cypress");

      module.exports = defineConfig({
          e2e: {
              baseUrl: "http://localhost:2368/ghost/",
              env: {
                  username: "MiUsuario",
                  password: "UnaContraseñaBreve",
               },
              ...
           },
      });
    ~~~

## Pasos para ejecutar los scripts
1. Clonar o descargar el repositorio.
2. Ubicarse en la carpeta raíz y ejecutar el comando `npm i`.
3. Una vez finalizada la ejecución del comando anterior, correr el comando `npx cypress open`.
4. Debe aparecer una ventana como la siguiente:
![image](https://user-images.githubusercontent.com/17149432/236364140-09b8c0e1-d937-4b30-a6cf-1ed9caf925f2.png)
5. Oprimir el botón **Start E2E Testing in Chrome**.
6. Aparecerá un navegador con los scripts disponibles para ejecutar:
![image](https://user-images.githubusercontent.com/17149432/236364324-ae425d21-29e6-4c9b-bf31-2ced190cc312.png)
7. Escoger el script de interés, esto empezará a correr la prueba.

**Nota:** Los nombres de los scripts corresponden con el identificador de cada escenario de prueba. Para conocer qué identificador corresponde a cada escenario, por favor consulte el [siguiente enlace](https://github.com/Molvilada/Pruebas_E2E_Grupo_17/wiki/Escenarios-de-prueba).

