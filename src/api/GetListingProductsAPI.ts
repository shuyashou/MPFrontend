import {faker} from "@faker-js/faker";
import { ListingProduct } from '../dataModels/ListingProduct';

const newProduct = () : ListingProduct => {
    return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        seller: faker.person.fullName(),
        description: faker.commerce.productDescription()
    };
};

export function getListingProducts(lens: number): ListingProduct[] {
    const arr: ListingProduct[] = [];
    for(let i = 0; i < lens; i++)
    {
      arr.push(newProduct());
    }
  
    return arr;
  }