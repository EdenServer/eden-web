export default {
  get: ({ url, headers = {}, json = false }, callback) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        ...headers,
      },
    })
      .then((res) => {
        if (json) {
          res
            .json()
            .then((j) => callback(null, j))
            .catch((err) => callback(err, null));
        } else {
          callback(null, res);
        }
      })
      .catch((err) => callback(err, null));
  },
  put: ({ url, headers = {}, body = {}, json = false }, callback) => {
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (json) {
          res
            .json()
            .then((j) => callback(null, j))
            .catch((err) => callback(err, null));
        } else {
          callback(null, res);
        }
      })
      .catch((err) => callback(err, null));
  },
  post: ({ url, headers = {}, body = {}, json = false }, callback) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (json) {
          res
            .json()
            .then((j) => callback(null, j))
            .catch((err) => callback(err, null));
        } else {
          callback(null, res);
        }
      })
      .catch((err) => callback(err, null));
  },
};
