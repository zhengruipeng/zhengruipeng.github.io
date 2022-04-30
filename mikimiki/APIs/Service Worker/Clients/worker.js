addEventListener('install', event => {
    console.log("notificationclick");
    event.waitUntil(async function() {
        const allClients = await clients.matchAll({
            includeUncontrolled: true
        });

        let chatClient;

        // Let's see if we already have a chat window open:
        for (const client of allClients) {
            const url = new URL(client.url);
            console.log(url.pathname);
            if (url.pathname === '/htdocs/usr/JavaScript/tianDaoChouQin/APIS/Service%20Worker/Clients/chat/chat.htm') {
                // Excellent, let's use it!
                client.focus();
                chatClient = client;
                break;
            }
        }

        // If we didn't find an existing chat window,
        // open a new one:
        if (!chatClient) {
            chatClient = await clients.openWindow('/htdocs/usr/JavaScript/tianDaoChouQin/APIS/Service%20Worker/Clients/chat/.chat.html');
        }

        // Message the client:
        chatClient.postMessage("New chat messages!");
    }());
});