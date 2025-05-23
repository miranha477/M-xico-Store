const { EmbedBuilder } = require('discord.js');

module.exports = async (client) => {
  const canalDeBoasVindas = '1373760876426821804'; // ID do canal de boas-vindas
  const cargoInicial = '1375256248651616348'; // ID do cargo automático
  const thumbnailURL = 'https://cdn.discordapp.com/icons/1331404342388981770/f9e5c5857d33e39b7e5b3e6f7140f526.png?size=2048'; // Thumbnail (logo do server)

  client.on('guildMemberAdd', async member => {
    // Tenta dar o cargo
    try {
      await member.roles.add(cargoInicial);
      console.log(`Cargo dado para ${member.user.tag}`);
    } catch (err) {
      console.error('Erro ao dar cargo:', err);
    }

    // Cria embed de boas-vindas
    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Bem-vindo à México Store!')
      .setDescription(`Salve ${member}, tá entrando no **${member.guild.name}**!`)
      .setThumbnail(thumbnailURL)
      .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setFooter({ text: 'Leia as regras.' })
      .setTimestamp();

    // Manda a embed no canal
    const canal = member.guild.channels.cache.get(canalDeBoasVindas);
    if (canal) canal.send({ embeds: [embed] });
  });
};