const HelloWorld = `
query HelloWorld($id: ID = "") {
  HelloWorld(id: $id) {
    title
    text
  }
}
`

export default HelloWorld
