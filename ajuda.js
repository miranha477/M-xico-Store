const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "ajuda",
    run: async(client, message, args) => {        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('retornar')
            .setEmoji('<:vlt:1020930289528209438>')
            .setLabel('')
            .setDisabled(true)
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('SLALS')
            .setLabel(' Página 1 ')
            .setDisabled(true)
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('proxima')
            .setEmoji('<:next:1015727899082510498>')
            .setLabel('')
            .setDisabled(false)
            .setStyle('PRIMARY'),
        )

        
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Meus Comandos`)
          .setDescription(`
<a:mundo:1060994974419779624> | ajuda \`\`\`\nVeja meus comandos \`\`\`
<a:mundo:1060994974419779624> | painel \`\`\`\nTudo para iniciar o bot \`\`\`
<a:mundo:1060994974419779624> | botinfo \`\`\`\nVeja minhas info\`\`\`
<a:mundo:1060994974419779624> | info \`\`\`\nVeja info de uma compra\`\`\`
<a:mundo:1060994974419779624> | perfil \`\`\`\nVeja seu perfil\`\`\`
<a:mundo:1060994974419779624> | status \`\`\`\nVeja os status de vendas\`\`\`
<a:mundo:1060994974419779624> | rendimentos \`\`\`\nVeja seus rendimentos\`\`\`
<a:mundo:1060994974419779624> | pegar \`\`\`\nVeja um produto entregue\`\`\`
<a:mundo:1060994974419779624> | pagar \`\`\`\nSete um id para pago\`\`\`
<a:mundo:1060994974419779624> | criarcupom \`\`\`\nCrie um cupom\`\`\`
<a:mundo:1060994974419779624> | configcupom \`\`\`\nGerencie um cupom\`\`\`
<a:mundo:1060994974419779624> | limpar \`\`\`\nApague as mensagens do chat\`\`\`
<a:mundo:1060994974419779624> | produtos \`\`\`\nVem todos id dos Produtos\`\`\`
<a:mundo:1060994974419779624> | anunciar \`\`\`\nenvia uma embed por perguntas\`\`\`
<a:mundo:1060994974419779624> | taxa \`\`\`\nmuda a taxa do mercado pago\`\`\`
<a:mundo:1060994974419779624> | rank \`\`\`\nmostra o rank dos seus clientes\`\`\`
<a:mundo:1060994974419779624> | criados \`\`\`\nmostra os (gift,cupons,produtos) criados\`\`\`
<a:mundo:1060994974419779624> | gift\`\`\`\ngera um gift card de Produtos\`\`\`
<a:mundo:1060994974419779624> | resgatar\`\`\`\nresgata um gift card\`\`\`
<a:mundo:1060994974419779624> | ligados\`\`\`\nliga ou desliga os sistemas\`\`\`
<a:mundo:1060994974419779624> | produtos\`\`\`\nmostra todos os produtos cadastrados\`\`\`
<a:mundo:1060994974419779624> | close\`\`\`\nfecha um carrinho bugado\`\`\`
<a:mundo:1060994974419779624> | quantidade\`\`\`\nverifica quantos estoques tem em cada produto.\`\`\`
`)
          .setTimestamp()
          .setFooter(`Pagina 1/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", })
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) { return; }
            if (interaction.customId === 'retornar') {
              interaction.deferUpdate();
              row.components[1].setLabel(' Página 1 ')
              row.components[0].setDisabled(true)
              row.components[2].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setDescription(`
<a:mundo:1060994974419779624> | ajuda \`\`\`\nVeja meus comandos \`\`\`
<a:mundo:1060994974419779624> | painel \`\`\`\nTudo para iniciar o bot \`\`\`
<a:mundo:1060994974419779624> | botinfo \`\`\`\nVeja minhas info\`\`\`
<a:mundo:1060994974419779624> | info \`\`\`\nVeja info de uma compra\`\`\`
<a:mundo:1060994974419779624> | perfil \`\`\`\nVeja seu perfil\`\`\`
<a:mundo:1060994974419779624> | status \`\`\`\nVeja os status de vendas\`\`\`
<a:mundo:1060994974419779624> | rendimentos \`\`\`\nVeja seus rendimentos\`\`\`
<a:mundo:1060994974419779624> | pegar \`\`\`\nVeja um produto entregue\`\`\`
<a:mundo:1060994974419779624> | pagar \`\`\`\nSete um id para pago\`\`\`
<a:mundo:1060994974419779624> | criarcupom \`\`\`\nCrie um cupom\`\`\`
<a:mundo:1060994974419779624> | configcupom \`\`\`\nGerencie um cupom\`\`\`
<a:mundo:1060994974419779624> | limpar \`\`\`\nApague as mensagens do chat\`\`\`
<a:mundo:1060994974419779624> | produtos \`\`\`\nVem todos id dos Produtos\`\`\`
<a:mundo:1060994974419779624> | anunciar \`\`\`\nenvia uma embed por perguntas\`\`\`
<a:mundo:1060994974419779624> | taxa \`\`\`\nmuda a taxa do mercado pago\`\`\`
<a:mundo:1060994974419779624> | rank \`\`\`\nmostra o rank dos seus clientes\`\`\`
<a:mundo:1060994974419779624> | criados \`\`\`\nmostra os (gift,cupons,produtos) criados\`\`\`
<a:mundo:1060994974419779624> | gift\`\`\`\ngera um gift card de Produtos\`\`\`
<a:mundo:1060994974419779624> | resgatar\`\`\`\nresgata um gift card\`\`\`
<a:mundo:1060994974419779624> | ligados\`\`\`\nliga ou desliga os sistemas\`\`\`
<a:mundo:1060994974419779624> | produtos\`\`\`\nmostra todos os produtos cadastrados\`\`\`
<a:mundo:1060994974419779624> | close\`\`\`\nfecha um carrinho bugado\`\`\`
<a:mundo:1060994974419779624> | quantidade\`\`\`\nverifica quantos estoques tem em cada produto.\`\`\`
`)
                .setTimestamp()
                .setFooter(`Pagina 1/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
            }
             
            if (interaction.customId === 'proxima') {
              interaction.deferUpdate();
              row.components[1].setLabel(' Página 2 ')
              row.components[2].setDisabled(true)
              row.components[0].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setDescription(`
<a:mundo:1060994974419779624> | criar\`\`\`\nCrie um anuncio\`\`\`
<a:mundo:1060994974419779624> | setar\`\`\`\nSete um anuncio\`\`\`
<a:mundo:1060994974419779624> | config\`\`\`\nGerencie um anuncio\`\`\`
<a:mundo:1060994974419779624> | estoque\`\`\`\nGerencie um estoque\`\`\`
<a:mundo:1060994974419779624> | configbot\`\`\`\nConfigura o bot\`\`\`
<a:mundo:1060994974419779624> | configcanais\`\`\`\nConfigura os canais\`\`\`
<a:mundo:1060994974419779624> | configstatus\`\`\`\nConfigura os status\`\`\`
<a:mundo:1060994974419779624> | permadd\`\`\`\nAdicione um administrador\`\`\`
<a:mundo:1060994974419779624> | donoadd\`\`\`\nAdicione um dono\`\`\`
<a:mundo:1060994974419779624> | permdel\`\`\`\nRemova um administrador\`\`\`
<a:mundo:1060994974419779624> | donodel\`\`\`Remova um dono do bot\`\`\`
<a:mundo:1060994974419779624> | setavatar\`\`\`\nmuda o avatar do bot\`\`\`
<a:mundo:1060994974419779624> | gerarkey\`\`\`\ncria key para um cargo\`\`\`
<a:mundo:1060994974419779624> | resgatarkey\`\`\`\nresgata um cargo\`\`\`
<a:mundo:1060994974419779624> | quantidade\`\`\`\nmostra a quantidade de cada estoque\`\`\`
<a:mundo:1060994974419779624> | tempo\`\`\`\nedita o tempo de pagamento\`\`\`
<a:mundo:1060994974419779624> | addsaldo\`\`\`\nadiciona saldo a um usuario: !saldo <id da pessoa> <valor>\`\`\`
<a:mundo:1060994974419779624> | saldo\`\`\`\nverifica seu saldo\`\`\`
<a:mundo:1060994974419779624> | delsaldo\`\`\`\nremove todo saldo do usuario pelo id\`\`\`
<a:mundo:1060994974419779624> | registrar\`\`\`\nse registra para utilizar os sistemas de saldo\`\`\`
<a:mundo:1060994974419779624> | excluir\`\`\`\nDeleta um produto pelo id\`\`\`
<a:mundo:1060994974419779624> | reembolsar\`\`\`\nReembolsa uma venda pelo id\`\`\`
<a:mundo:1060994974419779624> | pagamento\`\`\`\nPainel de configurações de saldo\`\`\`
<a:mundo:1060994974419779624> | cores\`\`\`\nAltera a cor do botão de comprar\`\`\`
<a:mundo:1060994974419779624> | personalizar\`\`\`\nPersonaliza a embed de venda\`\`\`
`)
                .setTimestamp()
                .setFooter(`Pagina 2/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
              }
            })
          }
        }