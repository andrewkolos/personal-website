export function readEnvVarUnsafe(key: string, opts: { customErrorMessage?: string } = {}): string {
  const result = process.env[key]
  if (!result) {
    const errorMessage = opts.customErrorMessage ?? `Environment variable '${key}' was unset or empty.`
    throw Error(errorMessage)
  }
  return result
}
