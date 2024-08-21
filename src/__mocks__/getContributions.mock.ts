import { MockedResponse } from '@apollo/client/testing'
import { GetContributionsDocument, GetCurrentUserDocument } from '@queries'
import getContributionsResponse from './data/getContributionsResponse'

export const getContributionsMock: MockedResponse[] = [
  {
    request: {
      query: GetContributionsDocument,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: getContributionsResponse,
  },
  {
    request: {
      query: GetContributionsDocument,
      variables: {
        limit: 10,
        offset: 10, // The second page of contributions
      },
    },
    result: {
      data: {
        contributions: {
          items: [
            {
              id: 'a1b2c3d4-e567-8901-23ef-4567890abcd',
              uploadedAt: '2018-04-06T16:00:00.000Z',
              userId: 'user-3',
              project: {
                name: 'My Project 11',
                location: {
                  countryName: 'Country C',
                },
              },
            },
          ],
          count: 50, // Same total count
        },
      },
    },
  },
  {
    request: {
      query: GetCurrentUserDocument,
      variables: { id: 'user-1' },
    },
    result: {
      data: {
        users: [
          {
            id: 'user-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            timeJoined: '2018-04-04T16:00:00.000Z',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetCurrentUserDocument,
      variables: { id: 'user-2' },
    },
    result: {
      data: {
        users: [
          {
            id: 'user-2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            timeJoined: '2018-04-05T16:00:00.000Z',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetCurrentUserDocument,
      variables: { id: 'user-3' },
    },
    result: {
      data: {
        users: [
          {
            id: 'user-3',
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
            timeJoined: '2018-04-06T16:00:00.000Z',
          },
        ],
      },
    },
  },
]
