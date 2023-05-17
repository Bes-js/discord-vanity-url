// The project is GPL-3 Licensed and unauthorized sharing is prohibited.

const { Client,Events, GatewayIntentBits, Partials } = require("discord.js"); // In this part, we integrate our discord.js package into our project and enter the values we will import into it.
const config = require("./five_config"); // In this part, we define our five_config.js file and make it ready to pull the data.

const client = new Client({ // In this part, we create a discord bot client.
intents:Object.keys(GatewayIntentBits), // we define the intents of our bot.
partials:Object.keys(Partials) // we define the partials of our bot.
});

const { VanityClient } = require("discord-url"); // In this part, we integrate the discord-url package that we will use to get the url.
const urlClient = new VanityClient(config.selfBotToken,config.guildId,true); // We are creating a client using the discord-url package.

// In this part, we give a viewer to the bot we created and run the server change, that is, the "guildMemberUpdate" event.
client.on(Events.GuildUpdate,async (oldGuild,newGuild) => { 
if(oldGuild.id == config.guildId && oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
// In this part, we change our url using the .setVanityURL command given to change the url in the discord-url package.
urlClient.setVanityURL(config.vanityUrlCode);    
}
});

// In this part, we understand that our url has been successfully set by triggering the "VanitySuccess" event in the discord-url package.
urlClient.on("VanitySuccess", async(res) => {

// and we send a notification message to our console
console.log(`The server url with code ${res.vanityURL} has been set successfully!`);
})
    
// In this part, we understand that an error occurred while trying to set our url by triggering the "VanityError" event in the discord-url package.
urlClient.on('VanityError', async(err) => {

// and we send a notification message to our console   
console.log(`An error occurred while setting the server url with code ${config.vanityUrlCode}!\nError; ${err.error}`);
})

// In this part, we add the client.login command and enter our token in order to activate our bot.
client.login(config.botToken);
