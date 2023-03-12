const socket = io();
socket.emit("realtimeRequest","true");

socket.on("productsList",data=>{
    const log = document.getElementById("results");
    let products = "";
    if(Array.isArray(data)){
        data.forEach(product =>{
            products = products+ `<li>${product.title}</li>`
        });
    }
    log.innerHTML = products;
})