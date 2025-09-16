export const addBook = async (book) => {
  try {
    const response = await fetch("http://localhost:8000/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book), 
    });

    if (!response.ok) {
      throw new Error("Échec de l'ajout du livre");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    throw error;
  }
};