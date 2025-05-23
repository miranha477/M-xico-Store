const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "botinfo",
    run: async(client, message, args) => {
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Minhas informações`)
        .setDescription(`
Olá, me chamo **[${config.get(`title`)}](https://vision.squareweb.app)**, sou um bot de vendas automáticas avançado, eu fui desenvolvido para facilitar a vida dos meus clientes, e estou recebendo atualizações novas sempre que possivel.

・📌 | Desenvolvedor:lina
・📌 | Linguagem: [Node.js](https://nodejs.org/en/)
・📌 | Bot de Vendas automaticas
・📌 | Versão: 9.0.1`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
    }
  }