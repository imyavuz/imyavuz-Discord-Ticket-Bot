const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: 'ticket-setup',
        description: 'Ticket açma butonunu kurar',
    },
    async execute(interaction) {
        const setupEmbed = new EmbedBuilder()
            .setTitle('Destek Talebi Oluştur')
            .setDescription('Ticket oluşturmak için aşağıdaki butona tıklayın.')
            .setColor('#00FF00');

        const ticketButton = new ButtonBuilder()
            .setCustomId('create-ticket')
            .setLabel('Ticket Aç')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(ticketButton);
        

        
        await interaction.channel.send({ embeds: [setupEmbed], components: [row] });


    },
};
