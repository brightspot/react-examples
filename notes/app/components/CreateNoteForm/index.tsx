import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import styles from './CreateNoteForm.module.css'
import { Data } from '../../pages'
import { assertIsNode, runErrorWithTimeout } from '../../lib/utils'

type Props = {
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Data
  ) => void
  pageNumber: number
}

type SubmittedData = {
  title?: string
  description?: string
  toolUser?: string
}

const CreateNoteForm = ({ getItems, pageNumber }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/new`
  const params = (data: SubmittedData) => {
    return {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  useEffect(() => {
    runErrorWithTimeout(error, setError, 1000)
  }, [error])

  useEffect(() => {
    const closeOnMouseClickOutside = ({ target }: MouseEvent) => {
      assertIsNode(target)
      if (expanded && formRef && !formRef?.current?.contains(target)) {
        setExpanded(false)
      }
    }

    document.body.addEventListener('mousedown', closeOnMouseClickOutside)
    return () => {
      document.body.removeEventListener('mousedown', closeOnMouseClickOutside)
    }
  }, [expanded])

  const processResponse = (res: any) => {
    if (res.brightspot_example_notes_NoteSave) {
      const newItem = res.brightspot_example_notes_NoteSave
      console.log('pageNumber for new item form: ', pageNumber)
      getItems(pageNumber, false, '', newItem)
      if (titleRef?.current?.value) {
        titleRef.current.value = ''
      }
      if (descriptionRef?.current?.value) {
        descriptionRef.current.value = ''
      }
      if (usernameRef?.current?.value) {
        usernameRef.current.value = ''
      }
      setExpanded(false)
    } else if (res.error) {
      setError(res.error)
    }
  }

  const submitNewNote = async () => {
    const inputTitle = titleRef?.current?.value
    const inputDescription = descriptionRef?.current?.value
    const inputUsername = usernameRef?.current?.value
    const dataToSubmit = {
      title: inputTitle,
      description: inputDescription,
      toolUser: inputUsername,
    }

    fetch(url, params(dataToSubmit))
      .then((res) => res.json())
      .then((res) => processResponse(res))
      .catch((error: Error) => setError(error.message))
  }

  return (
    <form
      className={styles.createNoteForm}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        submitNewNote()
      }}
    >
      <div
        className={styles.createNoteWrapper}
        onClick={() => setExpanded(true)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !expanded) {
            setExpanded(true)
          } else if (e.key === 'Escape' && expanded) {
            setExpanded(false)
          }
        }}
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
      {error && <p className={styles.error}>{error}</p>}
      <div
        className={`${styles.createNoteBottom} ${
          expanded ? styles.notCollapsedInline : styles.collapsed
        }`}
      >
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
          onClick={() => {
            setExpanded(false)
            if (titleRef?.current?.value) titleRef.current.value = ''
            if (descriptionRef?.current?.value)
              descriptionRef.current.value = ''
            if (usernameRef?.current?.value) usernameRef.current.value = ''
          }}
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

export default CreateNoteForm
