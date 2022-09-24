import styles from './CreateNoteForm.module.css'
import { useState, useRef, useEffect } from 'react'

import {
  Brightspot_Example_Content_Management_Note,
  Mutation,
  CreateAndUpdateNoteMutationVariables,
} from '../../generated/graphql'
import { assertIsNode, runErrorWithTimeout } from '../../helpers/utils'

type Props = {
  getItems: (
    pageNumber: number,
    predicate: boolean,
    queryItem?: string,
    newItem?: Brightspot_Example_Content_Management_Note
  ) => void
  pageNumber: number
}

const CreateNoteForm = ({ getItems, pageNumber }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const url = `${process.env.NEXT_PUBLIC_HOST}/api/notes/new`
  const params = (data: CreateAndUpdateNoteMutationVariables) => {
    return {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  useEffect(() => {
    runErrorWithTimeout(error, setError, 3000)
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

  const processResponse = (res: Mutation) => {
    if (res.brightspot_example_content_management_NoteSave) {
      const newItem: Brightspot_Example_Content_Management_Note =
        res.brightspot_example_content_management_NoteSave
      if (newItem) {
        getItems(pageNumber, false, '', newItem)
      }

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
    } else if (res) {
      setError(res as unknown as string)
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
      .catch((err: Error) => {
        if (!error) {
          setError(err.message)
        }
      })
  }

  return (
    <form
      className={styles.form}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()
        submitNewNote()
      }}
    >
      <div
        className={styles.wrapper}
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
          className={styles.input}
          required
          name="title"
          aria-label="Title"
          ref={titleRef}
          placeholder="Title"
          title="Title"
        />
        <div className={`${expanded ? styles.notCollapsed : styles.collapsed}`}>
          <textarea
            className={styles.input}
            aria-label="Description"
            ref={descriptionRef}
            required
            name="description"
            placeholder="Description..."
            title="Description"
          />
          <input
            className={styles.input}
            aria-label="User name"
            ref={usernameRef}
            required
            name="username"
            placeholder="Username"
            title="User name"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div
        className={`${styles.bottom} ${
          expanded ? styles.notCollapsed : styles.collapsed
        }`}
      >
        <button
          type="submit"
          className={`${styles.button} ${
            expanded ? styles.notCollapsed : styles.collapsed
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
          className={`${styles.button} ${
            expanded ? styles.notCollapsed : styles.collapsed
          }`}
        >
          Close
        </button>
      </div>
    </form>
  )
}

export default CreateNoteForm
