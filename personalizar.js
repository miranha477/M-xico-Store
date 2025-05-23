const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const configs = new JsonDatabase({ databasePath:"./databases/Personalizar.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "personalizar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.channel.send(`❌ | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('titulo')
            .setEmoji('<:configurar:1070443861668798615>')
            .setLabel('Título da Embed')
            .setStyle('PRIMARY'),
        );
        const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('descricao')
            .setEmoji('<:configurar:1070443861668798615>')
            .setLabel('Descrição da Embed')
            .setStyle('PRIMARY'),
        );
        const row3 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('rodape')
            .setEmoji('<:configurar:1070443861668798615>')
            .setLabel('Rodapé da Embed')
            .setStyle('PRIMARY'),
        );
        const row4 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('botao')
            .setEmoji('<:configurar:1070443861668798615>')
            .setLabel('Botão da Embed')
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('resetar')
            .setEmoji('<:configurar:1070443861668798615>')
            .setLabel('Resetar Embed')
            .setStyle('DANGER'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))], components: [row1, row2, row3, row4]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) {
           return;
          }

          if (interaction.customId === "titulo") {
            interaction.deferUpdate();
            message.channel.send("? | Qual vai ser o titulo? ( você pode utilizar #{nome} para aparecer o nome do bot )").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter });
               collector.on("collect", imagem => {
                 imagem.delete()
                 const newt = imagem.content
                 configs.set(`titulo`, newt)
                 collector.stop();
                 msg.edit(`<:sim:1061000354864574484> | Alterado para ${newt}!`)
                            
                 const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "descricao") {
            interaction.deferUpdate();
            message.channel.send("? | Qual vai ser a descrição? ( no lugar aonde vai aparecer os nomes, valores, estoques e a descrição do produto, utilize essa chaves: #{nome}, #{preco}, #{estoque}, #{desc} )").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter });
               collector.on("collect", imagem => {
                 imagem.delete()
                 const newt = imagem.content
                 configs.set(`descricao`, newt)
                 collector.stop();
                 msg.edit(`<:sim:1061000354864574484> | Alterado!`)
                            
                 const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
             
                  if (interaction.customId === "rodape") {
            interaction.deferUpdate();
            message.channel.send("? | Qual vai ser o rodapé?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter });
               collector.on("collect", imagem => {
                 imagem.delete()
                 const newt = imagem.content
                 configs.set(`rodape`, newt)
                 collector.stop();
                 msg.edit(`<:sim:1061000354864574484> | Alterado para ${newt}!`)
                            
                 const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }

             
          if (interaction.customId === "botao") {
            interaction.deferUpdate();
            message.channel.send(`? | Qual vai ser o nome escrito no botão, ex "comprar":`).then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter });
              collector.on("collect", status => {
                 status.delete()
                 const newt = status.content
                 configs.set(`botao`, newt)
                 collector.stop();
                 msg.edit(`<:sim:1061000354864574484> | Alterado para ${newt}!`)
                            
                 const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
               if (interaction.customId === "resetar") {
            interaction.deferUpdate();
              configs.set(`descricao`, `\`\`\`\n#{desc}\`\`\`\n**<a:mundo:1060994974419779624> | Nome: __#{nome}__**\n**<:valor:1061001329042010132> | Preço: __R$#{preco}__**\n**<:estoque:1061014145178288249> | Estoque: __#{estoque}__**`)
               configs.set(`titulo`, `#{nome} | Produtos`)
               configs.set(`rodape`, `Para comprar clique no botão abaixo.`)
                 message.channel.send("<:sim:1061000354864574484> | Embed Resetada!")
                            
                 const embednew = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Personalizar Mensagem de Compra`)
          .setDescription(`
**Título atual:** ${configs.get(`titulo`)}

**Descrição Atual:**
${configs.get(`descricao`)}

**Rodapé Atual:** ${configs.get(`rodape`)}
`)
          .setThumbnail(client.user.displayAvatarURL())
                   .setColor(configs.get(`color`))
                 message.channel.send({ embeds: [embednew] })
                 
             }
           })
         }
       };