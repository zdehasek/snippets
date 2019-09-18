(req, res, postBack) => {
    if (req.state.beforeLastInteraction) {
        postBack(req.state.beforeLastInteraction);
        return null;
    }
    return true;
};
