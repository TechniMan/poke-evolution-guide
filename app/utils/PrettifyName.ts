function CapitaliseWord(word: string): string {
  return word[0] ? `${word[0].toUpperCase()}${word.substring(1)}` : word
}

export default function PrettifyName(name: string): string {
  return name.split('-').reduce((acc, val) => `${acc}${CapitaliseWord(val)} `, '')
}
