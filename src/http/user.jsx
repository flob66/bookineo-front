export  const login = async (email, password) => {
    try {
        const response = await fetch('https://apibookineo.artacalan.com/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const register = async (first_name, last_name, email, birthday, password) => {
    try {
        const response = await fetch('https://apibookineo.artacalan.com/api/register', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, birthday, password })
        });
        if (!response.ok) {
            throw new Error('Register failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in:', error);
        throw error;
    }
}

export const user_check = async (first_name, last_name, email, birthday) => {
    try {
        const response = await fetch('https://apibookineo.artacalan.com/api/verify-user', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, birthday })
        });
        if (!response.ok) {
            throw new Error('Register failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in:', error);
        throw error;
    }
}

export const reset_password = async (id, new_password) => {
    try {
        const response = await fetch('https://apibookineo.artacalan.com/api/change-password', {
            method: 'POST',
            body: JSON.stringify({ id, new_password })
        });
        if (!response.ok) {
            throw new Error('Register failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in:', error);
        throw error;
    }
}