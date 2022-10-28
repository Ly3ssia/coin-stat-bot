const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sıralama")
    .setDescription("Sunucundaki üyeleri sıralarsın!"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(err => {})
const systems = db.fetch(`sistem_${interaction.guild.id}`)
if (!systems) return interaction.followUp("Bu sunucuda sistem deaktif edilmiş!").catch(err => {})
          const arr = [];
           let sayi = 1;

         await interaction.guild.members.cache.filter(user => {
            if(!db.fetch(`stat_${user.id}`) || db.fetch(`stat_${user.id}`) === 0) return;

            arr.push(user.id)
       });

          const arrSıralama = arr.sort((x,y) => (db.fetch(`stat_${y}`)|| 0) - (db.fetch(`stat_${x}`))).map(x => {
            return `${sayi++}. **|** <@${x}> **|** ${db.fetch(`stat_${x}`) || 0}`
     }) || "Sıralama gözükmüyor.";

          const embe31d = new EmbedBuilder()
          .setDescription(`${(arrSıralama.splice(0, 5).join("\n")) || "Bu sunucuda yeterli konuşkan yok."}`)
           .setColor("#36393F")
          .setFooter({text: interaction.guild.name+" Sunucusunun Sıralaması!", iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
          .setAuthor({ name: "Merhaba, "+interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})

        return interaction.followUp({ embeds: [embe31d] }).catch(err => {})
    }
 };
