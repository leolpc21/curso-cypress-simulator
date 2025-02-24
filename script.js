const { execSync } = require("child_process");

// Captura o argumento passado (--name=teste)
const args = process.argv.slice(2);
const nameArg = args.find(arg => arg.startsWith("--name="));

if (!nameArg) {
  console.error("Erro: Você precisa passar um nome para a branch. Exemplo: yarn nova --name=teste");
  process.exit(1);
}

const branchName = nameArg.split("=")[1];

console.log(`Criando nova branch: ${branchName}`);
execSync(`git checkout -b ${branchName}`, { stdio: "inherit" });
