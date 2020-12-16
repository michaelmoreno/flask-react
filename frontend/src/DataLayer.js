iexport default class DataLayer {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  makeUrl(uri) {
    return `https://${this.host}:${this.port}/${uri}`;
  }

  async apiFetch(ep, options) {
      const url = this.makeUrl(ep);
      const resp = await fetch(url, options);
      return resp.json();
  }

  async all() {
      return this.apiFetch("/api/v1/dogs/");
  } 

  async add(name, owner, breed) {
   return this.apiFetch('/api/v1/dogs/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ name, owner, breed })
   })     
  }
}
