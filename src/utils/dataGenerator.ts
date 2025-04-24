import { faker } from '@faker-js/faker';

interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  timestamp: string;
}

const categoryNames = [
  'Electronics', 'Clothing', 'Food', 'Books', 'Furniture', 
  'Jewelry', 'Toys', 'Sports', 'Beauty', 'Home'
];

export const generateData = (count: number): DataItem[] => {
  const data: DataItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const statusOptions = ['active', 'inactive', 'pending'] as const;
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    
    data.push({
      id: i + 1,
      name: faker.commerce.productName(),
      value: Number(faker.commerce.price({ min: 10, max: 1000 })),
      category: categoryNames[Math.floor(Math.random() * categoryNames.length)],
      status: randomStatus,
      timestamp: faker.date.recent({ days: 30 }).toISOString()
    });
  }
  
  return data;
};