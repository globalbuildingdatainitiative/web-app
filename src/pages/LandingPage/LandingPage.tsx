interface LandingPageProps {}

// @ts-expect-error will be fixed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LandingPage = (props: LandingPageProps) => {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}
