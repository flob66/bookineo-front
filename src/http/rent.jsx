const API_URL = "https://apibookineo.artacalan.com/api/rent";

export const rentBook = async (user_id, book_id, number_days_rent) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, book_id, number_days_rent }),
    });
    if (!response.ok) throw new Error("Erreur lors de la location");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error renting book:", error);
    throw error;
  }
};

export const returnBook = async (user_id, book_id, rent_id) => {
  try {
    const response = await fetch(`${API_URL}/return`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, book_id, rent_id }),
    });
    if (!response.ok) throw new Error("Erreur lors de la restitution");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
};


export const getRents = async () => {
  try {
    const response = await fetch(`https://apibookineo.artacalan.com/api/rents`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erreur lors de la récupération de l’historique");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur getRents:", error);
    throw error;
  }
};

export const getStillRents = async () => {
  try {
    const response = await fetch(`${API_URL}/still`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Erreur lors de la récupération des locations en cours");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur getStillRents:", error);
    throw error;
  }
};
