async (req, res) => {

    const authorization = '<your mailgun api key>';
    const workspace = '<your mailgun workspace>';

    const formData = {
        from: `Test <mailgun@${workspace}>`,
        to: 'recipient@domain.com',
        subject: 'testing subject',
        text: 'hello world'
    };

    const options = {
        method: 'POST',
        url: `https://api.mailgun.net/v3/${workspace}/messages`,
        headers:
        {
            'Cache-Control': 'no-cache',
            Authorization: `Basic ${authorization}`
        },
        formData
    };

    try {
        await request(options);
    } catch (e) {
        res.text(`Sending a mail failedL: ${e.message}`);
    }

    return Router.CONTINUE;
};
