import {Article} from '../generated/graphql'
  
  const HelloWorldComponent = ( {headline, subheadline} : Article) => {
    if (!headline) return <div>404</div>
  
    return <div className="hello-world">
                <h1>{headline}</h1>
                <h2>{subheadline}</h2>
            </div>;
  }
  
  export default HelloWorldComponent;