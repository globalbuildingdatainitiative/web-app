import { vi } from 'vitest'

vi.mock('supertokens-auth-react/recipe/session', async () => {
  const actual = await vi.importActual('supertokens-auth-react/recipe/session')
  return {
    ...actual,
    doesSessionExist: vi.fn().mockResolvedValue(true),
    getUserId: vi.fn().mockResolvedValue('1'),
  }
})
