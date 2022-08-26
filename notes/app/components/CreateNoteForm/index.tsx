import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './CreateNoteForm.module.css'
import { Data } from '../../pages'

type Props = {
  items: Data[]
  setItems: Dispatch<SetStateAction<Data[]>>
}

const CreateNote = ({ items, setItems }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState({ isError: false, message: '' })
  const [expanded, setExpanded] = useState(false)

  // refer to Stack Overflow response: https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
      throw new Error(`Node expected`)
    }
  }

  useEffect(() => {
    if (error.isError) {
      const timeId = setTimeout(() => {
        setError({ isError: false, message: '' })
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [error.isError])

  useEffect(() => {
    const closeOnEscape = (e: any) => {
      if (expanded && e.key === 'Escape') {
        setExpanded(false)
      }
    }
    const closeOnMouseClickOutside = ({
      target,
    }: MouseEvent | KeyboardEvent) => {
      assertIsNode(target)
      if (expanded && formRef.current && !formRef.current.contains(target)) {
        setExpanded(false)
      }
    }
    document.body.addEventListener('keydown', closeOnEscape)
    document.body.addEventListener('mousedown', closeOnMouseClickOutside)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscape)
      document.body.removeEventListener('mousedown', closeOnMouseClickOutside)
    }
  }, [expanded])

  // Refer to Stack Overflow response: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
  const insertItem = (arr: Data[], index: number, newItem: Data) => [
    /// pat of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after specified index
    ...arr.slice(index),
  ]

  const submitNewNote = async () => {
    const inputTitle = titleRef?.current?.value || null
    const inputDescription = descriptionRef?.current?.value || null
    const inputUsername = usernameRef?.current?.value || null
    const dataToSubmit = {
      title: inputTitle,
      description: inputDescription,
      toolUser: inputUsername,
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/notes/new`,
        {
          body: JSON.stringify(dataToSubmit),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status >= 400) {
        setError({
          isError: true,
          message:
            'Cannot create note. First, confirm Username in Brightspot... ',
        })
        throw new Error()
      }

      const data = await response.json()
      if (data.brightspot_example_notes_NoteSave) {
        const newItem = data.brightspot_example_notes_NoteSave
        setItems(insertItem(items, 0, newItem))
        if (titleRef?.current?.value) {
          titleRef.current.value = ''
        }
        if (descriptionRef?.current?.value) {
          descriptionRef.current.value = ''
        }
        if (usernameRef?.current?.value) {
          usernameRef.current.value = ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className={styles.createNoteForm}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        setExpanded(false)
        submitNewNote()
      }}
    >
      <div
        className={styles.createNoteWrapper}
        onClick={(e) => setExpanded(true)}
      >
        <input
          className={styles.createNoteInput}
          required
          name="title"
          aria-label="Title"
          ref={titleRef}
          placeholder="Title"
        />
        <div className={`${expanded ? styles.notCollapsed : styles.collapsed}`}>
          <textarea
            className={styles.createNoteInput}
            aria-label="Description"
            ref={descriptionRef}
            required
            name="description"
            placeholder="Description..."
          />
          <input
            className={styles.createNoteInput}
            aria-label="User name"
            ref={usernameRef}
            required
            name="username"
            placeholder="Username"
          />
        </div>
      </div>
      <div
        className={`${styles.createNoteBottom} ${
          expanded ? styles.notCollapsedInline : styles.collapsed
        }`}
      >
        {error.isError && (
          <span
            className={styles.error}
          >{`There is an error! ${error.message}`}</span>
        )}
        <button
          type="submit"
          className={`${styles.formButton} ${
            expanded ? styles.notCollapsedInlne : styles.collapsed
          }`}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className={`${styles.formButton} ${
            expanded ? styles.notCollapsedInline : styles.collapsed
          }`}
        >
          Close
        </button>
      </div>
    </form>
  )
}

export default CreateNote
