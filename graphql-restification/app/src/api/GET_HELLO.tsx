const GET_HELLO = async () => {
    const data = await fetch('http://localhost/welcome/hello-world').then(res => res.json())
    return data.data
}

export default GET_HELLO