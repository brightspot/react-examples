import HelloWorld from '../components/HelloWorld';
import PostButton from '../components/PostButton';
import GET_HELLO from '../api/GET_HELLO';
import POST_BRIGHTSPOT from '../api/POST_BRIGHTSPOT';
import { useState, useEffect } from 'react';

const HelloWorldContainer = () => {

    const [data, setData] = useState({
        Article: {
            headline: '',
            subheadline: ''
        },
        isClicked: false
    })

    const fetchBrightspotData = async () => {
        let response
        if (!data.isClicked) {
            response = await POST_BRIGHTSPOT()
            setData({Article: response.Article, isClicked: !data.isClicked})
        } else {
            response = await GET_HELLO()
            setData({Article: response.Article, isClicked: !data.isClicked})
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let response
            response = await GET_HELLO()
            setData({...data, Article: response.Article})
        }
        fetchData()
      }, [])

    return (
        <>
            <div className="hello-world-container">
                <HelloWorld headline={data.Article.headline} subheadline={data.Article.subheadline}/>
            </div>
            <PostButton fetchBrightspot={fetchBrightspotData} isClicked={data.isClicked} />
        </>
        )
}

export default HelloWorldContainer;
