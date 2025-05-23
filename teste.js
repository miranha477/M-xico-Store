module.exports = {
  name: "teste",
  description: "Testando.",
    options: [
    {
      name: 'teste',
      description: 'Ex nitro124',
      type: 'STRING',
      required: true,
    },
  ],
        run: async (client, interaction) => {
  
    interaction.reply({ content: "Estou ativo", ephemeral: true });
     
  }
}
