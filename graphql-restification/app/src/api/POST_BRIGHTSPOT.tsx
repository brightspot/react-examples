const POST_BRIGHTSPOT = async () => {
    const formData = new FormData()
    formData.append('path', 'brightspot')
    const data = await fetch('http://localhost/articles/brightspot', {
        method: 'POST',
        body: formData
    }).then(res => res.json())
    return data.data
}

export default POST_BRIGHTSPOT