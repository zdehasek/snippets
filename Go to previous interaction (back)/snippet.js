(req, res, postBack) => {
    if (req.state.beforeLastInteraction
        && req.state.beforeLastInteraction !== '/*'
        && req.state.beforeLastInteraction !== res.currentAction()) {

        res.setState({ lastInteraction: null, beforeLastInteraction: null });
        postBack(req.state.beforeLastInteraction, { fromBack: true });
        return null;
    }
    return true;
};
