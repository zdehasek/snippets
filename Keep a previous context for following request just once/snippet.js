(req, res, postBack) => {
    const expected = req.expected();

    if (expected) {

        const { action, data = {} } = expected;

        if (!data._expectedFallbackOccured) {

            res.expected(action, {
                ...data,
                _expectedFallbackOccured: true
            });
        }
    }
};
