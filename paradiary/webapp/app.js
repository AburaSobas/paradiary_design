/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

'use strict';
var 
  http = require('http'),
  express = require('express'),
  routes = require('./routes'),
  app = express(),
  server = http.createServer(app);


app.configure( function () {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( express.static( __dirname + '/public' ));
  app.use( app.router );
});


app.configure( 'development', function () {
  app.use( express.logger() );
  app.use( express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }) );
  app.use( express.errorHandler() );
});

app.configure( 'production', function () {
  app.use( express.errorHandler() );
});

routes.configRoutes( app, server );

server.listen(3000);
console.log (
  'Express server listening on port %d in %s mode', 
  server.address().port, app.settings.env
);