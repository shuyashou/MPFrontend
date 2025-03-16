import { Product } from "./Product";

export type ListingProduct = Product & {
    price: string;
    seller: string;
    description: string;
};