const socket = io();
//socket.emit("message","hola mundo ;) ");
socket.on("productsList",data=>{
    const log = document.getElementById("results");
    let products = "";
    data.forEach(product =>{
        products = products+ `<li>${product.title}</li>`
    })
    log.innerHTML = products;
})