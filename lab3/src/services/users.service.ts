import type { AxiosInstance } from "axios";
import type { User } from "@/types";
import { UserModel } from "@/models/user.model";

export class UsersService {
    constructor(private httpClient: AxiosInstance) {}

    async getAll(): Promise<User[]> {
        const response = await this.httpClient.get<User[]>('/users');
        return response.data.map((user) => new UserModel(user));
    }

    async getById(id: number): Promise<User> {
        const response = await this.httpClient.get<User>(`/users/${id}`);
        return new UserModel(response.data);
    }

    async create(user: Omit<User, 'id'>): Promise<User> {
        const response = await this.httpClient.post<User>('/users', user);
        return new UserModel(response.data);
    }

    async update(id: number, user: Omit<User, 'id'>): Promise<User> {
        const response = await this.httpClient.put<User>(`/users/${id}`, user);
        return new UserModel(response.data);
    }

    async delete(id: number): Promise<void> {
        await this.httpClient.delete(`/users/${id}`);
    }
}
