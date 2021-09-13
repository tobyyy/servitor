// Require the necessary discord.js classes
import {Client, Intents, Interaction} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

const {token} = require("./../config.json");

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

const commands = [
    new SlashCommandBuilder().setName("ping").setDescription("Replies with pong!"),
    new SlashCommandBuilder().setName("server").setDescription("Replies with server info!"),
    new SlashCommandBuilder().setName("user").setDescription("Replies with user info!"),
]
    .map(command => command.toJSON());

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;

    switch (commandName) {
        case "ping":
            await interaction.reply("Pong!");
            break;
        case "server":
            if (!interaction.guild) {
                console.warn("Got null guild in server command")
                break;
            }
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
            break;
        case "user":
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
            break;

    }
});

// Login to Discord with your client"s token
client.login(token);
