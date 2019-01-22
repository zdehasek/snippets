async (req, res, postBack) => {
    if (res.bookmark()) {
        await res.runBookmark(postBack);
        // leave (to continue just comment the following line)
        if (!res.finalMessageSent) {
            return Router.END;
        }
    }
    return undefined;
};
