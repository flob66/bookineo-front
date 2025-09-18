const API_URL = "https://apibookineo.artacalan.com/api/book";

export const searchBooks = async (title) => {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Erreur lors de la recherche");
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};

export const filterByStatus = async (status) => {
  try {

    const bodyStatus = status === "0" ? "" : status;

    const response = await fetch(`${API_URL}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: bodyStatus }),
    });
    if (!response.ok) throw new Error("Erreur lors du filtre par statut");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error filtering by status:", error);
    throw error;
  }
};

export const filterByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });
    if (!response.ok) throw new Error("Erreur lors du filtre par catégorie");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error filtering by category:", error);
    throw error;
  }
};

export const filterByAuthor = async (author) => {
  try {
    const response = await fetch(`${API_URL}/author`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author }),
    });
    if (!response.ok) throw new Error("Erreur lors du filtre par auteur");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error filtering by author:", error);
    throw error;
  }
};

export const filterByPrice = async (minPrice, maxPrice) => {
  try {
    const response = await fetch(`${API_URL}/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minPrice, maxPrice }),
    });
    if (!response.ok) throw new Error("Erreur lors du filtre par prix");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error filtering by price:", error);
    throw error;
  }
};