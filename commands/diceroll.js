module.exports = {

    //todo: add rng salt
    name : 'diceroll',
    description : 'rolls dice according to user input |how many dice|separator|how many faces to each die|',

    execute(message, argument){
        var isValid = true; //sentinel
        const MIN = 1;
        var max = 1;
        var dice = 1;
        var diceInfo = message.content.split(' ')[1]; //gets the dice information from the roll message
        var rollResult = '| '; //nice format for roll results

        function getRoll(minimum, maximum){//function for randomizing rolls will update with better seeding
            return Math.floor(Math.random() * (maximum)) + minimum;
        }

        if(diceInfo === undefined)//check for blank message after roll
            isValid = false; //if message is blank, kill the rest of the process and send default msg
        else
            diceInfo = diceInfo.toLowerCase(); //make message lowercase if it exists

        //begin process
        if(isValid){
            try{//try catch for every possible error such as NaN or broken limits, also adds admin only limits                
                if(isNaN(diceInfo.split('d')[0]) || isNaN(diceInfo.split('d')[1])){
                    throw "incorrect format";
                } 
                else{
                    dice = diceInfo.split('d')[0];
                    max = diceInfo.split('d')[1];
                }
                if(dice < 1 || max < 2) throw "Number is too small";
                if(!message.member.permissions.has('ADMINISTRATOR') && (dice > 10 || max > 1000)) throw "only Admin can throw that many dice";
            }
            catch(err){//if any limit is broken kill everything and inform the user
                isValid = false;
                message.channel.send(err + ' please format your command correctly, for example \'!roll 2d6\'');
            }
            if(isValid){//once everything has been checked we append each roll to a message
                for(rolls = 0; rolls < dice; rolls++){
                    rollResult += getRoll(MIN, max) + ' | ';
                    if(rollResult.length > 1000){//message char limit is 2000. so we break down the rolls in multiple messages
                        message.channel.send(rollResult); //1000 chars is a good buffer unless someone wants a googool of faces to a die
                        rollResult = '| ';
                    }
                }
                message.channel.send(rollResult);
            }
        }
        else
            message.channel.send('example: \"!roll 2d6\" rolls 2 dice of 6 sides. max 10 dice, max 1000 sides');
    },
};