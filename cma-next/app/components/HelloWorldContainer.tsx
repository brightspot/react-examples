import HelloWorld from './HelloWorld';
import CreateHelloWorld from './CreateHelloWorld';
import styles from '../styles/HelloWorldContainer.module.css'
import { HelloWorldData } from '../pages/index'

type HelloWorldContainerProps = {
  search: (data: HelloWorldData[]) => HelloWorldData[] | undefined,
  items: HelloWorldData[],
  getItems: Function
}

const HelloWorldContainer: React.FC<HelloWorldContainerProps> = ({ search, items, getItems }) => {

  return (
    <section className={styles.section}>
      <CreateHelloWorld getItems={getItems} />
      <HelloWorld
        HelloWorldItems={search(items)}
        getItems={getItems}
      />
    </section>
  );
}

export default HelloWorldContainer;