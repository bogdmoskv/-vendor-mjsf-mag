import type {AxiosInstance} from "axios";
import type {Product} from "@/types";
import type {Readable, Creatable, Editable, Deletable} from "@/services/types";
import {ProductModel} from "@/models/product.model";

export class ProductService implements Readable<Product>, Creatable<Product>, Editable<Product>, Deletable<void> {

    constructor(public httpClient: AxiosInstance) {}

    async get(params: any): Promise<Product[]> {
        const response = await this.httpClient.get<Product[]>('/products', {params});
        return response.data.map((product) => new ProductModel(product));
    }

    async getById(id: number): Promise<Product> {
        const response = await this.httpClient.get<Product>(`/products/${id}`);
        return new ProductModel(response.data);
    }

    async create(data: Product): Promise<Product> {
        const response = await this.httpClient.post<Product>('/products', data);
        return response.data;
    }

    async update(id: number, data: Product): Promise<Product> {
        const response = await this.httpClient.put<Product>(`/products/${id}`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await this.httpClient.delete(`/products/${id}`);
    }
}
