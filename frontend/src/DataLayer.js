export default class DataLayer {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  makeUrl(uri) {
    return `http://${this.host}:${this.port}/${uri}`;
  }

  async apiFetch(ep, options) {
    const url = this.makeUrl(ep);
    const resp = await fetch(url, options);
    return resp.json();
  }

  async all() {
    return this.apiFetch("api/v1/dogs/all");
  }

  async add(name, owner, breed) {
    return this.apiFetch('api/v1/dogs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, owner, breed })
    });
  }

  async delete(id) {
    return this.apiFetch('api/v1/dogs/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    })
  };


  async update(id, name, owner, breed) {
    return this.apiFetch('api/v1/dogs/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, owner, breed })
    });
  }
}
