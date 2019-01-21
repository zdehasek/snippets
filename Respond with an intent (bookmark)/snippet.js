async (req, res, postBack) => {
    if (res.bookmark()) {
        await res.runBookmark(postBack);
        // leave (to continue just comment the following line)
        return Router.END;
    }
    return undefined;
};
