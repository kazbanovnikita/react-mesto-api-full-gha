class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то не так... код ошибки ${res.status}`);
  }

  getInitialCards() {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getUserInfo() {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getDataFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    const url = this._baseUrl + `/users/me`;
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  setUserAvatar(body) {
    const url = this._baseUrl + `/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    const url = this._baseUrl + "/cards";
    return fetch(url, {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const url = this._baseUrl + `/cards/${cardId}/likes`;
    if (!isLiked) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        credentials: 'include',
      }).then(this._checkResponse);
    } else {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Accept": 'application/json',
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        credentials: 'include',
      }).then(this._checkResponse);
    }
  }

  deleteCard(cardId) {
    const url = this._baseUrl + `/cards/${cardId}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.nik24-mesto.nomoredomains.work"
});
