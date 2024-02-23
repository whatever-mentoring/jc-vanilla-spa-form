export default function pathToRegex(path: string) {
  return new RegExp('^' + path.replace(/:\w+/g, '(.+)') + '$')
}
