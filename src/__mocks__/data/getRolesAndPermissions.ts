export default {
  data: {
    roles: [
      {
        name: 'ADMIN',
        permissions: [
          'CONTRIBUTIONS_READ',
          'CONTRIBUTIONS_CREATE',
          'CONTRIBUTIONS_UPDATE',
          'CONTRIBUTIONS_DELETE',
          'MEMBERS_READ',
          'MEMBERS_CREATE',
          'MEMBERS_UPDATE',
          'MEMBERS_DELETE',
          'ORGANIZATIONS_CREATE',
          'ORGANIZATIONS_READ',
          'ORGANIZATIONS_UPDATE',
          'ORGANIZATIONS_DELETE',
        ],
      },
      {
        name: 'OWNER',
        permissions: [
          'CONTRIBUTIONS_CREATE',
          'CONTRIBUTIONS_READ',
          'CONTRIBUTIONS_UPDATE',
          'CONTRIBUTIONS_DELETE',
          'MEMBERS_READ',
          'MEMBERS_CREATE',
          'MEMBERS_UPDATE',
          'MEMBERS_DELETE',
          'ORGANIZATIONS_READ',
          'ORGANIZATIONS_UPDATE',
        ],
      },
      {
        name: 'MEMBER',
        permissions: [
          'CONTRIBUTIONS_CREATE',
          'CONTRIBUTIONS_READ',
          'CONTRIBUTIONS_UPDATE',
          'CONTRIBUTIONS_DELETE',
          'MEMBERS_READ',
          'MEMBERS_CREATE',
          'ORGANIZATIONS_READ',
        ],
      },
    ],
  },
}
