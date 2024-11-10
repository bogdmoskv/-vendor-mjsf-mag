import type {Category, Product} from "@/types";
import {BaseModel} from "@/models/base.model";

export class ProductModel extends BaseModel implements Product{
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;

    constructor(data: Product) {
        super(data);
        this.init(data);
    }
}
