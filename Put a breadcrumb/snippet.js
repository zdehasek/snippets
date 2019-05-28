(req, res, postBack) => {
    const ca = res.currentAction();

    if (!ca || ca.match(/\*/)) {
        return;
    }

    let { breadcrumbs = [] } = req.state;

    breadcrumbs = breadcrumbs.slice(0, 10);
    breadcrumbs.unshift(ca);

    res.setState({ breadcrumbs, breadcrumbAction: ca });
};
