import designElementsData from '@/services/mockData/designElements.json';

let elements = [...designElementsData];
let nextId = Math.max(...elements.map(e => e.Id)) + 1;

export const designElementsService = {
  getAll: () => {
    return Promise.resolve([...elements]);
  },

  getByCategory: (category) => {
    const filtered = elements.filter(element => 
      element.category.toLowerCase() === category.toLowerCase()
    );
    return Promise.resolve([...filtered]);
  },

  getById: (id) => {
    const element = elements.find(e => e.Id === parseInt(id));
    if (!element) {
      throw new Error(`Design element with ID ${id} not found`);
    }
    return Promise.resolve({ ...element });
  },

  create: (elementData) => {
    const newElement = {
      ...elementData,
      Id: nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    elements.push(newElement);
    return Promise.resolve({ ...newElement });
  },

  update: (id, updates) => {
    const index = elements.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Design element with ID ${id} not found`);
    }
    
    elements[index] = {
      ...elements[index],
      ...updates,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return Promise.resolve({ ...elements[index] });
  },

  delete: (id) => {
    const index = elements.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Design element with ID ${id} not found`);
    }
    
    const deleted = elements.splice(index, 1)[0];
    return Promise.resolve({ ...deleted });
  }
};