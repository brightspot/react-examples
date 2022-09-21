import { useState } from 'react'

const ColorQuery = `
query ColorQuery($name: String) {
  Color(model: {name: $name}) {
    name
    hexValue
  }
}`

type ColorData = {
  name?: string
  hexValue?: string
}

type ColorResponse = {
  colorData?: ColorData
  errors?: string[]
}

const dataRequestParams = (input: string) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ColorQuery,
      variables: {
        name: `${input}`,
      },
    }),
  }
}

const Colors = () => {
  const [colorResponse, setColorResponse] = useState<ColorResponse>()
  const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL ?? ''

  const handleResponse = (res: any) => {
    let colorData: ColorData | undefined
    let errors: string[] = []
    if (res?.data?.Color) {
      colorData = {
        name: res.data.Color.name,
        hexValue: res.data.Color.hexValue,
      }
    }
    if (res.errors) {
      for (let error of res.errors) {
        errors.push(error.message)
      }
    }
    setColorResponse({
      colorData: colorData,
      errors: errors,
    })
  }

  const handleError = (error: Error) => {
    setColorResponse({
      errors: [error.message],
    })
  }

  const fetchAndSetContent = (input: string) => {
    if (!input || input.trim() === '') {
      setColorResponse({})
      return
    }

    fetch(GRAPHQL_URL, dataRequestParams(input))
      .then((res) => res.json())
      .then((res) => handleResponse(res))
      .catch((error: Error) => handleError(error))
  }

  const hexValue = colorResponse?.colorData?.hexValue
  const colorName = colorResponse?.colorData?.name

  return (
    <div className="container">
      <div className="input-wrapper">
        <label htmlFor="id-url">Enter Color Name:</label>
        <input
          required
          name="id-url"
          onChange={(e) => {
            e.preventDefault()
            fetchAndSetContent(e.target.value)
          }}
        />
      </div>
      <div className="content-container">
        <h1 style={{ color: hexValue || '#000000' }}>{colorName}</h1>
        <h3 style={{ color: hexValue || '#000000' }}>
          {colorName === 'Brightspot'
            ? 'The most complete CMS solution available today'
            : hexValue}
        </h3>
      </div>
      {colorResponse?.errors?.map((error, i) => (
        <p className="error" key={i}>
          {error}
        </p>
      ))}
    </div>
  )
}

export default Colors
