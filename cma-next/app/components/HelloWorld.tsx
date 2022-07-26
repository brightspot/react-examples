
import React from 'react'
import HelloWorldCard from './HelloWorldCard'
import styles from '../styles/HelloWorld.module.css'
import { HelloWorldData } from '../pages/index'

type HelloWorldProps = {
  HelloWorldItems: HelloWorldData[] | undefined,
  getItems: Function
}

const HelloWorld: React.FC<HelloWorldProps> = ({ HelloWorldItems, getItems }) => {
  return (
    <div className={styles.helloWorldContainer}>
      {HelloWorldItems && HelloWorldItems.map((item: { title: string, text: string, _id: string }) => (
        <HelloWorldCard
          key={item._id}
          title={item.title}
          text={item.text}
          id={item._id}
          getItems={getItems}
        />
      ))}
    </div>
  );
}

export default HelloWorld;