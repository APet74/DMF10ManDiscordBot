const botSettings = require("./config.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Bot is Running in Ready State  ${bot.user.username}`);
   try{
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
   }catch(e) {
      console.log(e.stack);
   }
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command == `${prefix}ban`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(args[0])
            .setDescription(`Banned for ${args[1]}`)
            .setColor("#ff0000")
            .addField("Banned by:", `${message.author.username}#${message.author.discriminator}`)
            .addField("Time of Ban", `${message.author.createdAt}`);

            message.channel.send(embed)
    }
});

bot.login(botSettings.token);
