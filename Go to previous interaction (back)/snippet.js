(req, res, postBack) => {
    if (req.state.beforeLastInteraction
        && req.state.beforeLastInteraction !== '/*'
        && req.state.beforeLastInteraction !== res.currentAction()) {

        res.setState({ lastInteraction: null });
        postBack(req.state.beforeLastInteraction);
        return null;
    }
    return true;
};
