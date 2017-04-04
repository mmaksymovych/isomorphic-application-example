# isomorphic-application-example
This is simple "Hello World!" application for demonstration how server-side rendering works with nodejs / react / redux

NOTE: all instructions below are for Ubuntu OS. </br>
## start work with application
- clone repository `git clone https://github.com/mmaksymovych/isomorphic-application-example.git`
- go to project root folder
- install packages `npm install`

## running development server
*server side rendering doesn't work in development server, yes, it should be improved.*

- run dev server by simply executing `npm run dev`

## running production server
**IMPORTANT:</br>**
**Production application is running on :80 port. On Ubuntu systems this port is blocked.</br>**
**Before executing scripts below you should switch to the superuser mode i.e.`sudo su`</br>**

- build prod server sources by executing `npm run buildProd`</br>
- run application with [nodemon](https://www.npmjs.com/package/nodemon) by executing `npm run nodemonProd`

After this your application will be served on **yourhost:80**</br>
You can see this application already up and running by following link http://104.131.119.140/

Go to http://104.131.119.140/ to see content rendered by client.</br>
Go to http://104.131.119.140/server to see content rendered by server.</br>

As you can see client-side and server-side rendered content is the same.</br>
Below you can find snapshots how google bot see the application.

client-side rendering
https://drive.google.com/open?id=0B-eeZzBP0CP0MzRBUlRQNUVTWkk</br>
server-side rendering
https://drive.google.com/open?id=0B-eeZzBP0CP0QTAxSUVnRURpRG8

Resources
- http://redux.js.org/docs/recipes/ServerRendering.html
- https://support.google.com/webmasters/answer/6066468?hl=en
- http://jlongster.com/Backend-Apps-with-Webpack--Part-I
