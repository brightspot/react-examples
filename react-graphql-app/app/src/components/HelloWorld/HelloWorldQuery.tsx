const HelloWorld = `
query HelloWorld($path: String = "") {
  HelloWorld(path: $path) {
    title
    text
  }
}
`

export default HelloWorld
