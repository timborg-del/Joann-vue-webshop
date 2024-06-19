import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = "https://joart.azurewebsites.net";

export interface Product {
    PartitionKey: string;
    RowKey: string;
    Name: string;
    Price: number;
    Stock: number;
    Category: string;
    ImageUrl: string;
    quantity: number;
    size?: string;
  }
  

export interface User {
    PartitionKey: string;
    RowKey: string;
    Name: string;
    Email: string;
    PasswordHash: string;
}

export interface Review {
    PartitionKey: string; // Product ID
    RowKey: string; // Unique ID for the review
    Rating: number;
    ReviewText: string;
    Timestamp: Date;
}

export interface FormData {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  }

export const addProduct = async (product: Product, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/AddProduct`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add product: ${errorText}`);
    }
};

export const updateProduct = async (product: Product): Promise<void> => {
    console.log('Updating product:', product);

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

// Function to fetch reviews for a product
export const getReviews = async (productId: string): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch reviews: ${errorText}`);
    }

    const reviews: Review[] = await response.json();
    return reviews;
};

// Function to submit a review for a product
export const submitReview = async (productId: string, rating: number, reviewText: string): Promise<void> => {
    const review = {
        Rating: rating,
        ReviewText: reviewText
    };

    const response = await fetch(`${API_BASE_URL}/products/${productId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit review: ${errorText}`);
    }
};

// Utility function to check authentication
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found in local storage');
        return false;
    }

    try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        console.log('Decoded token:', decodedToken);

        const { exp } = decodedToken;
        if (exp && Date.now() >= exp * 1000) {
            console.log('Token has expired');
            localStorage.removeItem('token'); // Remove expired token
            return false;
        }

        console.log('Token is valid');
        return true;
    } catch (e) {
        console.error('Invalid token', e);
        return false;
    }
};


