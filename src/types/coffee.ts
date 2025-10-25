import type { ProfileI } from "./user";

export interface CoffeeI {
    id: number;
    name: string;
    description: string;
    category: CoffeeCategoryI;
    brand: Brand;
    roast_level: string;
    acidity_level: string;
    net_weight: number;
    price: number;
    stock_quantity: number;
    is_available: boolean;
    avg_rating?: number;
    created_at: Date;
    updated_at: Date;
    coffee_images?: CoffeeImage[];

}

export interface CoffeeImage {
    id: number;
    image: string;
    index: number;
    coffee: CoffeeI;
}

export interface Brand {
    id: number;
    name: string;
    description: string;
    logo: string;
    country: string;
    owner: ProfileI;
}

export interface CoffeeCategoryI {
    id: number;
    name: string;
    description: string;
}

export interface CoffeeReviewI {
    id: number;
    product: CoffeeI;
    author: ProfileI;
    comment: string;
    created_at: Date;
    is_approved: string;
}

