const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "fechar",
    run: async(client, message, args) => {
  if(!message.channel.name.startsWith("🛒・carrinho-")) {
    message.reply("<a:carregando:1086858940832305182> **| Você não pode excluir este canal!**")
  } else {
    message.channel.send("<a:carregando:1086858940832305182> **| Excluindo carrinho...**").then(async msg => {
      msg.react("<a:carregando:1086858940832305182>")
      msg.react("⛔")
      
      const sim = (reaction, user) => reaction.emoji.id === "✅" && user.id === message.author.id;
      const nao = (reaction, user) => reaction.emoji.id === "⛔" && user.id === message.author.id;
      
      const s = msg.createReactionCollector(sim);
      const n = msg.createReactionCollector(nao);
      s.on("collect", async r2 => {
        message.channel.delete()
      })
      n.on("collect", async r2 => {
        msg.delete()
        
      })
   })
  }
}
}