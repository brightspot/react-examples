import md5 from 'blueimp-md5'
import { Settings, CustomImage, CustomImageSize, Crop } from './config'

export function generateUrl(
  settings: Settings,
  image: CustomImage,
  size: CustomImageSize
) {
  let originalWidth = image.width || null
  let originalHeight = image.height || null

  // Absolute final size
  // TODO: get data from metadata in graphQL
  // if (image.metadata !== undefined) {
  //   let exif = image.exif

  //   if (exif.length > 0) { // 'Exif IFD0'
  //     let orientation = exif.get('Orientation')

  //     if (orientation.length > 0) {
  //       orientation = orientation.toLowerCase()

  //       if (orientation.startsWith('left side, top') ||
  //         orientation.startsWith('right side, top') ||
  //         orientation.startsWith('right side, bottom') ||
  //         orientation.startsWith('left side, bottom')) {
  //         let t = originalWidth
  //         originalWidth = originalHeight
  //         originalHeight = t
  //       }
  //     }
  //   }
  // }

  let resizeWidth = size.width || null
  let resizeHeight = size.height || null
  let maximumWidth = size.maximumWidth || null
  let formatMappings = size.formatMappings || []

  if (resizeWidth !== null && resizeWidth > 0.0) {
    if (
      maximumWidth !== null &&
      resizeWidth !== null &&
      resizeHeight !== null &&
      maximumWidth !== null &&
      maximumWidth > 0.0 &&
      maximumWidth < resizeWidth
    ) {
      resizeHeight *= maximumWidth / resizeWidth
      resizeWidth = maximumWidth
    }
  } else if (
    maximumWidth !== null &&
    originalWidth !== null &&
    originalHeight !== null &&
    maximumWidth > 0.0 &&
    maximumWidth < originalWidth
  ) {
    resizeHeight = (maximumWidth / originalWidth) * originalHeight
    resizeWidth = maximumWidth
  }

  let maximumHeight = size.maximumHeight

  if (
    resizeHeight !== null &&
    maximumHeight != null &&
    maximumHeight !== undefined &&
    resizeHeight > 0.0
  ) {
    if (
      resizeWidth !== null &&
      maximumHeight > 0.0 &&
      maximumHeight < resizeHeight
    ) {
      resizeWidth *= maximumHeight / resizeHeight
      resizeHeight = maximumHeight
    }
  } else if (
    originalHeight !== null &&
    originalWidth !== null &&
    maximumHeight !== null &&
    maximumHeight !== undefined &&
    maximumHeight > 0.0 &&
    maximumHeight < originalHeight
  ) {
    resizeWidth = (maximumHeight / originalHeight) * originalWidth
    resizeHeight = maximumHeight
  }

  let edits = image.cmsEdits

  let rotate = edits?.rotate || 0

  if (rotate % 180 !== 0) {
    let t = originalWidth
    originalWidth = originalHeight
    originalHeight = t
  }

  // Try to figure out the crop based on the original dimensions.
  let focusX: number | null = null
  let focusY: number | null = null
  let cropWidth: number | null = null
  let cropHeight: number | null = null

  // Editorial crop?
  let crops = image.crops || []
  let crop: Crop | null = null
  if (crops.length > 0) {
    for (let cropItem of crops) {
      if (cropItem.name === size?.name) {
        crop = cropItem
        break
      }
    }
  }

  if (
    crop !== null &&
    originalWidth !== null &&
    crop?.width !== undefined &&
    crop?.width !== null &&
    crop?.height !== undefined &&
    crop?.height !== null &&
    originalWidth !== null &&
    originalHeight !== null &&
    crop?.x !== undefined &&
    crop?.x !== null &&
    crop?.y !== undefined &&
    crop?.y !== null
  ) {
    let w = crop.width
    let h = crop.height

    focusX = originalWidth * (crop.x + w / 2)
    focusY = originalHeight * (crop.y + h / 2)

    cropWidth = originalWidth * w
    cropHeight = originalHeight * h
    // Auto width or height.

    if (resizeWidth !== null && resizeWidth <= 0.0) {
      if (resizeHeight !== null && resizeHeight <= 0.0) {
        resizeWidth = cropWidth
        resizeHeight = cropHeight
      } else if (resizeHeight !== null) {
        resizeWidth = (resizeHeight / cropHeight) * cropWidth
      }
    } else if (
      resizeWidth !== null &&
      resizeHeight !== null &&
      resizeHeight <= 0.0
    ) {
      resizeHeight = (resizeWidth / cropWidth) * cropHeight
    } else if (resizeWidth !== null && resizeHeight !== null) {
      // Crop width and height could be slightly wrong at this point.
      let s = Math.sqrt((cropWidth * cropHeight) / resizeWidth / resizeHeight)

      cropWidth = resizeWidth * s
      cropHeight = resizeHeight * s
    }
  } else if (originalWidth !== null && originalHeight !== null) {
    // Use the focus, the implicit focus, or default to center.
    let x = image?.focus?.x
    let y = image?.focus?.y
    focusX = originalWidth! * (x !== null && x !== undefined && x > 0 ? x : 0.5)
    focusY =
      originalHeight! * (y !== null && y !== undefined && y > 0 ? y : 0.5)

    // Auto width or height.
    if (resizeWidth !== null && resizeWidth <= 0.0) {
      if (resizeHeight !== null && resizeHeight <= 0.0) {
        resizeWidth = originalWidth
        resizeHeight = originalHeight
      } else if (resizeHeight !== null) {
        resizeWidth = (resizeHeight / originalHeight!) * originalWidth
      }
    } else if (
      resizeHeight !== null &&
      resizeWidth !== null &&
      resizeHeight <= 0.0
    ) {
      resizeHeight = (resizeWidth / originalWidth) * originalHeight
    }

    if (resizeWidth !== null && resizeHeight !== null) {
      let s = Math.min(
        originalWidth / resizeWidth,
        originalHeight / resizeHeight
      )
      cropWidth = resizeWidth * s
      cropHeight = resizeHeight * s
    }
  }

  // Make sure that the crop is within the original bounds.
  let cropLeft: number | null = null
  if (focusX !== null && cropWidth !== null && originalWidth !== null) {
    cropLeft = focusX - cropWidth / 2.0
    if (cropLeft < 0.0) {
      cropLeft = 0.0
    } else if (cropLeft + cropWidth > originalWidth) {
      cropLeft = originalWidth - cropWidth
    }
  }

  let cropTop: number | null = null

  if (
    focusY !== undefined &&
    focusY !== null &&
    cropHeight !== null &&
    originalHeight !== null
  ) {
    cropTop = focusY - cropHeight / 2.0

    if (cropTop < 0.0) {
      cropTop = 0.0
    } else if (cropTop + cropHeight > originalHeight) {
      cropTop = originalHeight - cropHeight
    }
  }

  cropLeft = cropLeft != null ? Math.round(cropLeft) : null
  cropTop = cropTop !== null ? Math.round(cropTop) : null
  cropWidth = cropWidth !== null ? Math.round(cropWidth) : null
  cropHeight = cropHeight !== null ? Math.round(cropHeight) : null
  if (resizeWidth != null) {
    resizeWidth = Math.round(resizeWidth)
  }

  if (resizeHeight !== null) {
    resizeHeight = resizeHeight && Math.round(resizeHeight)
  }

  let srcsetDescriptors = size?.descriptors

  let brightness = edits?.brightness || 0.0
  let contrast = edits?.contrast || 0.0
  let flipHorizontal
  let flipVertical

  //the following are other edits:
  let grayscale: boolean | null | undefined
  let sepia: boolean | null | undefined
  let invert: boolean | null | undefined
  let contentType = image?.contentType
  let originalFilename = image?.filename
  let baseUrl = settings?.baseUrl
  let sharedSecret = settings?.sharedSecret
  let originalUrl = image?.originalUrl
  let format = size?.format
  let quality = size?.quality || 90

  if (edits) {
    flipHorizontal = edits.flipH
    flipVertical = edits.flipV
    grayscale = edits.grayscale
    sepia = edits.sepia
    invert = edits.invert
  }

  const mainUrl = toSrcWidthHeight(
    flipHorizontal,
    flipVertical,
    rotate,
    cropWidth,
    cropHeight,
    cropLeft,
    cropTop,
    contentType,
    brightness,
    contrast,
    grayscale,
    invert,
    sepia,
    originalFilename,
    formatMappings,
    baseUrl,
    originalUrl,
    sharedSecret,
    resizeWidth,
    resizeHeight,
    quality,
    format
  )

  let srcsetUrls: {
    srcSetUrlsString: string
    srcsetUrlsHashMap?: Object
  } | null = null

  if (srcsetDescriptors && srcsetDescriptors?.length > 0) {
    srcsetUrls = toSrcset(
      srcsetDescriptors,
      flipHorizontal,
      flipVertical,
      rotate,
      cropWidth,
      cropHeight,
      cropLeft,
      cropTop,
      contentType,
      brightness,
      contrast,
      grayscale,
      invert,
      sepia,
      originalFilename,
      formatMappings,
      baseUrl,
      originalUrl,
      sharedSecret,
      resizeWidth,
      resizeHeight,
      quality,
      format
    )
  }

  return {
    mainUrl,
    srcsetUrls,
  }
}

