export  const addBook = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8000/api/book', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Book failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error book in:', error);
        throw error;
    }
}