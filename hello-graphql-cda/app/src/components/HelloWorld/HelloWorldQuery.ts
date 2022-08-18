const HelloWorld = `
query HelloWorld($id: ID = "") {
  HelloWorld(id: $id) {
    title
    description
  }
}
`

export default HelloWorld
