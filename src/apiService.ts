const API_BASE_URL = "https://joart.azurewebsites.net"; // Update with your Azure Function app URL for production

export interface Product {
    PartitionKey: string;
    RowKey: string;
    Name: string;
    Price: number;
    Stock: number;
    Category: string;
    ProductImageBase64: string;
}

export interface User {
    PartitionKey: string;
    RowKey: string;
    Name: string;
    Email: string;
    PasswordHash: string;
}

export const addProduct = async (product: Product): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/AddProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to add product');
    }
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/api/GetProducts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
};

export const addUser = async (user: User): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Failed to add user');
    }
};

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/api/GetUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const getUser = async (partitionKey: string, rowKey: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/GetUser?partitionKey=${partitionKey}&rowKey=${rowKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
};

