async (req, res) => {
    try {
        const data = await request({
            url: 'https://api.github.com/repos/wingbotai/snippets/contents',
            method: 'GET',
            json: true
        });
        return { data };
    } catch (err) {
        return { err };
    }
};
