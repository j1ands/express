var Promise = require("promise");
//console.log(Promise());

var promise = doSomeAsynchronousOperation();
promise.then( function(result) {
    // yay! I got the result.
}, function(error) {
    // The promise was rejected with this error.
});

function doSomeAsynchronousOperation()
{
   var promise = Promise.Promise();
   fs.readFile( "somefile.txt", function( error, data ) {
        if ( error ) {
            promise.reject( error );
        } else {
            promise.resolve( data );
        }
    });

    return promise;
}