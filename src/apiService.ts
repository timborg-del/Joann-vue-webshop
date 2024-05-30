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
    console.log('Adding product:', product); // Log product data

    // Ensure product data is correctly formatted
    if (!product.PartitionKey || !product.RowKey || !product.Name || product.Price <= 0 || product.Stock < 0 || !product.Category || !product.ProductImageBase64) {
        console.error('Invalid product data:', product);
        throw new Error('Invalid product data');
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
        console.error('Failed to add product:', errorText); // Log error
        throw new Error(`Failed to add product: ${errorText}`);
    }

    console.log('Product added successfully'); // Log success
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
        console.error('Failed to fetch products:', errorText); // Log error
        throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const products: Product[] = await response.json();
    console.log('Fetched products:', products); // Log fetched products
    return products;
};

export const addUser = async (user: User): Promise<void> => {
    console.log('Adding user:', user); // Log user data

    const response = await fetch(`${API_BASE_URL}/AddUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add user:', errorText); // Log error
        throw new Error(`Failed to add user: ${errorText}`);
    }

    console.log('User added successfully'); // Log success
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
        console.error('Failed to fetch users:', errorText); // Log error
        throw new Error(`Failed to fetch users: ${errorText}`);
    }

    const users: User[] = await response.json();
    console.log('Fetched users:', users); // Log fetched users
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
        console.error('Failed to fetch user:', errorText); // Log error
        throw new Error(`Failed to fetch user: ${errorText}`);
    }

    const user: User = await response.json();
    console.log('Fetched user:', user); // Log fetched user
    return user;
};

