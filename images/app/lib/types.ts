export interface CustomImageSize {
  name?: string | null | undefined
  width?: number | null | undefined
  height?: number | null | undefined
  maximumWidth?: number | null | undefined
  maximumHeight?: number | null | undefined
  quality?: number | null | undefined
  format?: string | null | undefined
  descriptors: string[] | null | undefined
  formatMappings: { [key: string]: string }[] | null
}

export interface CustomImageConfiguration {
  settings: Settings
  image: CustomImage
  size: CustomImageSize
}

export interface Settings {
  baseUrl: string
  sharedSecret: string
}

export interface CustomImage {
  originalUrl?: string | null | undefined
  publicUrl?: string | null | undefined
  contentType?: string | null | undefined
  filename?: string | null | undefined
  width?: number | null | undefined
  height?: number | null | undefined
  exif?: any //TODO: update once data available in graphQL response
  focus?: {
    x?: number | null | undefined
    y?: number | null | undefined
  }
  crops?: {
    height?: number | null | undefined
    name?: string | null | undefined
    width?: number | null | undefined
    x?: number | null | undefined
    y?: number | null | undefined
  }[]
  cmsEdits?: {
    brightness?: number | null | undefined
    contrast?: number | null | undefined
    flipH?: boolean | null | undefined
    flipV?: boolean | null | undefined
    grayscale?: boolean | null | undefined
    invert?: boolean | null | undefined
    rotate?: number | null | undefined
    sepia?: boolean | null | undefined
    sharpen?: number | null | undefined
  }
}

export interface Crop {
  height?: number | null | undefined
  name?: string | null | undefined
  width?: number | null | undefined
  x?: number | null | undefined
  y?: number | null | undefined
}
