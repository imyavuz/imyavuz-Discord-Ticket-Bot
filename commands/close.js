module.exports = {
    data: {
        name: 'close',
        description: 'Ticketı kapatır',
    },
    async execute(interaction) {
        if (interaction.channel.name.includes('ticket')) {
            try {
                
                const newChannelName = interaction.channel.name.replace('ticket', 'closed');
                await interaction.channel.setName(newChannelName);

                
                await interaction.channel.permissionOverwrites.set([
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: 'YOUR-ADMIN-ROLE-ID',
                        allow: ['ViewChannel'],
                    },
                ]);

                await interaction.reply({ content: 'Ticket başarıyla kapatıldı. Sadece yöneticiler görebilir.', ephemeral: true });
            } catch (error) {
                console.error('Ticket kapatılırken hata:', error);
                await interaction.reply({ content: 'Ticket kapatılırken bir hata oluştu.', ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'Bu bir ticket kanalı değil!', ephemeral: true });
        }
    },
};
