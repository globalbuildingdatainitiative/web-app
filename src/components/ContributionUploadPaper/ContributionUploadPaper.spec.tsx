import { ContributionUploadPaper } from '@components'
import { MockedProvider } from '@apollo/client/testing'
import { expect, render, screen, suite, test, userEvent } from '@test'
import { MemoryRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'


suite('ContributionUploadPaper', () => {
  test('Snapshot', () => {
    const { container } = render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ContributionUploadPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(container).toMatchSnapshot()
  })

  test('Render Correctly', async () => {
    render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ContributionUploadPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(await screen.findByTestId('ContributionUploadPaper')).toBeTruthy()
  })

  test('Render Contribution Button', async () => {
    const {getByTestId} = render(
      <MockedProvider addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ContributionUploadPaper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    const file = new File(['file stuff'], 'file.csv', { type: 'text/csv'})
    const dropzone = getByTestId('dropzoneInput')
    await userEvent.upload(dropzone, file);
    expect(await screen.findByText('Contribute')).toBeTruthy()
  })
})
