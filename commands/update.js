module.exports = {
    name : 'update',
    description : 'updates discordBot and reinitializes it if needed',

    execute(message, argument)
    {
        var shell = require('shelljs');
        message.channel.send('updating...');
        shell.exec('sleep 1s');
        shell.exec('sudo shutdown -r');
    },
};