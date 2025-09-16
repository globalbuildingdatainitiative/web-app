export function makeErrorMessageFromOptionalString(message?: string | null): string {
    return `${message ?? "An error occured."} Please try again. If the problem persists, contact support at office@gbdi.io.`;
}