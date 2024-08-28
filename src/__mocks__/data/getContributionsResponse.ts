export default {
  data: {
    contributions: {
      items: [
        {
          id: 'e3b986a2-e135-42d7-a5fc-0063fde6e9b1',
          uploadedAt: '2018-04-04T16:00:00.000Z',
          user: {
            id: 'user-1',
            firstName: 'John',
            lastName: 'Doe',
          },
          project: {
            name: 'My Project 1',
            location: {
              countryName: 'Country A',
            },
          },
        },
        {
          id: 'b2c5d2f2-76bc-4fdd-90e5-676edb2cde3f',
          uploadedAt: '2018-04-05T16:00:00.000Z',
          user: {
            id: 'user-2',
            firstName: 'Jane',
            lastName: 'Smith',
          },
          project: {
            name: 'My Project 2',
            location: {
              countryName: 'Country B',
            },
          },
        },
      ],
      count: 50, // Total count for pagination
    },
  },
}
