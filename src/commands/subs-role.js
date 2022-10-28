const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("abone-rol")
    .setDescription("Abone sistemini ayarlarsın!")
    .addRoleOption(option => option.setName("abone").setDescription("Hangi rol verilecek?").setRequired(true))
    .addRoleOption(option => option.setName("yetkili").setDescription("Kimler rol verebilecek?").setRequired(true)),
    run: async (client, interaction) => {
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
await interaction.deferReply().catch(err => {})
const abone = interaction.options.getRole("abone")
const yetkili = interaction.options.getRole("yetkili")
db.set(`asistem_${interaction.guild.id}`, {abone: abone.id, yetkili: yetkili.id})
await interaction.followUp("Başarıyla abone rolü <@&"+abone.id+"> olarak, yetkili rolü ise <@&"+yetkili.id+"> olarak ayarlandı.")
return;
    }
 };
