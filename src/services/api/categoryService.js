import categoriesData from "@/services/mockData/categories.json";

export const categoryService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return [...categoriesData];
  },

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const category = categoriesData.find(c => c.Id === id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    return { ...category };
  },

  async create(category) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const maxId = Math.max(...categoriesData.map(c => c.Id), 0);
    const newCategory = {
      ...category,
      Id: maxId + 1
    };
    
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  async update(id, data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const index = categoriesData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    categoriesData[index] = { ...categoriesData[index], ...data };
    return { ...categoriesData[index] };
  },

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = categoriesData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    
    const deletedCategory = categoriesData.splice(index, 1)[0];
    return { ...deletedCategory };
  }
};