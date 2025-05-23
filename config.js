const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const metodo = new JsonDatabase({ databasePath:"./databases/myJsonMetodo.json" });

module.exports = {
    name: "config", 
    run: async(client, message, args) => {
        if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:mundo:1060994974419779624> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(!args[0]) return message.reply(`<a:mundo:1060994974419779624> | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[1]) return message.reply(`<a:mundo:1060994974419779624> | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:mundo:1060994974419779624> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        const adb = args[0];
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('nomegerenciar')
                    .setEmoji('<a:mundo:1060994974419779624>')
                    .setLabel('NOME')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('precogerenciar')
                    .setEmoji('<:valor:1061001329042010132>')
                    .setLabel('VALOR')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('descgerenciar')
                    .setEmoji('<:docs:1061068251817332787>')
                    .setLabel('DESCRIÇÃO')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('estoque1')
                    .setEmoji('<:estoque:1061014145178288249>')
                    .setLabel('ESTOQUE')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('arquivo')
                    .setEmoji('<:configurar:1070443861668798615>')
                    .setLabel('ARQUIVO')
                    .setStyle('SUCCESS'),
            );
            
            
            const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ativar')
                    .setEmoji('<:sim:1061000354864574484>')
                    .setLabel('Ativar Cupom')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('desativar')
                    .setEmoji('<:nao:1061000398011371530>')
                    .setLabel('Desativar Cupom')
                    .setStyle('SECONDARY'),
            );
            
            const row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('deletegerenciar')
                    .setEmoji('<:copiar:1062574463218110514>')
                    .setLabel('Banner Personalizado')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('cor')
                    .setEmoji('<:configurar:1070443861668798615>')
                    .setLabel('Cor Personalizado')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rlgerenciar')
                    .setEmoji('<a:loading:1067015746812649563>')
                    .setLabel('Atualizar')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('ex')
                    .setEmoji('<:deletar:1061000613619564605>')
                    .setLabel('Excluir')
                    .setStyle('DANGER'),
            );
        
        const msg = await message.channel.send({ embeds: [new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
            .setDescription(`
<a:mundo:1060994974419779624>️ | Descrição: ${db.get(`${adb}.desc`)}
<a:mundo:1060994974419779624> | Nome: ${db.get(`${adb}.nome`)}
<a:mundo:1060994974419779624> | Preço: R$${db.get(`${adb}.preco`)} Reais`)
          .setImage(`${db.get(`${adb}.imagem`)}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(db.get(`${adb}.color`))], components: [row, row2, row1] })
        
            const interação = msg.createMessageComponentCollector({
               componentType: "BUTTON",
            })
  
            interação.on("collect", async (interaction) => {
               if (message.author.id != interaction.user.id) {
               return;
            }
                
                if (interaction.customId === "deletegerenciar") {
                    interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Envie o link da imagem`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.imagem`, `${message.content}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                        })
                    })
                }
                    if (interaction.customId === 'rlgerenciar') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
           .setDescription(`
<:infor:1061000209536131072>️ | Descrição: ${db.get(`${adb}.desc`)}
<a:mundo:1060994974419779624> | Nome: ${db.get(`${adb}.nome`)}
<:valor:1061001329042010132> | Preço: R$${db.get(`${adb}.preco`)} Reais`)
          .setImage(`${db.get(`${adb}.imagem`)}`)
           .setThumbnail(client.user.displayAvatarURL())
           .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           message.channel.send(`<a:mundo:1060994974419779624> | Atualizado!`)
                }
                if (interaction.customId === "ativar") {
                    interaction.deferUpdate();
                            db.set(`${adb}.cup`, `false`)
                            msg.channel.send(`<a:mundo:1060994974419779624> | Ativado!`)
                        }
                         if (interaction.customId === "ex") {
                    interaction.deferUpdate();
                            db.delete(`${adb}`)
                            message.channel.bulkDelete(10);
                            msg.channel.send(`<:deletar:1061000613619564605> | Excluido!`)
                        }
                        
                if (interaction.customId === "desativar") {
                    interaction.deferUpdate();
                            db.set(`${adb}.cup`, `true`)
                            msg.channel.send(`<a:mundo:1060994974419779624> | Desativado!`)
                        }
                        
                if (interaction.customId === "estoque1") {
                    interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Utilize o comando !estoque`)
                }
                if (interaction.customId === "precogerenciar") {
                   interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Qual o novo preço?`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.preco`, `${message.content.replace(",", ".")}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                        })
                    })
                }
                if (interaction.customId === "nomegerenciar") {
        interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Qual o novo nome?`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.nome`, `${message.content}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                        })
                    })
                }
                 if (interaction.customId === "arquivo") {
        interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Envie abaixo o texto que a pessoa vai receber se comprar **esse** produto:`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter });
                        collector.on("collect", message => {
                            message.delete()
                            metodo.set(`${adb}.produto`, `${message.content}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                            collector.stop();
                        })
                    })
                }
                
    if (interaction.customId === 'descgerenciar') {
        interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Qual a nova descrição?`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, `${message.content}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                        })
                    })
                }
    if (interaction.customId === 'cor') {
        interaction.deferUpdate();
                    msg.channel.send(`<a:mundo:1060994974419779624> | Envie a cor abaixo(tem que ser em hrex) ex: 00ff00 = verde`).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.color`, `${message.content}`)
                            msg.edit(`<a:mundo:1060994974419779624> | Alterado!`)
                        })
                    })
                }
              })
            }
           } 