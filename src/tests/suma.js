import colors from "colors"
const suma = (...numbers) => {
//    if(!num1 && !num2) return 0
//    if(typeof num1 !== "number" || typeof num2 !== "number") return null
    if(numbers.length<2) return 0
    const notNumber = numbers.find(number=>typeof(number) !== "number");
    if(notNumber) return null
    return numbers.reduce((prev,curr)=>prev+curr,0);
}

console.log(
    "Test 1: La funcion debe devolver null si algún parametro no es númerico"
        .underline.yellow
)
const resulTest1 = suma(5,"9");
if(resulTest1===null){
    console.log("test 1 pasó".green)
}else{
    console.log("test 1 no pasó".red)
    console.log("Se esperaba 'null' ".red)
    console.log(`Se recibió ${resulTest1}`.red)
}

console.log(
    "Test 2: La funcion debe devolver 0 si no se pasó ningún parametro"
        .underline.yellow
)
const resulTest2 = suma();
if(resulTest2===0){
    console.log("test 2 pasó".green)
}else{
    console.log("test 2 no pasó".red)
    console.log("Se esperaba '0' ".red)
    console.log(`Se recibió ${resulTest2}`.red)
}

console.log(
    "Test 3: La funcion debe devolver 9 si los parametros son 5 y 4"
        .underline.yellow
)
const resulTest3 = suma(5,4);
if(resulTest3===9){
    console.log("test 3 pasó".green)
}else{
    console.log("test 3 no pasó".red)
    console.log("Se esperaba '9' ".red)
    console.log(`Se recibió ${resulTest3}`.red)
}


console.log(
    "Test 4: La funcion debe devolver 14 si los parametros son 5, 4, 3, 2. Debe aceptar n parametros"
        .underline.yellow
)
const resulTest4 = suma(5,4,3,2);
if(resulTest4===14){
    console.log("test 4 pasó".green)
}else{
    console.log("test 4 no pasó".red)
    console.log("Se esperaba '14' ".red)
    console.log(`Se recibió ${resulTest4}`.red)
}