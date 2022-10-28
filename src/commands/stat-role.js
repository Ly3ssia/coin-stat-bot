const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("terfi-rol")
    .setDescription("Terfi rollerini ayarlarsın!")
    .addRoleOption(option => option.setName("role").setDescription("Hangi rol verilecek?").setRequired(true))
    .addStringOption(option => option.setName("puan").setDescription("Kaç puana ulaşınca rol verilecek?").setRequired(true)),
    run: async (client, interaction) => {
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
await interaction.deferReply().catch(err => {})
const role = interaction.options.getRole("role")
const say = interaction.options.getString("puan")
const sayi = parseInt(say)
if (isNaN(sayi)) return interaction.followUp("Puana bir sayı girmelisin!")
if(sayi < 1) return interaction.followUp("Puan 1 sayısından küçük olamaz!")
db.set(`rol_${sayi}`, role.id)
db.add(`puan_${sayi}`, sayi)
db.push(`puans_${interaction.guild.id}`, sayi)
await interaction.followUp("Başarıyla rol <@&"+role.id+"> olarak, puan ise **"+sayi+"** olarak ayarlandı.").catch(err => {})

return;
    }
 };
