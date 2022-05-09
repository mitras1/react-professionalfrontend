const BrowserHistoryService = {
    navigate: (route: string, title: string = "") => {
        const history = window.history;

        if (history !== null) {
            history.pushState(null, title, route);
        }
    }
};

export {
    BrowserHistoryService
};
