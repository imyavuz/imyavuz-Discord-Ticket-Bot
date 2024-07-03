const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: {
        name: 'ticket',
        description: 'Yeni bir ticket oluşturur',
    },
    async execute(interaction) {
        const counterPath = path.resolve(__dirname, 'ticketCounter.json');
        
       
        let counterData = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        counterData.ticketNumber += 1;
        
       
        fs.writeFileSync(counterPath, JSON.stringify(counterData, null, 2));

        const ticketNumber = counterData.ticketNumber;
        const channelName = `ticket-${ticketNumber.toString().padStart(4, '0')}`;
        
        const channel = await interaction.guild.channels.create({
            name: channelName,
            type: 0,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['ViewChannel'],
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel'],
                },
            ],
        });

        await interaction.reply({ content: `Ticket oluşturuldu: ${channel}`, ephemeral: true });

        const closeEmbed = new EmbedBuilder()
            .setTitle('Destek Talebi')
            .setDescription('Yetkili ekibimiz birazdan sizinle iletişime geçecektir.')
            .setColor('#00FF00');

        const closeButton = new ButtonBuilder()
            .setCustomId('close-ticket')
            .setLabel('Ticket Kapat')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(closeButton);

        await channel.send(`Merhaba ${interaction.user}, size nasıl yardımcı olabiliriz? ||@everyone||`);
        await channel.send({ embeds: [closeEmbed], components: [row] });
    },
};
