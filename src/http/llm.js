import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:1234/v1",
  apiKey: "lm-studio",
  dangerouslyAllowBrowser: true,
});

export const sendQuestion = async ({ question }) => {
  try {
    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          model: "mistralai/magistral-small-2509",
          messages: [
            // { role: "system", content: `Tu auras le role d'un chatbot. Je vais te poser les questions que les utilisateurs vont surement le plus poser sur le site et je te demanderai d'enregistrer les réponses à mes questions. Voici la première question "Comment louer un livre ?" Il faut prendre en considération que les utilisateurs peuvent poser la question avec des fautes d'orthographe ou bien poser la question en raccourci par exemple "louer livre"
            //     Voici la réponse "Pour louer un livre, cliquez sur le bouton 'Louer' dans la page 'Location', puis suivez les instructions"
            //     Prends en compte ces trois nouvelles questions 
            //     Quels sont les tarifs de location ?
            //     Quelle est la durée de location ?
            //     Comment retourner un livre ?
            //     Des variantes de ces trois questions peuvent aussi parvenir. Pour la premiere question, il peut arriver que l'utilisateur écrive juste "tarif location". Pour la deuxième "longueur durée location" et pour la troisième "retour livre".
            //     Pour Quels sont les tarifs de location ? la réponse sera "Le prix est indiqué dans le tableau des livres disponible"
            //     Pour Quelle est la durée de location ? la réponse sera "La durée est flexible est peut être choisi au moment de la prise de location"
            //     Pour Comment retourner un livre ? la réponse sera "Pour restituer un livre, cliquez sur le bouton 'Restituer' dans la page 'Restitution', puis suivez les instructions."
            //     Tu peux aussi enregistrer la question "Quels types de livres sont disponibles ?", qui peut être abrégé par "type de livre". La réponse sera "Tout types de livres sont présent sur le site, en allant du roman à la BD, vous trouverez facilement votre bonheur !"
            //    ` },
            { role: "user", content: question }
          ]
        }
      ),
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi du message");
    const json = await response.json();
    const data = json?.choices?.[0]?.message?.content;
    return data;
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error;
  }
};

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
