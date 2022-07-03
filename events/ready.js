module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`im alive (boom)`);
        client.user.setActivity('your messages', {
            type: 'WATCHING'
        });
        client.user.setStatus('dnd');
    },
};