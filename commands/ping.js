module.exports = {
    name : 'ping',
    description : 'first individual file',
    
    execute(message, argument)
    {
        message.channel.send('pong');
    },
};
