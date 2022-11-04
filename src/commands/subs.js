const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("abone-ver")
    .setDescription("Birine abone rolü verirsin!")
    .addUserOption(option => option.setName("user").setDescription("Kime abone rolü verilecek?").setRequired(true)),
        run: async (client, interaction) => {
await interaction.deferReply().catch(e => {})
        const system = db.fetch(`asistem_${interaction.guild.id}`)
        if (!system) return interaction.followUp("Bu sunucuda abone sistemi ayarlanmamış!").catch(e => {})
        const mod = system.yetkili
        const a = system.abone
      if(!interaction.member.roles.cache.has(mod)) return interaction.followUp({content: "Abone yetkilisi rolün yok!", ephemeral: true}).catch(e => {})
    const user = interaction.options.getMember("user")
      if(user.roles.cache.has(a)) return interaction.followUp("Bu kullanıcıda zaten abone rolü var!").catch(e => {})
      if(interaction.user.id === user.id) return interaction.followUp("Kendine abone rolü veremezsin.").catch(e => {})
      db.add(`stat_${interaction.user.id}`, +5)
      const embed = new EmbedBuilder()
      .setDescription("Başarıyla kullanıcıya abone rolü verildi.\n\nSenin hesabına 5 coin eklendi.")
      .setColor("Gold")
      interaction.guild.members.cache.get(user.id).roles.add(a).catch(e => {})
      await interaction.followUp({embeds: [embed]}).catch(e => {})
      return;
    }
 };
