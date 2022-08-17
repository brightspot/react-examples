const HelloWorld = `
query HelloWorld($path: String = "") {
  HelloWorl(path: $path) {
    title
    text
  }
}
`

export default HelloWorld
