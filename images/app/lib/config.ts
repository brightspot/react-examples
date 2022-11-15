export interface CustomImageSize {
  name?: string | null | undefined
  width?: number | null | undefined
  height?: number | null | undefined
  maximumWidth?: number | null | undefined
  maximumHeight?: number | null | undefined
  quality?: number | null | undefined
  format?: string | null | undefined
  descriptors: any // TODO: update this type
  formatMappings: Object[] | null | undefined
}

export interface CustomImageConfiguration {
  settings: {
    baseUrl: string
    sharedSecret: string
  }
  image: {
    originalUrl?: string | null | undefined
    publicUrl?: string | null | undefined
    contentType?: string | null | undefined
    filename?: string | null | undefined
    width?: number | null | undefined
    height?: number | null | undefined
    // exif?: any, // TODO: update when added to graphQL schema

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
  metadata?: any // TODO,
  exif?: any //TODO
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

export interface ImageUrl {
  resizedUrlsObject: {
    mainUrl: string
    srcsetUrls?: string | null | undefined
  }
  size?: {
    height?: number | null | undefined
    width?: number | null | undefined
    name?: string | null | undefined
  }
}
