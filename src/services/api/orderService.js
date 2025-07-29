let orders = [];
let nextId = 1;

export const orderService = {
  getAll: () => {
    return Promise.resolve([...orders]);
  },

  getById: (id) => {
    const order = orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return Promise.resolve({ ...order });
  },

  create: (orderData) => {
    const newOrder = {
      ...orderData,
      Id: nextId++,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    orders.unshift(newOrder);
    return Promise.resolve({ ...newOrder });
  },

  update: (id, updates) => {
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    orders[index] = {
      ...orders[index],
      ...updates,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return Promise.resolve({ ...orders[index] });
  },

  delete: (id) => {
    const index = orders.findIndex(o => o.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    const deleted = orders.splice(index, 1)[0];
    return Promise.resolve({ ...deleted });
  }
};