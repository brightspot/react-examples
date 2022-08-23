import {Article} from '../generated/graphql'
interface Props {
  article: Article
}
  
  const HelloWorldComponent = ({article}: Props) => {
    if (!article) return <div>404</div>
    const {headline, subheadline} = article
  
    return <div className="hello-world">
                <h1>{headline}</h1>
                <h2>{subheadline}</h2>
            </div>;
  }
  
  export default HelloWorldComponent;