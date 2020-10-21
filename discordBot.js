//get the modules
const Discord = require('discord.js');
const shell = require('shelljs');
const fsystem = require('fs');

//get config file
const {token, prefix} = require('./config.json');

//create instances
const gamerBot = new Discord.Client();

//set up command retrieval
gamerBot.commands = new Discord.Collection();
const commandFiles = fsystem.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    //for loop iterates thru the array created above
    const command = require(`./commands/${file}`);
    gamerBot.commands.set(command.name, command);
}

//login to channel
gamerBot.login(token)

//create message events here==========================================================================================
gamerBot.once('ready', () => {
    console.log("connected as " + gamerBot.user.tag);
})

gamerBot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const mesContent = message.content.slice(prefix.length).split(/ +/);
    const command = mesContent.shift().toLowerCase();

    //updater command only for use with Raspberry Pi implementation
    if(command === 'update' && message.member.permissions.has('ADMINISTRATOR')){
        gamerBot.commands.get('update').execute(message, mesContent);
    }//updater command requires special permission to run so it is placed outside of the switch

    switch(command){
        case 'ping':    gamerBot.commands.get('ping').execute(message, mesContent);
                        break;
        case 'roll':    gamerBot.commands.get('diceroll').execute(message, mesContent);
                        break;
        default:        break;
    }
});

