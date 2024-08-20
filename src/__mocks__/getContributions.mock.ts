import { MockedResponse } from '@apollo/client/testing'
import { GetContributionsDocument } from '@queries'
import getContributionsResponse from './data/getContributionsResponse.ts'

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
]
