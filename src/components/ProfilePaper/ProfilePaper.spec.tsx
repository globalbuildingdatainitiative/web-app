import { ProfilePaper } from '@components'
import { expect, render, screen, suite, test } from '@test'

suite('ProfilePaper', () => {
  test('Snapshot', () => {
    const { container } = render(<ProfilePaper />)
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(<ProfilePaper />)
    expect(await screen.findByTestId('ProfilePaper')).toBeTruthy()
  })

  test('Render Profile Title', async () => {
    render(<ProfilePaper />)
    expect(await screen.findByText('Profile')).toBeTruthy()
  })

  test('Render Profile Content', async () => {
    render(<ProfilePaper />)
    expect(await screen.findByText('Here Profile charts will be displayed')).toBeTruthy()
  })
})
