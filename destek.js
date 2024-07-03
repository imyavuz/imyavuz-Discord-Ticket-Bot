const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token, guildId } = require('./config/config');
const commandHandler = require('./handlers/commandHandler');
const buttonHandler = require('./handlers/buttonHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log(`Bot olarak giriş yapıldı: ${client.user.tag}`);

    const guild = client.guilds.cache.get(guildId);
    if (!guild) return console.error('Sunucu bulunamadı!');

    const commands = Array.from(client.commands.values()).map(command => ({
        name: command.data.name,
        description: command.data.description,
    }));

    guild.commands.set(commands)
        .then(() => console.log('Komutlar kayıt edildi!'))
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Bu komutu çalıştırırken bir hata oluştu.', ephemeral: true });
    }
});

commandHandler(client);
buttonHandler(client);

client.login(token);
