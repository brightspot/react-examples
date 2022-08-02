
import React, { useState } from 'react'
import NoteCard from './NoteCard'
import styles from '../styles/Notes.module.css'
import { Data } from '../pages/index'

type Props = {
  notes: Data[] | undefined,
  getItems: Function
}

const Notes: React.FC<Props> = ({ notes, getItems }) => {
  return (
    <div className={styles.container}>
      {notes && notes.map((item: { title: string, text: string, _id: string }) => (
        <NoteCard
          title={item.title}
          text={item.text}
          id={item._id}
          getItems={getItems}
          key={item._id}
        />
      ))}
    </div>
  );
}

export default Notes;