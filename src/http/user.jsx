export  const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8000/api/login', {
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

export const register = async (firstName, lastName, email, birthDate, password) => {
    try {
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, birthDate, password })
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