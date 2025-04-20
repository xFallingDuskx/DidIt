/**
 * Capitalizes the first letter of each word in a given string.
 * @param input - The string to be transformed.
 * @returns A new string with the first letter of each word capitalized.
 */
export default function capitalizeWords(input: string): string {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
}
