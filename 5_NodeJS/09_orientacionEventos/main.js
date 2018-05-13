function procesar_interseccion(arr1, arr2, callback){
    var resultados = [];
    for(var i = 0; i < arr1.length; i++) {
        for(var j = 0; j < arr2.length; j++){
            if(arr2[j] == arr1[i]){
                resultados[resultados.length] = arr2[j];
                break;
            }
        }
    }
    
    // Devolver un null en vez de un objeto de la clase Error
    callback(null, resultados);
}

var a1 = [ 3476, 2457, 7547, 34523, 3, 6, 7,2, 77, 8, 2345,
    7623457, 2347, 23572457, 237457, 234869, 237,
    24572457524 ];

var a2 = [ 3476, 75347547, 2457634563, 56763472, 34574, 2347,
    7, 34652364 , 13461346, 572346, 23723457234, 237,
    234, 24352345, 537, 2345235, 2345675, 34534,
    7582768, 284835, 8553577, 2577257,545634, 457247247,
    2345 ];

procesar_interseccion(a1, a2, function(err, resultados){
    if(err) {
        console.log(err);
    } else {
        console.log(resultados);
    }
});