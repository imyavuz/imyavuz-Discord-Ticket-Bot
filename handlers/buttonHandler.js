module.exports = (client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;

        const { customId } = interaction;
        if (customId === 'create-ticket') {
            const command = client.commands.get('ticket');
            if (command) await command.execute(interaction);
        }

        if (customId === 'close-ticket') {
            if (interaction.channel.name.includes('ticket')) {
                const command = client.commands.get('close');
                if (command) await command.execute(interaction);
            } else {
                await interaction.reply({ content: 'Bu bir ticket kanalı değil!', ephemeral: true });
            }
        }
    });
};
