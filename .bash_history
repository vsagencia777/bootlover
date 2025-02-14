sudo apt update && sudo apt upgrade -y
sudo ufw allow OpenSSH
sudo apt install -y curl git unzip
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
sudo apt install -y apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo systemctl status docker
sudo apt install -y apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo systemctl status docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
mkdir -p ~/boot-lover-postgres
cd ~/boot-lover-postgres
nano docker-compose.yml
docker-compose up -d
docker ps
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
mkdir ~/bootlover-backend
cd ~/bootlover-backend
npm init -y
npm install express pg dotenv
nano .env
nano app.js
node app.js
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
mkdir routes
nano routes/authRoutes.js
mkdir routes
nano routes/authRoutes.js
ls
nano app.js 
cd ~/bootlover-backend/routes
ls
nano authRoutes.js 
http://188.245.104.72:3000/auth/register
sudo lsof -i:3000
ls ..
cd ..
sudo lsof -i:3000
cd ~/bootlover-backend
node app.js
ode:internal/modules/cjs/loader:1143
Error: Cannot find module 'bcrypt'
Require stack:
- /root/bootlover-backend/routes/authRoutes.js
- /root/bootlover-backend/app.js
}
Node.js v18.20.6npm install bcrypt
npm install bcrypt
node app.js
npm install express pg dotenv body-parser
npm install bcrypt jsonwebtoken
npm install nodemon --save-dev
npx nodemon app.js
ls
cd ..
ls
cd ~/bootlover-backend
nano .env
cd ~/bootlover-backend
nano app.js
node app.js
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend
nano .env
cd ~/bootlover-backend
nano app.js
node app.js
cd ~/bootlover-postgres
ls
cd ~/bootlover-postgres
ls
find /root -name "docker-compose.yml"
cd /root/boot-lover-postgres
docker-compose down
docker-compose up -d
docker ps
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend
nano .env
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
cd ~/bootlover-backend
node app.js
npm install dotenv
require("dotenv").config();
cd /root/boot-lover-postgres
docker-compose down
docker-compose up -d
cd ~/bootlover-backend
node app.js
nano dbTest.js
node dbTest.js
cd ~/bootlover-backend
nano app.js
npm install
node app.js
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
nano routes/authRoutes.js
ls
cd bootlover-backend/
nano routes/authRoutes.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend/routes
nano authRoutes.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend
nano .env
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
cd ~/bootlover-backend
nano app.js
node app.js
npm install dotenv
node app.js
nano app.js
node app.js
nano dbTest.js
node dbTest.js
nano dbTest.js
nano .env
node dbTest.js
cd ~/bootlover-backend
nano app.js
cd ~/bootlover-backend/routes
nano authRoutes.js
cd ~/bootlover-backend
node app.js
ls
cd ..
ls
cd ~/bootlover-backend/routes
nano authRoutes.js
cd ~/bootlover-backend
node app.js
docker ps
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
nano .env
ls
nano dbTest.js 
node dbTest.js
docker ps
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' boot-lover-db
nano .env
node dbTest.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend/routes
nano authRoutes.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend/routes
nano authRoutes.js
cd ~/bootlover-backend
nano app.js
node app.js
docker exec -it boot-lover-db psql -U bootlover_user -d bootlover_db
cd ~/bootlover-backend/routes
nano assinaturasRoutes.js
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const pool = new Pool({
});
// Criar uma nova assinatura
router.post("/create", async (req, res) => {
});
// Consultar assinatura por usuário
router.get("/:usuario_id", async (req, res) => {
});
// Atualizar assinatura (cancelar ou alterar status)
router.put("/:usuario_id", async (req, res) => {
});
// Listar todas as assinaturas (admin)
router.get("/", async (req, res) => {
});
module.exports = router;
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const pool = new Pool({
});
// Criar uma nova assinatura
router.post("/create", async (req, res) => {
});
// Consultar assinatura por usuário
router.get("/:usuario_id", async (req, res) => {
});
// Atualizar assinatura (cancelar ou alterar status)
router.put("/:usuario_id", async (req, res) => {
});
// Listar todas as assinaturas (admin)
router.get("/", async (req, res) => {
cd ~/bootlover-backend
nano app.js
node app.js
cd ~/bootlover-backend/routes
nano webhookRoutes.js
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const pool = new Pool({
});
// Rota para receber o Webhook
router.post("/payment", async (req, res) => {
});
module.exports = router;
const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const pool = new Pool({
});
// Rota para receber o Webhook
router.post("/payment", async (req, res) => {
cd ~/bootlover-backend
nano app.js
cd ~/bootlover-backend
nano app.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend/routes
nano authRoutes.js
node app.js
cd ~/bootlover-backend
node app.js
cd ~/bootlover-backend/routes
nano jogosRoutes.js
cd ~/bootlover-backend
nano app.js
ls
cd bootlover-backend/
ls
node app.js
cd ~/bootlover-backend/routes
nano jogosRoutes.js
node app.js
cd ..
node app.js
cd ~/bootlover-backend/routes
nano chatRoutes.js
cd ..
node app.js
cd ~/bootlover-backend/routes
nano chatRoutes.js
nano envTest.js
node envTest.js
cd ~/bootlover-backend
node app.js
npm install openai
node app.js
found 0 vulnerabilities
root@ubuntu-8gb-nbg1-1:~/bootlover-backend# node app.js
/root/bootlover-backend/routes/chatRoutes.js:7
const configuration = new Configuration({
TypeError: Configuration is not a constructor
nano /root/bootlover-backend/routes/chatRoutes.js
node app.js
/root/bootlover-backend/routes/chatRoutes.js:8
TypeError: Configuration is not a constructor
nano /root/bootlover-backend/routes/chatRoutes.js
node app.js
cd ~/bootlover-backend/middleware
nano checkSubscription.js
node app.js
cd ~/bootlover-backend
npm install
node app.js
cd ~/bootlover-backend/middleware
nano authMiddleware.js
node app.js
cd ..
node app.js
cd ..
npm install -g create-react-app
npx create-react-app bootlover-frontend
cd bootlover-frontend
npm install
npm audit
npm install --package-lock-only
cd ~/bootlover-frontend
npm audit
npm audit fix --force
np, audit
npm audit
cd ..
rm -rf ~/bootlover-frontend
npm install -g create-react-app
npx create-react-app bootlover-frontend
cd bootlover-frontend
cd ..
rm -rf ~/bootlover-frontend
npm install -g create-react-app
npx create-react-app bootlover-frontend
ls
cd bootlover-frontend/
npm install
npm audit
npm audit fix
npm audit fix --force
npm start
npm install web-vitals
npm start
cd ..
mkdir -p ~/bootlover-frontend/src/components
touch ~/bootlover-frontend/src/api.js
touch ~/bootlover-frontend/src/components/Roleta.js
touch ~/bootlover-frontend/src/components/Cartas.js
touch ~/bootlover-frontend/src/components/Chat.js
touch ~/bootlover-frontend/src/App.js
touch ~/bootlover-frontend/src/index.js
touch ~/bootlover-frontend/src/styles.css
npm start
cd bootlover-frontend/
npm start
npm install axios
npm start
npm install npm-run-all --save-dev
cd ~/bootlover-frontend
npm install concurrently --save-dev
npm install
npm start
cd ..
cd bootlover-backend/
npm install --save-dev nodemon
npm start
cd ls
cd ..
cd bootlover-frontend/
npm start
npm status
cd ..
npm install -g pm2
pm2 start ecosystem.config.js
pm2 status
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 status
pm2 logs bootlover-backend
cd bootlover-backend/
npm install dotenv
pm2 restart bootlover-backend
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 logs bootlover-backend
npm install dotenv
pm2 restart bootlover-backend
pm2 logs bootlover-backend
ls -l /root/bootlover-backend/.env
chmod 644 /root/bootlover-backend/.env
pm2 restart bootlover-backend
npm ls dotenv
pm2 restart bootlover-backend
pm2 logs bootlover-backend
sudo lsof -i :3001
sudo lsof -i :3002
pm2 restart bootlover-backend
pm2 logs bootlover-backend
/root/.pm2/logs/bootlover-backend-error.log last 15 lines:
0|bootlove |     at listenInCluster (node:net:1865:12)
0|bootlove |     at Server.listen (node:net:1953:7)
0|bootlove |     at Function.listen (/root/bootlover-backend/node_modules/express/lib/application.js:635:24)
0|bootlove |     at Object.<anonymous> (/root/bootlover-backend/app.js:61:20)
0|bootlove |     at Module._compile (node:internal/modules/cjs/loader:1364:14)
0|bootlove |     at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
0|bootlove |     at Module.load (node:internal/modules/cjs/loader:1203:32)
0|bootlove |     at Module._load (node:internal/modules/cjs/loader:1019:12)
0|bootlove |     at Object.<anonymous> (/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js:33:23) {
0|bootlove |   code: 'EADDRINUSE',
0|bootlove |   errno: -98,
0|bootlove |   syscall: 'listen',
0|bootlove |   address: '::',
0|bootlove |   port: 3002
0|bootlove | }sudo lsof -i :3002
sudo lsof -i :3002
sudo lsof -i :3003
pm2 restart bootlover-backend
pm2 logs bootlover-backend
ls -l /root/bootlover-backend/.env
chmod 644 /root/bootlover-backend/.env
pm2 restart bootlover-backend
pm2 logs bootlover-backend
ls -la /root/bootlover-backend/.env
cd ..
pm2 start app.js --env-production --env DB_HOST=172.18.0.2 --env DB_USER=bootlover_user --env DB_PASSWORD=senhaSegura123 --env DB_NAME=bootlover_db --env DB_PORT=5432 --env OPENAI_API_KEY=seu-api-key
cd bootlover-frontend/
pm2 start app.js --env-production --env DB_HOST=172.18.0.2 --env DB_USER=bootlover_user --env DB_PASSWORD=senhaSegura123 --env DB_NAME=bootlover_db --env DB_PORT=5432 --env OPENAI_API_KEY=seu-api-key
npm install dotenv --save
pm2 restart bootlover-backend
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 logs bootlover-backend
cd ..
cd bootlover-backend/
npm install dotenv
pm2 restart bootlover-backend
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 logs bootlover-backend
cat .env
root@ubuntu-8gb-nbg1-1:~/bootlover-backend# cat .env
DB_HOST=172.18.0.2
DB_USER=bootlover_user
DB_PASSWORD=senhaSegura123
DB_NAME=bootlover_db
DB_PORT=5432
OPENAI_API_KEY=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
root@ubuntu-8gb-nbg1-1:~/bootlover-backend#chmod 644 .env
chmod 644 .env
npm install dotenv --save
pm2 restart bootlover-backend
pm2 logs bootlover-backend
npm list dotenv
node app.js
pm2 reset all
pm2 restart bootlover-backend --update-env
echo $DB_HOST
pm2 logs bootlover-backend
pm2 stop all
node app.js
pm2 start app.js --env production
pm2 stop 2
pm2 start ecosystem.config.js
cd ..
pm2 start ecosystem.config.js
pm2 logs bootlover-backend
pm2 flush bootlover-backend
pm2 logs bootlover-backend
pm2 restart bootlover-backend
pm2 logs bootlover-backend
pm2 start ecosystem.config.js
pm2 list
pm 2 log
pm2 log
psql -h 172.18.0.2 -U bootlover_user -d bootlover_db
apt install postgresql-client-common
psql -h 172.18.0.2 -U bootlover_user -d bootlover_db
psql -U bootlover_user -d bootlover_db
sudo apt update
psql --version
pm2 restart bootlover-backend
pm2 restart bootlover-frontend
pm2 logs bootlover-backend
pm2 restart all
pm2 stop 2
cd ~/bootlover-frontend/src
mkdir components pages
touch components/Login.js components/Register.js
pm2 restart 1
pm2 restart 0
cd ..
npm install react-router-dom
touch src/components/JogoRoleta.js src/components/JogoCartas.js
npm start
pm2 restart all
pm2 stop 2
pm2 restart 1
pm2 log
pm2 restart 1
pm2 log
cd ..
cd bootlover-backend/
npm install cors
pm2 restart bootlover-backend
pm2 restart 1
cd ..
cd bootlover-frontend/
npm install react-router-dom
pm2 restart 1
pm2 logs bootlover-backend
pm2 restart 1
pm2 logs bootlover-backend
pm2 log 1
pm2 log
pm2 restart 1
cd ..
pm2 delete 2
pm2 restall all
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 list
pm2 log 0
pm2 list
pm2 restart all
pm2 log 0
const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = new Pool({
});
// Teste de Conexão ao Banco
router.get("/test-db", async (req, res) => {
});
// Rota de Cadastro
router.post("/register", async (req, res) => {
});
// Rota de Login
router.post("/login", async (req, res) => {
});
module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = new Pool({
});
// Teste de Conexão ao Banco
router.get("/test-db", async (req, res) => {
});
// Rota de Cadastro
router.post("/register", async (req, res) => {
});
// Rota de Login
router.post("/login", async (req, res) => {
});
module.exports = router;
pm2 logs bootlover-backend
pm2 restarl all
pm2 restart all
pm2 log 0
pm2 restart 0
pm2 log 0
docker run -d -p 5432:5432 --name bootlover-db -e POSTGRES_USER=bootlover_user -e POSTGRES_PASSWORD=senhaSegura123 -e POSTGRES_DB=bootlover_db postgres:latest
docker exec -it bootlover-db bash
docker ps
docker exec -it bootlover-db bash
docker ps
docker exec -it bootlover-db bash
docker exec -it boot-lover-db bash
docker restart boot-lover-db 
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 log 0
pm2 logs
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 restart all
pm2 log
pm2 log 0
pm2 restart all
touch src/styles/layout.scss
touch src/styles/global.scss
touch src/styles/variables.scss
ls
cd boot-lover-fr
cd bootlover-frontend
touch src/styles/layout.scss
touch src/styles/global.scss
touch src/styles/variables.scss
npm install sass
npm list sass
pm2 restart all
npm install react-router-dom
pm2 log 0
pm2 restart all
pm2 restar all
pm2 restart all
cd bootlover-frontend/
npm install @mui/material @emotion/react @emotion/styled
npm install framer-motion
npm install react-spring
pm2 restart all
cd bootlover-frontend/
npm install --save @fortawesome/fontawesome-free
import '@fortawesome/fontawesome-free/css/all.min.css';
npm install --save @fortawesome/fontawesome-free
pm2 restart all
pm2 log 0
npm install react-spring
npm install react-wheel-of-prizes
npm install react-wheel-of-prizes --legacy-peer-deps
pm2 restart all
npm cache clean --force
pm2 restart all
npm install react-wheel-of-prizes --force
cd bootlover-frontend/
npm install three
npm uninstall react-wheel-of-prizes
npm install three
pm2 start all
pm2 status 1
pm2 log 1
npm install --save-dev @babel/plugin-proposal-private-property-in-object
pm2 restart bootlover-frontend
pm2 log 1
npm install sass@latest
npm uninstall node-sass
pm2 restart bootlover-frontend
pm2 log 1
HOST=0.0.0.0 npm start
pm2 restart all
cd /root/bootlover-frontend/public
ls | grep roleta-custom.png
rm -rf node_modules/.cache
npm run start
pm2 restart all
ls
cd bootlover-frontend/
npm install bootstrap
npm install react-toastify
npm install react@18 react-dom@18 react-router-dom@6
npm start --reset-cache
pm2 restart all
npm start --reset-cache
pm2 stop all
npm start --reset-cache
pm2 restart all
npm install react-toastify@latest
npm install react@latest react-dom@latest
Uncaught runtime errors:
×
ERROR
react_dom__WEBPACK_IMPORTED_MODULE_1__.render is not a function
TypeError: react_dom__WEBPACK_IMPORTED_MODULE_1__.render is not a function
npm list react react-dom
npm install react@latest react-dom@latest
pm2 restart all
npm list react react-dom
rm -rf node_modules package-lock.json
npm install react@18 react-dom@18
npm install
npm list react react-dom
pm2 restart all
pm2 log 0
pm2 list
cd bootlover-frontend/
npm install framer-motion
pm2 restart all
cd bootlover-frontend/
npm install --save @fortawesome/fontawesome-free
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core
find / -type d
find / -type f -o -type d
find /root/bootlover-frontend -type d
find /root/bootlover-frontend -type d > /tmp/caminhos_frontend.txt
cat /tmp/caminhos_frontend.txt
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
cd ..
pm2 restart all
cd bootlover-frontend/
mkdir -p src/components/{Cartas,Chat,Dashboard,EditarPerfil,Header,MenuLateral,PrivateRoute,Roleta2D,Login,Register,hooks}
# Cartas
mv src/components/Cartas.js src/components/Cartas/Cartas.js
mv src/components/Cartas.css src/components/Cartas/Cartas.css
# Chat
mv src/components/Chat.js src/components/Chat/Chat.js
# Dashboard
mv src/components/Dashboard.js src/components/Dashboard/Dashboard.js
# EditarPerfil
mv src/components/EditarPerfil.js src/components/EditarPerfil/EditarPerfil.js
# Header
mv src/components/Header.js src/components/Header/Header.js
# MenuLateral
mv src/components/MenuLateral.js src/components/MenuLateral/MenuLateral.js
mv src/components/MenuLateral.css src/components/MenuLateral/MenuLateral.css
# PrivateRoute
mv src/components/PrivateRoute.js src/components/PrivateRoute/PrivateRoute.js
# Roleta2D
mv src/components/Roleta2D.jsx src/components/Roleta2D/Roleta2D.jsx
# Login
mv src/components/Login.js src/components/Login/Login.js
# Register
mv src/components/Register.js src/components/Register/Register.js
# Hook de assinatura
mv src/components/useAssinatura.js src/components/hooks/useAssinatura.js
find src -type f -name "*.js*" -exec sed -i 's|../components/|../|' {} +
rm src/components/Home.js src/components/LateralMenu.js src/components/Roleta.js src/components/Sidebar.js
mkdir src/styles/base
mv src/styles/global.scss src/styles/variables.scss src/styles/base/
mkdir src/styles/components
mv src/styles/Header.scss src/styles/sidebar.scss src/styles/form.scss src/styles/dashboard.scss src/styles/Register.scss src/styles/Login.scss src/styles/Roleta.scss src/styles/Roleta2D.scss src/styles/chat.scss src/styles/components/
npm start --reset-cache
cd ..
pm2 restart all
cd bootlover-frontend/
npm install sass sass-loader --save-dev
npm install sass
pm2 restart all
cd bootlover-frontend/
npm install react-icons
npm install @react-spring/web
npm update
cd bootlover-frontend/
npm install gsap
npm install gsap@npm:@gsap/morphsvg-plugin
