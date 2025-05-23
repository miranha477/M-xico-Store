const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "permdel",
    run: async(client, message, args) => {
      const user = args[0]
      if (message.author.id !== config.get(`owner`)) return message.reply(`<:nao:1061000398011371530> | Apenas o dono do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<:nao:1061000398011371530> | Você não selecionou ninguem!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<:nao:1061000398011371530> | Você não pode selecionar duas pessoas de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(user !== `${perms.get(`${user}_id`)}`) return message.reply(`<:nao:1061000398011371530> | Essa pessoa não tem permissão ainda!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(isNaN(args)) return message.reply(`<:nao:1061000398011371530> | Você só pode adicionar IDs!`)
        
      message.reply(`<:sim:1061000354864574484> | Usuário removido!`)
      perms.delete(`${user}_id`)
    }
}