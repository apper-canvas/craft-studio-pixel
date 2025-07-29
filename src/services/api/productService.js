import productsData from "@/services/mockData/products.json";

export const productService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...productsData];
  },

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = productsData.find(p => p.Id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    return { ...product };
  },

  async getByCategory(category) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const filteredProducts = productsData.filter(p => p.category === category);
    return [...filteredProducts];
  },

  async search(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const searchQuery = query.toLowerCase().trim();
    const results = productsData.filter(product =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
    
    return [...results];
  },

  async create(product) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const maxId = Math.max(...productsData.map(p => p.Id), 0);
    const newProduct = {
      ...product,
      Id: maxId + 1
    };
    
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    productsData[index] = { ...productsData[index], ...data };
    return { ...productsData[index] };
  },

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    
    const deletedProduct = productsData.splice(index, 1)[0];
    return { ...deletedProduct };
  }
};