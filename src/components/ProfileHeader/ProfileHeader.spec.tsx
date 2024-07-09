import { ProfileHeader } from '@components'
import { expect, render, screen, suite, test } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'

suite('ProfileHeader', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<ProfileHeader />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<ProfileHeader />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByTestId('ProfileHeader')).toBeTruthy()
  })

  test('Render Contribute Now ActionButton', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<ProfileHeader />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(await screen.findByText('Contribute Now')).toBeTruthy()
  })
})
