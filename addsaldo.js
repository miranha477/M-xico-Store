const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonSaldo.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "addsaldo", 
    run: async(client, message, args) => {
    
    if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌ | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
         db.add(`${args[0]}.saldo`, `${args[1]}`)
                
 message.channel.send(`<:valor:1061001329042010132> | Valor ${args[1]} adicionado para o <@${args[0]}> `)
        
    }
}