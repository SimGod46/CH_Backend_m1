import { faker } from '@faker-js/faker';
//faker.locale = "es"
const generateUser = ()=>{
    return{
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number()
    }
}
const generateProducts = (numProducts) => {
    const products = []
    for(let indx=0;indx<numProducts;indx++){
        products.push(generateProduct())
    }
    return products
}
const generateProduct = ()=>{
    return{
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.numeric(5),
        price: faker.commerce.price(),
        status:true,
        stock: faker.string.numeric(2),
        thumbnails:[faker.image.urlLoremFlickr(), faker.image.urlLoremFlickr()]
    }
}

export { generateProducts };
