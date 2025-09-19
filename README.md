# Pour se connecter en admin 
(par défaut, un user créé a le role “user”), il faut se donner le role admin en BDD (role = 1) 

# Créer projet React :

npx create-react-app bookineo-front

# Après avoir cloner le projet : 

npm install

# Lancer le serveur : 

cd bookineo-front
npm start

# Connecter au repo Github :

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<ton-username>/bookineo-front.git
git branch -M master
git push -u origin master

# Liens avec le back et le LLM :

Le back est déployé sur https://apibookineo.artacalan.com/ (pas besoin d'executer en local l'API)
Remplacer le lien ci-dessus par http://localhost:8000/ pour tester le back en local dans les fichiers js présent dans src/http

Pour faire fonctionner le chatbot, déployer un serveur local sur LM Studio http://localhost:1234/ avec mistralai/magistral-small-2509 comme model
Modifier le modèle dans la fonction sendQuestion dans le fichier src/http/llm.js