function toSrcWidthHeight(
  flipHorizontal: boolean | null | undefined,
  flipVertical: boolean | null | undefined,
  rotate: number | null | undefined,
  cropWidth: number | null,
  cropHeight: number | null,
  cropLeft: number | null | undefined,
  cropTop: number | null | undefined,
  contentType: string | null | undefined,
  brightness: number,
  contrast: number,
  grayscale: boolean | null | undefined,
  invert: boolean | null | undefined,
  sepia: boolean | null | undefined,
  originalFilename: string | null | undefined,
  formatMappings: Object[] | null | undefined,
  baseUrl: string | null | undefined,
  originalUrl: string | null | undefined,
  sharedSecret: string | null | undefined,
  resizeWidth: number | null,
  resizeHeight: number | null,
  quality: number,
  format?: string | null | undefined
) {
  let commands = ''

  commands = commands.concat('strip/true/') // strip is always set to true for this module
  if (flipHorizontal) {
    commands = commands.concat('flipflop/horizontal/')
  }

  if (flipVertical) {
    commands = commands.concat('flipflop/vertical/')
  }

  if (rotate && rotate !== 0) {
    commands = commands.concat('rotate/')
    commands = commands.concat(rotate.toString())
    commands = commands.concat('/')
  }

  if (cropWidth != null && cropHeight != null) {
    commands = commands.concat('crop/')
    commands = commands.concat(cropWidth.toString())
    commands = commands.concat('x')
    commands = commands.concat(cropHeight.toString())
    commands = commands.concat('+')
    commands = commands.concat(cropLeft != null ? cropLeft.toString() : '0')
    commands = commands.concat('+')
    commands = commands.concat(cropTop != null ? cropTop.toString() : '0')
    commands = commands.concat('/')
  }

  if (
    'image/svg+xml' !== contentType &&
    (resizeWidth != null || resizeHeight != null)
  ) {
    commands = commands.concat('resize/')

    if (resizeWidth != null) {
      commands = commands.concat(resizeWidth.toString())
      commands = commands.concat('x')

      if (resizeHeight != null) {
        commands = commands.concat(resizeHeight.toString())
        commands = commands.concat('!')
      } else {
        commands = commands.concat('^')
      }
    } else if (resizeHeight !== null) {
      commands = commands.concat('x')
      commands = commands.concat(resizeHeight.toString())
      commands = commands.concat('^')
    }

    commands = commands.concat('/')
  }

  if (brightness !== 0.0 || contrast !== 0.0) {
    commands = commands.concat('brightness/')
    commands = commands.concat(((brightness * 100) / 1.5).toString())
    commands = commands.concat('x')
    commands = commands.concat((contrast * 100).toString())
    commands = commands.concat('/')
  }

  if (grayscale) {
    commands = commands.concat('grayscale/true/')
  }
  if (invert) {
    commands = commands.concat('invert/true/')
  }
  if (sepia) {
    commands = commands.concat('sepia/0.8/')
  }

  // if format is defined then format mappings is not needed
  // if (format !== undefined && format !== null) {
  //   if (originalFilename) {
  //     let extension = originalFilename.split('.').pop()
  //     if (extension !== undefined && format !== extension) {
  //       format = extension
  //     }
  //   }
  // } else
  if (formatMappings && formatMappings.length > 0) {
    if (originalFilename) {
      let extension = originalFilename.split('.').pop()
      formatMappings.forEach((mapping: any) => {
        for (const key in mapping) {
          if (key === extension) {
            format = mapping[key]
          }
        }
      })
    }
  }

  if (format !== undefined && format !== null) {
    commands = commands.concat('format/')
    commands = commands.concat(encodeUri(format))
    commands = commands.concat('/')
  }

  if (quality > 0) {
    commands = commands.concat('quality/')
    commands = commands.concat(quality.toString())
    commands = commands.concat('/')
  }

  let url = ''

  if (baseUrl) {
    if (!baseUrl.endsWith('/')) {
      baseUrl.concat('/')
    }
    url = url.concat(baseUrl)
  }

  let expire = 2147483647

  if (originalUrl && originalUrl.startsWith('/')) {
    originalUrl = originalUrl.concat('http://localhost')
  }

  // Workaround for mod_dims encoding bug.
  originalUrl = originalUrl && decodeURI(originalUrl)

  if (sharedSecret) {
    let signature = expire + sharedSecret + commands + originalUrl

    url = url.concat(md5(signature, null, false).substring(0, 7))
    url = url.concat('/')
    url = url.concat(expire.toString())
    url = url.concat('/')
  }

  url = url.concat(commands)
  url = url.concat('?url=')
  if (originalUrl) {
    url = url.concat(encodeURIComponent(originalUrl))
  }
  return url
}

