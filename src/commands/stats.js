const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bilgim")
    .setDescription("Kendin hakkında bilgi edinirsin!"),
    run: async (client, interaction) => {
      await interaction.deferReply().catch(e => {})
    const sistem = db.get(`sistem_${interaction.guild.id}`)
    if (!sistem) return interaction.followUp("Bu sunucuda sistem açılmamış!").catch(e => {})
    const data = db.fetch(`stat_${interaction.user.id}`) || "0"
    const puan = db.fetch(`puans_${interaction.guild.id}`)
    const mesaj = db.fetch(`mesaj_${interaction.user.id}`) || "0"
    const best = puan.sort((a,b) => Math.abs(a - data) - Math.abs(b - data))
    if(data > best[0]) {
      const bests = puan.sort((a,b) => Math.abs(data > a) - Math.abs(data > b))
const part = Math.floor((data / bests[0]) * 5);
const role = db.fetch(`rol_${bests[0]}`)
const date = db.fetch(`date_${interaction.user.id}`) || "Yok"
const embed = new EmbedBuilder()
.setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
.setColor("Orange")
.addFields({name: "Puan", value: `${data}`, inline: true})
.addFields({name: "Toplam Mesajın", value: `${mesaj}`, inline: true})
.addFields({name: `Durumun`, value: ` ${'<:emoj2:1035265368253546606>'.repeat(part) + '<:gmbar2:1035264372517371944>'.repeat(5 - part)}`, inline: true})
.addFields({name: "Sıradaki Rol", value: `<@&${role}>`, inline: true})
.addFields({name: "Terfi Alınacak Puan", value: `${bests[0]}`, inline: true})
.setImage("https://cdn.discordapp.com/attachments/997487955860009038/1009062859889705062/Baslksz-1.png")
return interaction.followUp({embeds: [embed]}).catch(e => {})
    }
    if(data < best[0]) {
    const part = Math.floor((data / best[0]) * 5);
   const role = db.fetch(`rol_${best[0]}`)
   const embed = new EmbedBuilder()
   .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
   .setColor("Orange")
   .addFields({name: "Puan", value: `${data}`, inline: true})
   .addFields({name: "Toplam Mesajın", value: `${mesaj}`, inline: true})
   .addFields({name: `Durumun`, value: ` ${'<:emoj2:1035265368253546606>'.repeat(part) + '<:gmbar2:1035264372517371944>'.repeat(5 - part)}`, inline: true})
   .addFields({name: "Sıradaki Rol", value: `<@&${role}>`, inline: true})
   .addFields({name: "Terfi Alınacak Puan", value: `${best[0]}`, inline: true})
   .setImage("https://cdn.discordapp.com/attachments/997487955860009038/1009062859889705062/Baslksz-1.png")
   return interaction.followUp({embeds: [embed]}).catch(e => {})
 }
    }
 };
