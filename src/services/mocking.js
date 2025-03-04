import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

const generateUsers = async (role) =>{

    
    const planePassword = "coder123";
    const encryptedPassword = await createHash(planePassword);

    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        password: encryptedPassword,
        role: role,
        pets: []  
    };
};

const generatePets = () =>{

    return {
        id: faker.database.mongodbObjectId(),
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.birthdate(),
        adopted: false,
        image: faker.image.avatar()
    };
};



export { generateUsers, generatePets};
