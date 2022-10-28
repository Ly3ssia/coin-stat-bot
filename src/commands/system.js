const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sistem")
    .setDescription("Stat sistemini açıp kapatırsın!"),
    run: async (client, interaction) => {
      if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
await interaction.deferReply().catch(err => {})

  const sistem = db.fetch(`sistem_${interaction.guild.id}`);
const puan = db.fetch(`puans_${interaction.guild.id}`)
if (!puan) return interaction.followUp("Bu sunucuda sistemi aktifleştirebilmek için öncelikle terfi rol ve puanı ayarlamalısın!")
  if (sistem)  {

      db.delete(`sistem_${interaction.guild.id}`);
    return interaction.followUp("Sistem başarıyla deaktif edildi.").catch(err => {})

  }

  if (!sistem)  {

      db.set(`sistem_${interaction.guild.id}`, true);
return interaction.followUp("Sistem başarıyla aktif edildi.").catch(err => {})
  }


    }
 };
