(req, res, postBack) => {
    if (req.state.beforeLastInteraction !== res.currentAction()) {
        postBack(req.state.beforeLastInteraction);
        return null;
    }
    return true;
};
