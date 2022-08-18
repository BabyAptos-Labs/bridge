import Cors from "cors";

const API_HELPER = {
    api_url: process.env.API_URL,

    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+process.env.API_KEY,
    },

    runMiddleware: (req, res) => {
        const fn = Cors({
            methods: ["GET", "HEAD"],
        });

        return new Promise((resolve, reject) => {
            fn(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }

                return resolve(result);
            });
        });
    },

    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(API_HELPER.api_url + url, {
                method: "get",
                headers: API_HELPER.headers,
            })
                .then((response) => {
                    response
                        .json()
                        .then((content) => {
                            if (content.error) {
                                return reject(content.message);
                            }

                            return resolve(content);
                        })
                        .catch(() => {
                            return reject(false);
                        });
                })
                .catch((error) => {
                    return resolve(error);
                });
        });
    },

    post: (url, data) => {
        return new Promise((resolve, reject) => {
            fetch(API_HELPER.api_url + url, {
                method: "post",
                headers: API_HELPER.headers,
                body: JSON.stringify(data),
            })
                .then((response) => {
                    response
                        .json()
                        .then((content) => {
                            if (content.error) {
                                return reject(content.message);
                            }

                            return resolve(content);
                        })
                        .catch(() => {
                            return reject(false);
                        });
                })
                .catch((error) => {
                    return resolve(error);
                });
        });
    },
};

export default API_HELPER;
