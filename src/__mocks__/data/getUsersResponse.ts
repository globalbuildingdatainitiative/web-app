export default {
  data: {
    users: [
      {
        id: '1',
        firstName: 'Hassan',
        lastName: 'Shahzad',
        email: 'hassan.shahzad@epfl.ch',
        organizationId: '1',
        timeJoined: '2022-01-01T00:00:00.000Z',
        invited: false,
        inviteStatus: null,
        role: 'OWNER',
      },
      {
        id: '2',
        firstName: 'Martin',
        lastName: 'Rock',
        email: 'martin.rock@epfl.ch',
        organizationId: '2',
        timeJoined: '2022-02-01T00:00:00.000Z',
        invited: true,
        inviteStatus: 'ACCEPTED',
        role: 'MEMBER',

      },
      {
        id: '3',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@epfl.ch',
        organizationId: '1',
        timeJoined: '2022-03-01T00:00:00.000Z',
        invited: true,
        inviteStatus: 'PENDING',
        role: 'MEMBER',

      },
      {
        id: '4',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice.smith@epfl.ch',
        organizationId: '1',
        timeJoined: '2022-04-01T00:00:00.000Z',
        invited: true,
        inviteStatus: 'PENDING',
        role: 'MEMBER',

      },
    ],
  },
}
