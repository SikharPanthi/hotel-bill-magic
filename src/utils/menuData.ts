
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'desserts' | 'beverages';
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Continental Breakfast',
    description: 'A selection of pastries, fresh fruit, yogurt, and coffee or tea',
    price: 18.95,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '2',
    name: 'Eggs Benedict',
    description: 'Poached eggs and Canadian bacon on an English muffin with hollandaise sauce',
    price: 16.95,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing, parmesan, and croutons',
    price: 14.95,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '4',
    name: 'Club Sandwich',
    description: 'Triple-decker sandwich with turkey, bacon, lettuce, and tomato',
    price: 17.95,
    category: 'lunch',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80',
  },
  {
    id: '5',
    name: 'Filet Mignon',
    description: '8oz filet with garlic mashed potatoes and seasonal vegetables',
    price: 42.95,
    category: 'dinner',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '6',
    name: 'Grilled Salmon',
    description: 'Fresh salmon with lemon-dill sauce, wild rice, and asparagus',
    price: 34.95,
    category: 'dinner',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '7',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 11.95,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: '8',
    name: 'New York Cheesecake',
    description: 'Classic cheesecake with berry compote',
    price: 10.95,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '9',
    name: 'Classic Mojito',
    description: 'White rum, sugar, lime juice, soda water, and mint',
    price: 12.95,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
  },
  {
    id: '10',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 6.95,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
];

export const getMenuItemsByCategory = (category: MenuItem['category']) => {
  return menuItems.filter(item => item.category === category);
};

export const getMenuItemById = (id: string) => {
  return menuItems.find(item => item.id === id);
};