function toSrcset(
  srcsetDescriptors: any, // TODO: update this type
  flipHorizontal: boolean | null | undefined,
  flipVertical: boolean | null | undefined,
  rotate: number | null | undefined,
  cropWidth: number | null,
  cropHeight: number | null,
  cropLeft: number | null | undefined,
  cropTop: number | null | undefined,
  contentType: string | null | undefined,
  brightness: number,
  contrast: number,
  grayscale: boolean | null | undefined,
  invert: boolean | null | undefined,
  sepia: boolean | null | undefined,
  originalFilename: string | null | undefined,
  formatMappings: Object[] | null | undefined,
  baseUrl: string | null | undefined,
  originalUrl: string | null | undefined,
  sharedSecret: string | null | undefined,
  resizeWidth: number | null,
  resizeHeight: number | null,
  quality: number,
  format?: string | null | undefined
) {
  if (!srcsetDescriptors || srcsetDescriptors.length <= 0) {
    return null
  } else {
    let srcset: string[] = []
    for (let i = 0; i < srcsetDescriptors.length; i++) {
      let typeIndex = srcsetDescriptors[i].length - 1

      if (typeIndex <= 0) {
        continue
      }
      let number = srcsetDescriptors[i].substring(0, typeIndex)
      let type = srcsetDescriptors[i].substring(typeIndex)
      if (type === 'w') {
        const width = parseInt(number)

        if (width > 0 && resizeWidth !== null && resizeHeight !== null) {
          // const aspectRatio = resizeWidth / resizeHeight // so width will be 1, height will be value of aspectRatio
          const height = Math.round((width / resizeWidth) * resizeHeight)

          srcset.push(
            toSrcWidthHeight(
              flipHorizontal,
              flipVertical,
              rotate,
              cropWidth,
              cropHeight,
              cropLeft,
              cropTop,
              contentType,
              brightness,
              contrast,
              grayscale,
              invert,
              sepia,
              originalFilename,
              formatMappings,
              baseUrl,
              originalUrl,
              sharedSecret,
              width,
              height,
              quality,
              format
            ) +
              ' ' +
              srcsetDescriptors[i]
          )
        }
      } else if (type === 'x') {
        let density = parseFloat(number)

        if (density > 0.0 && resizeWidth !== null && resizeHeight !== null) {
          const width = Math.round(resizeWidth * density)
          const height = Math.round(resizeHeight * density)

          srcset.push(
            toSrcWidthHeight(
              flipHorizontal,
              flipVertical,
              rotate,
              cropWidth,
              cropHeight,
              cropLeft,
              cropTop,
              contentType,
              brightness,
              contrast,
              grayscale,
              invert,
              sepia,
              originalFilename,
              formatMappings,
              baseUrl,
              originalUrl,
              sharedSecret,
              width,
              height,
              quality,
              format
            ) +
              ' ' +
              srcsetDescriptors[i]
          )
        }
      }
    }

    const srcsetHashMap: any = {}
    if (srcset.length > 0) {
      srcset.map((item: any) => {
        const tempArray = item.split(' ')
        srcsetHashMap[tempArray[1]] = tempArray[0]
      })
    }

    if (srcset.length > 0) {
      return {
        srcSetUrlsString: srcset.join(','),
        srcSetUrlsHashMap: srcsetHashMap,
      }
    } else {
      return null
    }
  }
}

// // TODO: is this needed?
// function toHex(str: string) {
//   let hex = ''
//   for (let i = 0; i < str.length; i++) {
//     hex += '' + str.charCodeAt(i).toString(16)
//   }
//   return hex
// }

function encodeUri(input: string) {
  return encodeURI(input).replace('+', '%20')
}
