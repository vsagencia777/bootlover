module.exports = {
  apps: [
    {
      name: "bootlover-backend", // Nome do seu app backend
      script: "./bootlover-backend/app.js", // Caminho para o arquivo app.js do backend
      env: {
        NODE_ENV: "production", // Defina o ambiente como 'production'
        DB_HOST: "172.18.0.2", // Variáveis de ambiente
        DB_USER: "bootlover_user",
        DB_PASSWORD: "senhaSegura123",
        DB_NAME: "bootlover_db",
        DB_PORT: "5432",
        OPENAI_API_KEY: "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"
      },
      watch: true, // Opcional: caso queira monitorar alterações no código
    },
    {
      name: "bootlover-frontend", // Nome do seu app frontend
      script: "npm", // Usando npm para iniciar o frontend
      args: "start", // Comando para iniciar o servidor React
      cwd: "./bootlover-frontend", // Caminho para a pasta do frontend
      env: {
        NODE_ENV: "production",
      },
      watch: true, // Opcional: caso queira monitorar alterações no código
    },
  ],
};
