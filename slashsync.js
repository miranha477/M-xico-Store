const Discord = require('discord.js');

module.exports = async (client, commands, options = {
  debug: false,
  guildId: null
}) => {

  const log = (message) => options.debug && console.log(message);

  const ready = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
  await ready;
  const currentCommands = await client.application.commands.fetch(options.guildId && { guildId: options.guildId });

  log(`Comandos sincronizadores...`);
  log(`Atualmente ${currentCommands.size} comandos são registrados para o bot.`);

  const newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name));
  for (let newCommand of newCommands) {
    await client.application.commands.create(newCommand, options.guildId);
  }

  log(`Criado ${newCommands.length} comandos!`);

  const deletedCommands = currentCommands.filter((command) => !commands.some((c) => c.name === command.name)).toJSON();
  for (let deletedCommand of deletedCommands) {
    await deletedCommand.delete();
  }

  log(`Deletado ${deletedCommands.length} comandos!`);

  const updatedCommands = commands.filter((command) => currentCommands.some((c) => c.name === command.name));
  let updatedCommandCount = 0;
  for (let updatedCommand of updatedCommands) {
    const newCommand = updatedCommand;
    const previousCommand = currentCommands.find((c) => c.name === updatedCommand.name);
    let modified = false;
    if (previousCommand.description !== newCommand.description) modified = true;
    if (!Discord.ApplicationCommand.optionsEqual(previousCommand.options ?? [], newCommand.options ?? [])) modified = true;
    if (modified) {
      await previousCommand.edit(newCommand);
      updatedCommandCount++;
    }
  }

  log(`Atualizado ${updatedCommandCount} comandos!`);

  log(`Comandos sincronizados!`);

  return {
    currentCommandCount: currentCommands.size,
    newCommandCount: newCommands.length,
    deletedCommandCount: deletedCommands.length,
    updatedCommandCount
  };

};