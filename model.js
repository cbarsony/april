class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export const model = {
  categories: [],
};

export async function initModel() {
    try {
        const response = await fetch('api.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        model.categories = data.categories.map(item => new Category(item.id, item.name));
        return model;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
