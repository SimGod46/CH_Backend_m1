// Para utilizar multiples 'process.on("message")' necesitaria multiples archivos cada uno con un
// process.on y para intercambiar entre los archivos, utilizar el metodo fork de child_process
process.on("message",message=>{
    let result = 0;
    for(let i=0;i<5e9;i++){
        result +=1
    }
    process.send(result);
})