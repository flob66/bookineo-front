import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:1234/v1",
  apiKey: "lm-studio",
});

export const askBot = async (question) => {
  try {
    const response = await client.chat.completions.create({
      model: "local-model",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant qui répond uniquement sur l'application de gestion de livres. Aide les utilisateurs sur la location, la disponibilité des livres, la gestion de profil.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Erreur LLM :", err);
    return "Désolé, je n'ai pas pu obtenir de réponse pour le moment.";
  }
};
