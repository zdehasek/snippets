(req, res, postBack) => {

    const workspace = '<your workspace>';
    const index = '<index name>';
    const apiKey = '<api key here>';
    const interactionIdentifier = 'your-interaction-identifier';

    const search = req.text();

    const body = {
        search,
        searchFields: 'question',
        searchMode: 'any',
        // filter: 'topic eq '' + topic + ''',
        queryType: 'full',
        top: 3
    };

    postBack(interactionIdentifier, async () => {
        try {

            const options = {
                uri: `https://${workspace}.search.windows.net/indexes/${index}/docs/search?api-version=2017-11-11`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey,
                    'Cache-Control': 'no-cache'
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
