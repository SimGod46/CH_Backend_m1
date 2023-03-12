const port = 8080;
const url = `http://localhost:${port}`;

const socket = io(url);
console.log("Socket: "+socket.id);
socket.on("productsList",data=>{
    console.log("Recibido un emit");
    const log = document.getElementById("results");
    let products = "";
    data.forEach(product =>{
        products = products+ `<li>${product.title}</li>`
    })
    log.innerHTML = products;
})