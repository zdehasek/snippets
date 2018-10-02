(req, res, postBack) => {

    const authorization = '<your watson API key>';
    const workspace = '<your watson workspace>';
    const interactionIdentifier = 'your-interaction-identifier';

    const text = req.text();

    postBack(interactionIdentifier, async () => {
        try {

            const options = {
                uri: `https://gateway.watsonplatform.net/assistant/api/v1/workspaces/${workspace}/message?version=2018-07-10`,
                method: 'POST',
                body: { input: { text } },
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    Authorization: `Basic ${authorization}`
                },
                json: true
            };

            const data = await request(options);
            return { data };
        } catch (err) {
            return { err };
        }
    });
};
