import colors from "colors"
let testTotales = 0;
let testPasados = 0;
const login = (user, password) => {
    if(!password) return "No se ha proporcionado un password"
    if(!user) return "No se ha proporcionado un usuario"
    if(password!== "123") return "Contraseña incorrecta"
    if(user !== "coderUser") return "Credenciales incorrectas"
    return "logueado"
}

const test = (expectedResult, condition, ...inputParams) =>{
    testTotales++
    console.log(
        `Test ${testTotales}: La funcion debe devolver '${expectedResult}' si ${condition}`
            .underline.yellow
    )
    const resulTest = login(inputParams.at(0),inputParams.at(1));
    if(resulTest===expectedResult){
        testPasados++
        console.log(`test ${testTotales} pasó`.green)
    }else{
        console.log(`test ${testTotales} no pasó`.red)
        console.log(`Se esperaba ${expectedResult} `.red)
        console.log(`Se recibió ${resulTest}`.red)
    }
}

test("No se ha proporcionado un password","no se entrega una contrseña","usuario1",null)
test("No se ha proporcionado un usuario","no se entrega un usuario",null,"contrasenha1")
test("Contraseña incorrecta","la contraseña es incorrecta","coderUser","contrasenha1")
test("Credenciales incorrectas","el usuario es incorrecto","usuario1","123")
test("logueado","el las credenciales son correctas","coderUser","123")


if(testPasados<testTotales){
    console.log(`REPROBADO. Calificación: ${testPasados}/${testTotales}`.red)
}else{
    console.log(`APROBADO. Calificación: ${testPasados}/${testTotales}`.green)
}