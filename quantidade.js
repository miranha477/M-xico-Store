const Discord = require("discord.js")
const wio = require("wio.db");
const config = new wio.JsonDatabase({ databasePath:"./config.json" });
const perms = new wio.JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db1 = new wio.JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const db2 = new wio.JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const db3 = new wio.JsonDatabase({ databasePath:"./databases/myJsonGifts.json" });
const db5 = new wio.JsonDatabase({ databasePath:"./databases/myJsonKeys.json" });

module.exports = {
  name: "criados", 
  description: "Veja seus Produtos, Cupons e Gifts criados",
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`Você **não está** na lista de pessoas!`, message)
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('db1')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Estoque')
            .setStyle('SECONDARY'),
        )
      
        const embed = new Discord.MessageEmbed()
          .setDescription(`⚡ | Escolha o tipo de **serviço** que você deseja ver`)
          .setColor(config.get(`color`))
        const msg = await message.reply({ embeds: [embed], components: [row] })
        const filter = i => i.user.id === message.author.id
        const collector = msg.createMessageComponentCollector({ filter })
        collector.on("collect", async interaction => {
          if(interaction.customId.startsWith("db")) {
            interaction.deferUpdate()
            let dbs = interaction.customId
            let itens
            let local
            let status
            
            if(dbs == "db1") {
              if(db1.all().length == 0) return embn(`Não há nenhum **produto criado** no momento!`, msg)
              itens = db1.all()
              local = "Produtos"
              status = "estoque"
            }
              
            let texto = ""
            let quant = 1
      
            for(let i in itens) {
              let item = itens[i]
              let value = item.data[status]
              let extra = local == "Cupons" ? "% de desconto" : ""
              texto += `• **${item.ID}** | Produtos no estoque: (${db1.get(`${item.ID}.conta`).length})\n`
              quant++
            }
        
            const embed = new Discord.MessageEmbed()                       
              .setTitle(`${client.user.username} | ${local} Existentes`)
              .setDescription(texto)
              .setColor(config.get(`color`))
              .setTimestamp()
            msg.edit({ embeds: [embed] })
          }
        })
    }
}