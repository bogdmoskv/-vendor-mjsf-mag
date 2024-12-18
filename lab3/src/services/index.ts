import {CategoriesService} from "@/services/categories.service";
import {ProductService} from "@/services/products.service";
import {UsersService} from "@/services/users.service";

import httpClient from "@/utils/http-client";


class ServiceProvider {
    /**
     * Service instances
     */
    serviceInstances: Record<string, any> = {};

    /**
     * Get cruise service
     */
    getCategoriesService(): CategoriesService {
        if (!this.serviceInstances.cruiseService) {
            this.serviceInstances.cruiseService = new CategoriesService(httpClient);
        }
        return this.serviceInstances.cruiseService;
    }

    /**
     * Get product service
     */
    getProductsService(): ProductService {
        if (!this.serviceInstances.productService) {
            this.serviceInstances.productService = new ProductService(httpClient);
        }
        return this.serviceInstances.productService;
    }

    /**
     * Get user service
     */
    getUsersService(): UsersService {
        if (!this.serviceInstances.userService) {
            this.serviceInstances.userService = new UsersService(httpClient);
        }
        return this.serviceInstances.userService;
    }

    /**
     * Set service instance
     * @param serviceName
     * @param serviceInstance
     */
    setServiceInstance(serviceName: string, serviceInstance: any): void {
        this.serviceInstances[serviceName] = serviceInstance;
    }

    /**
     * Check if service instance exists
     * @param serviceName
     */
    hasServiceInstance(serviceName: string): boolean {
        return !!this.serviceInstances[serviceName];
    }
}

const serviceProvider: ServiceProvider = new ServiceProvider();
export default serviceProvider;
