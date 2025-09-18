const API_URL = "https://apibookineo.artacalan.com/api";

export const getMessages = async (receiverId) => {
  try {
    const response = await fetch(`${API_URL}/message/${receiverId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des messages");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getMessages error:", error);
    throw error;
  }
};

export const getConversation = async (receiverId, senderId) => {
  try {
    const response = await fetch(`${API_URL}/conversation/${receiverId}/${senderId}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération de la conversation");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getConversation error:", error);
    throw error;
  }
};

export const markMessageSeen = async (messageId) => {
  try {
    const response = await fetch(`${API_URL}/message/see/${messageId}`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du message");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("markMessageSeen error:", error);
    throw error;
  }
};

export const sendMessage = async ({ senderId, receiver_email, content }) => {
  try {
    const response = await fetch(`${API_URL}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: senderId, receiver_email: receiver_email, content }),
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi du message");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error;
  }
};