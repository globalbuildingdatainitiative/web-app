export function makeErrorMessageFromOptionalString(message?: string | null): string {
    return `An error occured, please try again. If the problem persists, contact support at office@gbdi.io. ${message ? `Error: ${message}` : ""}`;
}

export function makeErrorFromOptionalString(message?: string | null): { message: string } {
    return {
        message: makeErrorMessageFromOptionalString(message)
    }
}