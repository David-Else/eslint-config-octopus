/**
 * ============================================================================
 * Execute CLI command with optional arguments and return the results
 * ============================================================================
 */
export async function runCommandReturnResults(command: string[]): Promise<any> {
  const p = Deno.run({
    args: command,
    stdout: 'piped'
  });
  const commandOutput = await Deno.readAll(p.stdout!);
  const text = new TextDecoder().decode(commandOutput);
  return JSON.parse(text);
}

/**
 * ============================================================================
 * Write output to disk
 * ============================================================================
 */
export async function writeToDisk(
  fileName: string,
  data: string
): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(fileName, encoder.encode(data));
}
