async (req, res) => {

    const workspace = '<fill your workspace here>';
    const knowledgebase = '<knowledge base id here>';
    const apiKey = '<key here>';

    const text = req.text();

    const options = {
        method: 'POST',
        url: `https://${workspace}.azurewebsites.net/qnamaker/knowledgebases/${knowledgebase}/generateAnswer`,
        headers:
        {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            Authorization: `EndpointKey ${apiKey}`
        },
        body: { question: text },
        json: true
    };

    try {
        const body = await request(options);

        for (let i = 0; i < body.answers.length; i++) {

            res.genericTemplate()
                .addElement(body.answers[i].answer, 'k')
                .send();
        }
    } catch (e) {
        res.text(`Request failed: ${e.message}`);
    }
};
