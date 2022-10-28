const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const token = config.token;
const db = require("croxydb")
client.commands = new Collection()
const rest = new REST({ version: '10' }).setToken(token);
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})
client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})
readdirSync('./src/events').forEach(async file => {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
client.login(token)
client.on("voiceStateUpdate", async(newMember, oldMember) => {
setInterval(async () => {
  if (newMember.member.voice.channel === null) return;
db.add(`stat_${newMember.id}`, 5)
}, 15000);

})
client.on("messageCreate", message => {
if (message.author?.bot) return; //bu satırda hata alırsanız silin.
const data = db.fetch(`sistem_${message.guild.id}`)
if (!data) return;
const userdata = db.fetch(`stat_${message.author.id}`)
const puan = db.fetch(`puan_${userdata}`)
const role = db.fetch(`rol_${userdata}`)
db.add(`stat_${message.author.id}`, 0.5)
db.add(`mesaj_${message.author.id}`, 1)
if (puan === userdata) {
  const as = db.fetch(`stat_${message.author.id}`)
  if (role === undefined) return;
  message.guild.members.cache.get(message.author.id).roles.add(role).catch(e => {})
  message.reply("Başarıyla **"+puan+"** puanına ulaştığın için sana <@&"+role+"> rolünü verdim.")
}

})
