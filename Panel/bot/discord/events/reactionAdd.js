let parse = () => {
    let toReturn = [];

    let channels = Object.keys(config.DiscordBot.reactionRoles);

    for (let channel of channels) {
        let messages = Object.keys(config.DiscordBot.reactionRoles[channel])
        messages.forEach(message => {
            for (let [reaction, role] of Object.entries(config.DiscordBot.reactionRoles[channel][message])) {

                toReturn.push({
                    message: message,
                    reaction: reaction,
                    role: role,
                    channel: channel
                })
            }
        })
    }
    return toReturn;
}


module.exports = async (client, r, member) => {

    if (member.user.bot == true) return;
    let emoji = r.emoji.id != null ? r.emoji.id : r.emoji.name;

    
    // Reaction Roles
    let reactionRole = parse();
    let found = reactionRole.filter(x => x.message == r.message.id && x.reaction == emoji);
    if (found.length > 0) {
        console.log(found);
        found = found[0];
        let role = member.guild.roles.get(found.role);
        await member.addRoles([role, '765869330024890378']);
        member.user.send("gave you the role: `" + role.name + "`!");
    }    

}