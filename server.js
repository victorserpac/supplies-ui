var express = require( 'express' );
var app = express();
var path = require('path');

app.set( 'clientPath', path.join( __dirname, 'dist' ) );
app.use( express.static( app.get( 'clientPath' ) ) );

app.all( '/*', function( req, res ) {
    res.sendFile( path.join( app.get( 'clientPath' ), 'index.html' ) );
});

app.listen( 3000, function() {
  console.log( 'Servidor rodando na porta 3000' );
});
