(req: Req, res: Res, postBack) => {
    
    const { breadcrumbs = [] } = req.state;

    if (breadcrumbs) {
        return true
    }
    return false
}