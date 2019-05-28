(req, res, postBack) => {
    let { breadcrumbs = [] } = req.state;
    let shift = req.state.breadcrumbAction === req.state._lastAction
        ? 2
        : 1;

    if (breadcrumbs.length < shift) {
        postBack('/start');
        return null;
    }

    breadcrumbs = breadcrumbs.slice();
    let go;
    while (shift-- > 0) {
        go = breadcrumbs.shift();
    }

    res.setState({ breadcrumbs });

    postBack(go);
    return null;
};
