const Discord = require("discord.js");
const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, WebhookClient } = require("discord.js");
const discordModals = require('discord-modals');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { joinVoiceChannel } = require('@discordjs/voice');
const ms = require("ms");
const fs = require("fs");
const mercadopago = require("mercadopago");
const axios = require("axios");
const moment = require("moment");
moment.locale("pt-br");

const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./databases/myJsonProdutos.json" });
const dbs = new JsonDatabase({ databasePath: "./databases/myJsonSaldo.json" });
const dbS = dbs; // mesma instância
const dbc = new JsonDatabase({ databasePath: "./databases/myJsonCupons.json" });
const dbP = new JsonDatabase({ databasePath: "./databases/myJsonPay.json" });
const dbV = new JsonDatabase({ databasePath: "./databases/myJsonAvaliar.json" });
const dbT = new JsonDatabase({ databasePath: "./databases/myJsonTermos.json" });
const db2 = new JsonDatabase({ databasePath: "./databases/myJsonDatabase.json" });
const persos = new JsonDatabase({ databasePath: "./databases/Personalizar.json" });
const db3 = new JsonDatabase({ databasePath: "./databases/myJsonIDs.json" });
const dbL = new JsonDatabase({ databasePath: "./databases/myJsonLigados.json" });
const nv = new JsonDatabase({ databasePath: "./databases/myJsonS.json" });
const id = new JsonDatabase({ databasePath: "./databases/myJsonCard.json" });
const perms = new JsonDatabase({ databasePath: "./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath: "./config.json" });
const tempo = new JsonDatabase({ databasePath: "./databases/myJsonTempo.json" });
const metodo = new JsonDatabase({ databasePath: "./databases/myJsonMetodo.json" });
const perso = new JsonDatabase({ databasePath: "./databases/myJsonPerso.json" });
const blacklist = new JsonDatabase({ databasePath: "./databases/Blacklist.json" });

const client = new Client({ intents: 32767 });
client.interactions = new Collection();
client.register_arr = [];

// Slash Commands
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, { name: commandName, ...props });
    client.register_arr.push(props);
  });
});

// Interações
client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const command = client.interactions.get(interaction.commandName);
    if (!command) return interaction.reply({ content: "Comando não registrado!", ephemeral: true });
    command.run(client, interaction);
  }
});

// Prefix Commands
client.on('messageCreate', message => {
  if (message.author.bot || message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.get("prefix").toLowerCase())) return;

  const args = message.content.slice(config.get("prefix").length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./prefix/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {}
});

// Slash Sync
const register = require('./utils/slashsync');
client.on('ready', async () => {
  await register(client, client.register_arr.map(cmd => ({
    name: cmd.name,
    description: cmd.description,
    options: cmd.options,
    type: 'CHAT_INPUT'
  })), { debug: true });

  console.clear();
  console.log(`🤍 | Bot ligado com sucesso`);
  client.user.setActivity(`${config.get("status")}`, { type: "STREAMING", url: "https://twitch.tv/discord" });

  // Webhook aplicação ligada
  const apl = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const webhook = new WebhookClient({ url: "" }); // Adicione a URL do seu webhook
  webhook.send({
    embeds: [
      new MessageEmbed()
        .setColor("#ff7f27")
        .setTitle(`Aplicação Ligada`)
        .setAuthor(`${config.get("title")} - (${apl})`, client.user.displayAvatarURL())
        .setDescription(`
> **Nome/id:** ${config.get("title")} (\`${client.user.id}\`)
> **Tempo do bot:** <t:${config.get("tempo")}:f> (<t:${config.get("tempo")}:R>)
> **Link da Aplicação:** ||https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot||
> **Ultimas Logs:**
\`\`\`
[ / | Slash Command ] - ✅ Carregado todos os comandos de Slash!
🤍 | Bot Ligado com sucesso
\`\`\``)
        .setThumbnail(client.user.displayAvatarURL())
    ]
  });
});

// Limpeza de arquivos .txt a cada 4 horas
function verificarArquivos() {
  const arquivos = fs.readdirSync("./");
  arquivos.forEach(arquivo => {
    if (arquivo.endsWith(".txt")) {
      fs.unlinkSync(`./${arquivo}`);
    }
  });
}
setInterval(verificarArquivos, 14400000);

// Tratamento de erros
process.on('unhandledRejection', (reason, p) => {
  console.log('❌  | Erro não tratado');
  console.log(reason, p);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log('❌  | Múltiplos resolves detectados');
  console.log(type, promise, reason);
});
process.on('uncaughtException', (err, origin) => {
  console.log('❌  | Erro não capturado');
  console.log(err, origin);
});
process.on('uncaughtExceptionMonito', (err, origin) => {
  console.log('❌  | Monitor de exceção capturou erro');
  console.log(err, origin);
});

client.login(config.get("token"));