export function makeErrorMessageFromOptionalString(message?: string | null): string {
  return `An error occurred, please try again. If the problem persists, contact support at office@gbdi.io. ${message ? `Error: ${message}` : ''}`
}

export function makeErrorFromOptionalString(message?: string | null): { message: string } {
  return {
    message: makeErrorMessageFromOptionalString(message),
  }
}
