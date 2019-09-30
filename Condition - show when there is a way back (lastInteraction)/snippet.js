(req, res) => {
    const { lastInteraction: l, beforeLastInteraction: b } = req.state;
    const c = l === res.data.lastInteractionSet ? b : l;
    return c && c !== '/*';
};
