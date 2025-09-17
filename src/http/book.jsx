export const addBook = async (book) => {
  try {
    const response = await fetch("https://apibookineo.artacalan.com/api/book", {
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

export const getBooks = async (book) => {
  try {
    const response = await fetch("https://apibookineo.artacalan.com/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

export const updateBook = async (book) => {
  if (!book.id) {
    throw new Error("L'ID du livre est requis pour la mise à jour.");
  }

  try {
    const response = await fetch(`https://apibookineo.artacalan.com/api/book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book), 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "Échec de la mise à jour du livre";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  if (!id) {
    throw new Error("L'ID du livre est requis pour la mise à jour.");
  }

  try {
    const response = await fetch(`https://apibookineo.artacalan.com/api/book/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id), 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "Échec de la mise à jour du livre";
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    throw error;
  }
};