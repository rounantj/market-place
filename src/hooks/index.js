import { RebootApi } from '../providers'

export class API {
  constructor(companyId, token) {
    this.config(companyId, token)
  }
  config(companyId, token) {
    this.companyId = companyId
    this.token = `Bearer ${token}`
  }

  async createProduct(payload) {
    console.log(payload)
    const result = await RebootApi.post('/product', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async uploadImage(payload) {
    const result = await RebootApi.post('/product/upload-image', payload, {
      headers: {
        authorization: this.token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return result
  }

  async updateProduct(payload) {
    console.log(payload)
    const result = await RebootApi.patch('/product/' + payload.id, payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async deleteProduct(payload) {
    const result = await RebootApi.post('/product', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async createClient(payload) {
    const result = await RebootApi.post('/client', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async updateClient(payload) {
    const result = await RebootApi.path('/client', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async deleteClient(payload) {
    const result = await RebootApi.post('/client', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async createOrder(payload) {
    console.log(payload)
    const result = await RebootApi.post('/order', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async updateOrder(payload) {
    const result = await RebootApi.patch('/order', payload, {
      headers: { authorization: this.token },
    })
    return result
  }

  async deleteOrder(id) {
    const result = await RebootApi.delete('/order/' + id, {
      headers: { authorization: this.token },
    })
    return result
  }

  //========================GET PAYLOADS==============

  async getOrders(id) {
    if (id) {
      const result = await RebootApi.get('/order/' + id, {
        headers: { authorization: this.token },
      })
      return result
    } else {
      const result = await RebootApi.get('/order', {
        headers: { authorization: this.token },
      })
      return result
    }
  }

  async getClients(id) {
    if (id) {
      const result = await RebootApi.get('/client/' + id, {
        headers: { authorization: this.token },
      })
      return result
    } else {
      const result = await RebootApi.get('/client', {
        headers: { authorization: this.token },
      })
      return result
    }
  }

  async getProducts(id, ean) {
    if (id) {
      const result = await RebootApi.get('/product/' + id, {
        headers: { authorization: this.token },
      })
      return result
    } else if (ean) {
      const result = await RebootApi.get('/product/ean/' + ean, {
        headers: { authorization: this.token },
      })
      return result
    } else {
      const result = await RebootApi.get('/product', {
        headers: { authorization: this.token },
      })
      return result
    }
  }
}
