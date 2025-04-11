class Product {
    constructor(id, name, category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

window.model = {
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
        model.products = data.products.map(product => {
            const category = model.categories.find(category => category.id === product.categoryId);

            return new Product(product.id, product.name, category);
        });
        model.categories.forEach(category => {
            category.products = model.products.filter(product => product.category.id === category.id);
        });
        return model;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
