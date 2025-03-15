import {faker} from "@faker-js/faker";
import {Product} from "../dataModels/Product";

const newProduct = () : Product => {
    return {
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        seller: faker.person.fullName(),
        description: faker.commerce.productDescription()
    };
};

export function getProducts(lens: number): Product[] {
    const arr: Product[] = [];
    for(let i = 0; i < lens; i++)
    {
      arr.push(newProduct());
    }
  
    return arr;
  }