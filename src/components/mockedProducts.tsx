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
  }


export const mockedProducts: Product[] = [
    {
      PartitionKey: 'partition1',
      RowKey: '1',
      Name: 'Art Print 1',
      Category: 'Abstract',
      Price: 20.00,
      ImageUrl: 'https://example.com/images/art1.jpg',
      Stock: 10,
      quantity: 1
    },
    {
      PartitionKey: 'partition2',
      RowKey: '2',
      Name: 'Art Print 2',
      Category: 'Landscape',
      Price: 25.00,
      ImageUrl: 'https://example.com/images/art2.jpg',
      Stock: 15,
      quantity: 1
    },
    {
      PartitionKey: 'partition3',
      RowKey: '3',
      Name: 'Art Print 3',
      Category: 'Portrait',
      Price: 30.00,
      ImageUrl: 'https://example.com/images/art3.jpg',
      Stock: 5,
      quantity: 1
    },
    {
      PartitionKey: 'partition4',
      RowKey: '4',
      Name: 'Art Print 4',
      Category: 'Still Life',
      Price: 15.00,
      ImageUrl: 'https://example.com/images/art4.jpg',
      Stock: 8,
      quantity: 1
    },
    {
      PartitionKey: 'partition5',
      RowKey: '5',
      Name: 'Art Print 5',
      Category: 'Modern',
      Price: 22.00,
      ImageUrl: 'https://example.com/images/art5.jpg',
      Stock: 12,
      quantity: 1
    },
    {
      PartitionKey: 'partition6',
      RowKey: '6',
      Name: 'Art Print 6',
      Category: 'Abstract',
      Price: 28.00,
      ImageUrl: 'https://example.com/images/art6.jpg',
      Stock: 7,
      quantity: 1
    },
    {
      PartitionKey: 'partition7',
      RowKey: '7',
      Name: 'Art Print 7',
      Category: 'Landscape',
      Price: 18.00,
      ImageUrl: 'https://example.com/images/art7.jpg',
      Stock: 9,
      quantity: 1
    },
    {
      PartitionKey: 'partition8',
      RowKey: '8',
      Name: 'Art Print 8',
      Category: 'Portrait',
      Price: 35.00,
      ImageUrl: 'https://example.com/images/art8.jpg',
      Stock: 6,
      quantity: 1
    },
    {
      PartitionKey: 'partition9',
      RowKey: '9',
      Name: 'Art Print 9',
      Category: 'Still Life',
      Price: 19.00,
      ImageUrl: 'https://example.com/images/art9.jpg',
      Stock: 11,
      quantity: 1
    },
    {
      PartitionKey: 'partition10',
      RowKey: '10',
      Name: 'Art Print 10',
      Category: 'Modern',
      Price: 27.00,
      ImageUrl: 'https://example.com/images/art10.jpg',
      Stock: 13,
      quantity: 1
    },

    {
        PartitionKey: 'partition11',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },

      {
        PartitionKey: 'partition12',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
      {
        PartitionKey: 'partition14',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
      {
        PartitionKey: 'partition15',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
      {
        PartitionKey: 'partition16',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
      {
        PartitionKey: 'partition17',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
      {
        PartitionKey: 'partition18',
        RowKey: '10',
        Name: 'Art Print 10',
        Category: 'Modern',
        Price: 27.00,
        ImageUrl: 'https://example.com/images/art10.jpg',
        Stock: 13,
        quantity: 1
      },
  ];