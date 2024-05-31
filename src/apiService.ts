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
    // Convert Price to number if it is a string
    if (typeof product.Price === 'string') {
        product.Price = parseFloat(product.Price);
    }
    // Convert Stock to number if it is a string
    if (typeof product.Stock === 'string') {
        product.Stock = parseInt(product.Stock, 10);
    }

    const response = await fetch(`${API_BASE_URL}/AddProduct`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add product: ${errorText}`);
    }
};

export const updateProduct = async (product: Product): Promise<void> => {
    console.log('Updating product:', product);

    // Convert Price to number if it is a string
    if (typeof product.Price === 'string') {
        product.Price = parseFloat(product.Price);
    }
    // Convert Stock to number if it is a string
    if (typeof product.Stock === 'string') {
        product.Stock = parseInt(product.Stock, 10);
    }

    const response = await fetch(`${API_BASE_URL}/UpdateProduct`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to update product:', errorText);
        throw new Error(`Failed to update product: ${errorText}`);
    }

    console.log('Product updated successfully');
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/GetProducts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const products: Product[] = await response.json();
    return products;
};

export const deleteProduct = async (partitionKey: string, rowKey: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/DeleteProduct/${partitionKey}/${rowKey}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete product: ${errorText}`);
    }
};

export const addUser = async (user: User): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add user: ${errorText}`);
    }
};

export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/GetUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch users: ${errorText}`);
    }

    const users: User[] = await response.json();
    return users;
};

export const getUser = async (partitionKey: string, rowKey: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/GetUser?partitionKey=${partitionKey}&rowKey=${rowKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user: ${errorText}`);
    }

    const user: User = await response.json();
    return user;
};
