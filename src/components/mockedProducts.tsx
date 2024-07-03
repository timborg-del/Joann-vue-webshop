export interface Product {
  PartitionKey: string;
  RowKey: string;
  Name: string;
  Price: number;
  Stock: number;
  Category: string;
  ImageUrl: string;
  quantity: number;
  size?: string;
  AdditionalImages: string[];
}

export const mockedProducts: Product[] = [
  {
    PartitionKey: 'partition1',
    RowKey: '1',
    Name: 'Art Print 1',
    Category: 'Abstract',
    Price: 20.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 10,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition2',
    RowKey: '2',
    Name: 'Art Print 2',
    Category: 'Landscape',
    Price: 25.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 15,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition3',
    RowKey: '3',
    Name: 'Art Print 3',
    Category: 'Portrait',
    Price: 30.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 5,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition4',
    RowKey: '4',
    Name: 'Art Print 4',
    Category: 'Still Life',
    Price: 15.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 8,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition5',
    RowKey: '5',
    Name: 'Art Print 5',
    Category: 'Modern',
    Price: 22.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 12,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition6',
    RowKey: '6',
    Name: 'Art Print 6',
    Category: 'Abstract',
    Price: 28.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 7,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition7',
    RowKey: '7',
    Name: 'Art Print 7',
    Category: 'Landscape',
    Price: 18.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 9,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition8',
    RowKey: '8',
    Name: 'Art Print 8',
    Category: 'Portrait',
    Price: 35.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 6,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  },
  {
    PartitionKey: 'partition9',
    RowKey: '9',
    Name: 'Art Print 9',
    Category: 'Still Life',
    Price: 19.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 11,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg' ]
  },
  {
    PartitionKey: 'partition10',
    RowKey: '10',
    Name: 'Art Print 10',
    Category: 'Modern',
    Price: 27.00,
    ImageUrl: 'src/assets/joann.jpg',
    Stock: 13,
    quantity: 1,
    AdditionalImages: ['src/assets/joann1.jpg', 'src/assets/moon.jpg', 'src/assets/moon1.jpg']
  }
];

