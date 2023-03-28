export interface TextData {
  AviationAlphabetEndpoint?: {
    converter?: {
      output?: string
      text?: string
    }
  }
  httpMethod?: string
  cacheControl?: string
  xCache?: string
  errors: [{ message: string }]
}

export interface CheckboxesData {
  AviationAlphabetEndpoint?: {
    codes?: any
  }
  httpMethod?: string
  cacheControl?: string
  xCache?: string
  errors: [{ message: string }]
}
