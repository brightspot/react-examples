import HelloWorld from '../components/HelloWorld';
import PostButton from '../components/PostButton';
import GET_HELLO from '../api/GET_HELLO';
import POST_BRIGHTSPOT from '../api/POST_BRIGHTSPOT';
import { useState, useEffect } from 'react';
import {Article} from '../generated/graphql'

interface ContainerData {
    article: Article,
    isClicked: boolean
}

const HelloWorldContainer = () => {

    const [data, setData] = useState({} as ContainerData)

    const fetchBrightspotData = async () => {
        if (!data.isClicked) {
            const response = await POST_BRIGHTSPOT()
            setData({article: response.Article, isClicked: !data.isClicked})
        } else {
            const response = await GET_HELLO()
            setData({article: response.Article, isClicked: !data.isClicked})
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await GET_HELLO()
            setData({...data, article: response.Article})
        }
        fetchData()
      }, [])

    return (
        <>
            <div className="hello-world-container">
                <HelloWorld article={data.article}/>
            </div>
            <PostButton fetchBrightspot={fetchBrightspotData} isClicked={data.isClicked} />
        </>
        )
}

export default HelloWorldContainer;
