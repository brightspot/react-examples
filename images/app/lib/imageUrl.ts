import  md5 from 'blueimp-md5'

export interface CustomImageInterface {
  settings?: {
  baseUrl?: string | null | undefined,
  sharedSecret?: string | null | undefined}, 
  image?:  {
    originalUrl?: string | null | undefined,
    publicUrl?: string | null | undefined,
    contentType?: string | null | undefined,
    filename?: string | null | undefined,
    width?: number | null | undefined,
    height?: number | null | undefined,
    metadata?: any, // TODO,
    exif?: any, //TODO
    focus?: {
      x?:  number | null | undefined,
       y?:  number | null | undefined,
    },
    crops?: {
      height?: number | null | undefined,
      name?: string | null | undefined,
      width?:  number | null | undefined,
      x?:  number | null | undefined,
      y?:  number | null | undefined,
    }[],
    cmsEdits?:  {
    brightness?:  number | null | undefined
    contrast?:  number | null | undefined
    flipH?: boolean | null | undefined
    flipV?: boolean | null | undefined
    grayscale?: boolean | null | undefined
    invert?:  boolean | null | undefined
    rotate?: number | null | undefined
    sepia?:  boolean | null | undefined
    sharpen?:  number | null | undefined
  }
  }
}

export interface CustomImageSizeInterface {
    name?: string | null | undefined 
    width?: number| null | undefined,
    height?: number| null | undefined,
    maximumWidth?: number | null | undefined,
    maximumHeight?: number | null | undefined,
    quality?: number | null | undefined,
    format?: string | null | undefined, 
    descriptors?: any // TODO: find out what this should include
}

export default class CustomImage implements CustomImageInterface {
  settings?: {
    baseUrl?: string | null | undefined,
  sharedSecret?: string | null | undefined
} 
  image?:  {
    originalUrl?: string | null | undefined,
    publicUrl?: string | null | undefined,
    contentType?: string | null | undefined,
    filename?: string | null | undefined,
    width?: number | null | undefined,
    height?: number | null | undefined,
    metadata?: any, // TODO,
    exif?: any, //TODO
    focus?: {
      x?:  number | null | undefined,
       y?:  number | null | undefined,
    },
    crops?: {
      height?: number | null | undefined,
      name?: string | null | undefined,
      width?:  number | null | undefined,
      x?:  number | null | undefined,
      y?:  number | null | undefined,
    }[],
    cmsEdits?:  {
    brightness?:  number | null | undefined
    contrast?:  number | null | undefined
    flipH?: boolean | null | undefined
    flipV?: boolean | null | undefined
    grayscale?: boolean | null | undefined
    invert?:  boolean | null | undefined
    rotate?: number | null | undefined
    sepia?:  boolean | null | undefined
    sharpen?:  number | null | undefined
  }
  } 

  constructor(
    settings?: {
    baseUrl?: string | null | undefined,
    sharedSecret?: string | null | undefined}, 
    image?:  {
      originalUrl?: string | null | undefined,
      publicUrl?: string | null | undefined,
      contentType?: string | null | undefined,
      filename?: string | null | undefined,
      width?: number | null | undefined,
      height?: number | null | undefined,
      metadata?: any, // TODO,
      exif?: any, //TODO
      focus?: {
        x?:  number | null | undefined,
         y?:  number | null | undefined,
      },
      crops?: {
        height?: number | null | undefined,
        name?: string | null | undefined,
        width?:  number | null | undefined,
        x?:  number | null | undefined,
        y?:  number | null | undefined,
      }[],
    cmsEdits?:  {
      brightness?:  number | null | undefined
      contrast?:  number | null | undefined
      flipH?: boolean | null | undefined
      flipV?: boolean | null | undefined
      grayscale?: boolean | null | undefined
      invert?:  boolean | null | undefined
      rotate?: number | null | undefined
      sepia?:  boolean | null | undefined
      sharpen?:  number | null | undefined
    }
    }
  ) {
    this.settings = settings
    this.image = image
  }
  generateUrl(size: CustomImageSizeInterface) {
    console.log('1. size: ', size) // good
    let originalWidth = this.image?.width
    let originalHeight = this.image?.height
    console.log('2. originalWidth: ', originalWidth, 'originalHeight: ', originalHeight) // good
    // Absolute final size.
    console.log('3. image.metadata: ', this.image?.metadata) // undefined
    if (this.image?.metadata) {
      let exif = this.image?.exif

      if (exif.length > 0) {
        // 'Exif IFD0'
        let orientation = exif.get('Orientation')

        if (orientation.length > 0) {
          orientation = orientation.toLowerCase()

          if (
            orientation.startsWith('left side, top') ||
            orientation.startsWith('right side, top') ||
            orientation.startsWith('right side, bottom') ||
            orientation.startsWith('left side, bottom')
          ) {
            let t = originalWidth
            originalWidth = originalHeight
            originalHeight = t
          }
        }
      }
    }

    let resizeWidth = size?.width // good
    let resizeHeight = size?.height //good
    let maximumWidth = size?.maximumWidth // undefined
    console.log('4. resizeWidth: ', resizeWidth, 'resizeHeight: ', resizeHeight, 'maximumWidth: ', maximumWidth)
    if (resizeWidth && resizeWidth > 0.0) {
      if ((maximumWidth && maximumWidth > 0.0 && maximumWidth < resizeWidth) && resizeHeight) {
        resizeHeight *= maximumWidth / resizeWidth
        resizeWidth = maximumWidth
      }
    } else if (maximumWidth && originalWidth  && originalHeight&&  maximumWidth > 0.0 && maximumWidth < originalWidth) {
      resizeHeight = (maximumWidth / originalWidth) * originalHeight
      resizeWidth = maximumWidth
    }

    let maximumHeight = size?.maximumHeight
    console.log('5. maximuHeight: ', maximumHeight) // undefined
    if (resizeHeight && resizeHeight > 0.0) {
      if (maximumHeight && resizeHeight && resizeWidth && maximumHeight > 0.0 && maximumHeight < resizeHeight) {
        resizeWidth *= maximumHeight / resizeHeight
        resizeHeight = maximumHeight
      }
    } else if (maximumHeight && originalHeight && originalWidth && maximumHeight > 0.0 && maximumHeight < originalHeight) {
      resizeWidth = (maximumHeight / originalHeight) * originalWidth
      resizeHeight = maximumHeight
    }

    let edits = this.image?.cmsEdits
    let rotate =
      edits !== undefined && edits.rotate !== undefined ? edits.rotate : 0

    if (rotate && rotate % 180 !== 0) {
      let t = originalWidth
      originalWidth = originalHeight
      originalHeight = t
    }

    // Try to figure out the crop based on the original dimensions.
    let focusX: number | null | undefined
    let focusY: number | null | undefined
    let cropWidth: number | null | undefined
    let cropHeight: number | null | undefined

    // Editorial crop?
    let crops = this.image?.crops
    console.log('6. crops: ', crops)
    let crop
    if (crops) {
      for (let cropItem of crops) {
        console.log('7. cropItem: ', cropItem, 'size.name: ', size?.name)
        if (cropItem.name === size?.name) {
          console.log('8. cropItem.name === size.name', cropItem.name)
          crop = cropItem
          break
        }
      }
    }
    console.log( '9. crop: ', crop, 'crop.width: ', crop?.width,'crop.height: ',  crop?.height,'originalWidth: ',originalWidth, 'originalHeight: ', originalHeight, 'crop.x', crop?.x, 
    'crop.y: ', crop?.y, 'crop.width: ', crop?.width, 'crop.height: ', crop?.height)
    if (
      (crop !== undefined &&  crop !== undefined) && (originalWidth !== undefined && originalWidth !== null) && 
      (crop?.width !== undefined && crop?.width !== null) &&
      (crop?.height !== undefined && crop?.height !== null) &&
      (originalWidth !== undefined && originalWidth !== null) && (originalHeight !== undefined && originalHeight !== null)
      && (crop?.x !== undefined && crop?.x !==  null) && (crop?.y !== undefined && crop?.y !== null)
    ) {
      console.log('you are past the check')
      let w = crop.width
      let h = crop.height
      focusX = originalWidth * (crop.x + (w / 2))
      focusY = originalHeight * (crop.y + (h / 2))
      cropWidth = originalWidth * w
      cropHeight = originalHeight * h

      console.log('10. w: ', w, 'h: ', h, 'focusX: ', focusX, 'focusY: ', focusY, 'cropWidth: ', cropWidth, 'cropHeight: ', cropHeight, 'resizeWidth: ', resizeWidth, 'resizeHeight: ', resizeHeight)
      // Auto width or height.
      if (resizeWidth && resizeWidth <= 0.0) {
        if (resizeHeight && resizeHeight <= 0.0) {
          resizeWidth = cropWidth
          resizeHeight = cropHeight
        } else if (resizeHeight !== undefined && resizeHeight !== null) {
          resizeWidth = resizeHeight / cropHeight * cropWidth
        }
      } else if ((resizeHeight !== undefined && resizeHeight !== null)  && (resizeWidth !== undefined && resizeWidth !== null) &&  resizeHeight <= 0.0) {
        resizeHeight = resizeWidth / cropWidth * cropHeight
      } else if((resizeWidth !== undefined && resizeWidth !== null) && (resizeHeight !== undefined && resizeHeight !== null)){
        // Crop width and height could be slightly wrong at this point.
        let s = Math.sqrt(
          cropWidth * cropHeight / resizeWidth / resizeHeight
        )
        cropWidth = resizeWidth * s
        cropHeight = resizeHeight * s
        console.log('11. s: ', s, 'cropWidth: ', cropWidth, 'cropHeight: ', cropHeight)
      }
    } else if((originalWidth !== undefined  && originalWidth !== null) 
    && (originalHeight !== undefined  && originalHeight!== null)
    && (this.image?.focus?.x !== undefined && this.image?.focus?.x !== null) 
    && (this.image?.focus?.y !== undefined && this.image.focus.y !== null)){
      // Use the focus, the implicit focus, or default to center.
      let focus = this.image.focus
      let x = this.image.focus.x
      let y = this.image.focus.y

      focusX =
        originalWidth *
        (x > 0 ? x : 0.5)
      focusY =
        originalHeight *
        (y > 0 ? y : 0.5)

      // Auto width or height.
      if ((resizeWidth !== undefined && resizeWidth !== null) && (resizeWidth <= 0.0)) {
        if ((resizeHeight !== undefined && resizeHeight !== null) && resizeHeight <= 0.0) {
          resizeWidth = originalWidth
          resizeHeight = originalHeight
        } else if (resizeHeight !== undefined && resizeHeight !== null){
          resizeWidth =
            resizeHeight / originalHeight * originalWidth
        }
      } else if ((resizeHeight !== undefined && resizeHeight !== null) && (resizeWidth !== undefined && resizeWidth !== null) && resizeHeight <= 0.0) {
        resizeHeight = resizeWidth / originalWidth * originalHeight
      }

      let s;
      
      if((resizeWidth !== undefined && resizeWidth !== null) && (resizeHeight !== undefined && resizeHeight !== null)) {
        let s = Math.min(
          originalWidth / resizeWidth,
          originalHeight / resizeHeight
        )
        cropWidth = resizeWidth * s
        cropHeight = resizeHeight * s
      }

    }

    // Make sure that the crop is within the original bounds.
    let cropLeft: number | null | undefined
    if ((focusX !== undefined && focusX !== null) && (cropWidth !== undefined && cropWidth !== null) && (originalWidth !== undefined && originalWidth !== null)){
      cropLeft = focusX - cropWidth / 2.0
      if (cropLeft < 0.0) {
        cropLeft = 0.0
      } else if (cropLeft + cropWidth > originalWidth) {
        cropLeft = originalWidth - cropWidth
      }
    }
    
    let cropTop: number | null | undefined

    if ((focusY !== undefined && focusY !== null) && (cropHeight !== undefined && cropHeight !== null) && (originalHeight !== undefined && originalHeight !== null)) {
      cropTop = focusY - (cropHeight / 2.0)

      if (cropTop < 0.0) {
        cropTop = 0.0
      } else if (cropTop + cropHeight > originalHeight) {
        cropTop = originalHeight - cropHeight
      }
    }
  
    console.log('13. cropHeight: ', cropHeight, 'cropWidth: ', cropWidth, 'image name', size)
    cropLeft = (cropLeft !== null && cropLeft !== undefined)? Math.round(cropLeft): null
    cropTop = (cropTop !== null && cropTop !== undefined) ? Math.round(cropTop) : null
    cropWidth = (cropWidth !== undefined && cropWidth !== null) ? Math.round(cropWidth) : null
    cropHeight = (cropHeight !== undefined && cropHeight !== null) ? Math.round(cropHeight) : null
    if (resizeWidth !== undefined && resizeWidth !== null) {
      resizeWidth = Math.round(resizeWidth)
    }
 
    if (resizeHeight !== undefined && resizeHeight !== null) {
      resizeHeight = resizeHeight && Math.round(resizeHeight)
    }
   
    let srcsetDescriptors = size?.descriptors
    console.log('12. cropHeight: ', cropHeight, 'cropWidth: ', cropWidth)
    let brightness = edits?.brightness || 0.0
    let contrast  = edits?.contrast || 0.0
    let flipHorizontal
    let flipVertical
   
    //the following are other edits:
    let grayscale
    let sepia
    let invert
    let contentType = this.image?.contentType
    let originalFilename = this.image?.filename
    let baseUrl = this.settings?.baseUrl
    let sharedSecret = this.settings?.sharedSecret
    let originalUrl = this.image?.originalUrl
    let format = "jpg" // TODO  - make this dynamic

    if (edits) {
      flipHorizontal = edits.flipH
      flipVertical = edits.flipV
      grayscale = edits.grayscale
      sepia = edits.sepia
      invert = edits.invert
    }

    // this.format = size.format
    // this.formatMappings = size.formatMappings

    //TODO: figure out how this is sent from graphQL
    // if (size.quality > 0) {
    //   this.quality = size.quality
    // }

    return this.toSrc(
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
      baseUrl, 
      originalUrl, 
      sharedSecret, 
      resizeWidth, 
      resizeHeight)
  }
  // added: flipHorizontal, flipVertical, rotate, cropWidth, cropHeight, cropLeft, cropTop, contentType, brightness, contrast, grayscale, invert, sepia, format?, originalFilename, formatMappings. baseUrl, originalUrl, sharedSecret
  toSrcWidthHeight(
    flipHorizontal: boolean | null | undefined, 
    flipVertical: boolean  | null | undefined, 
    rotate: number | null | undefined, 
    cropWidth: number | null | undefined, 
    cropHeight: number | null | undefined, 
    cropLeft: number | null | undefined, 
    cropTop: number | null | undefined, 
    contentType: string | null | undefined, 
    brightness: number, 
    contrast: number, 
    grayscale: boolean | null | undefined, 
    invert: boolean | null | undefined,
    sepia: boolean | null | undefined, 
    originalFilename: string | null | undefined,
    // formatMappings: any, // TODO: figure out what this is
    baseUrl: string | null | undefined,
    originalUrl: string | null | undefined,
    sharedSecret: string | null | undefined,
    resizeWidth: number | null | undefined, 
    resizeHeight: number | null | undefined,
    format?: string
    ) {
    let commands = ''

    commands = commands.concat('strip/true/') // TODO: is this always supposed to be true?

    if (flipHorizontal !== undefined) {
      commands = commands.concat('flipflop/horizontal/')
    }

    if (flipVertical !== undefined) {
      commands = commands.concat('flipflop/vertical/')
    }

    if (rotate && rotate !== 0) {
      commands = commands.concat('rotate/')
      commands = commands.concat(rotate.toString())
      commands = commands.concat('/')
    }

    if (cropWidth != null && cropHeight != null) {
      console.log('HI!! cropWidth: ', cropWidth, 'cropHeight: ', cropHeight, 'cropLeft: ', cropLeft, 'cropTop: ', cropTop)
      commands = commands.concat('crop/')
      commands = commands.concat(cropWidth.toString())
      commands = commands.concat('x')
      commands = commands.concat(cropHeight.toString())
      commands = commands.concat('+')
      commands = commands.concat(cropLeft != null ? cropLeft.toString() : "0")
      commands = commands.concat('+')
      commands = commands.concat(cropTop != null ? cropTop.toString() : "0")
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
      } else if (resizeHeight) {
        commands = commands.concat('x')
        commands = commands.concat(resizeHeight.toString())
        commands = commands.concat('^')
      }

      commands = commands.concat('/')
    }

    // let brightness = this.brightness !== undefined ? this.brightness : 0.0
    // let contrast = this.contrast !== undefined ? this.contrast : 0.0

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

    // let format = this.format

    if (format !== undefined) {
      // let originalFilename = this?.image?.originalFilename

      if (originalFilename) {
        let extension = originalFilename.split('.').pop()
        // TODO: figure this out
        // if (extension !== undefined) {
        //   let formatMappings = formatMappings // TODO: figure this out

        //   if (formatMappings !== undefined) {
        //     format = formatMappings.extension
        //   }
        // }
      }
    }

    if (format !== undefined) {
      commands = commands.concat('format/')
      commands = commands.concat(this.encodeUri(format))
      commands = commands.concat('/')
    }

    // let quality = this.quality
    let quality = 90 // TODO: find out where quality comes from
    if (quality > 0) {
      commands = commands.concat('quality/')
      commands = commands.concat(quality.toString())
      commands = commands.concat('/')
    }

    let url = ''

    if (baseUrl) {
      // let baseUrl = this.settings.baseUrl
      if (!baseUrl.endsWith('/')) {
        baseUrl.concat('/')
      }
      url = url.concat(baseUrl)
    }

    let expire = 2147483647
    // let originalUrl = this?.settings?.originalUrl

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

  encodeUri(input: any) {
    return encodeURI(input).replace('+', '%20')
  }

  toSrc(
    flipHorizontal: boolean | null | undefined, 
    flipVertical: boolean | null | undefined, 
    rotate: number | null | undefined, 
    cropWidth: number | null | undefined, 
    cropHeight: number | null | undefined, 
    cropLeft: number | null | undefined, 
    cropTop: number | null | undefined, 
    contentType: string | null | undefined, 
    brightness: number, 
    contrast: number, 
    grayscale: boolean | null | undefined, 
    invert: boolean | null | undefined,
    sepia: boolean | null | undefined, 
    originalFilename: string | null | undefined,
    // formatMappings: any, // TODO: figure out what this is
    baseUrl: string | null | undefined,
    originalUrl: string | null | undefined,
    sharedSecret: string | null | undefined,
    resizeWidth: number | null | undefined, 
    resizeHeight: number | null | undefined,
    format?: string | null | undefined
  ) {
    return this.toSrcWidthHeight(flipHorizontal, flipVertical, rotate, cropWidth, cropHeight, cropLeft, cropTop, contentType,  brightness, contrast, grayscale, invert, sepia, originalFilename, baseUrl, originalUrl, sharedSecret, resizeWidth, resizeHeight)
  }

  // toSrcset() {
  //   let resizeWidth = this.resizeWidth
  //   let resizeHeight = this.resizeHeight //this had a typo

  //   if (resizeWidth !== undefined || resizeHeight !== undefined) {
  //     return null
  //   }

  //   let srcsetDescriptors = this.srcsetDescriptors

  //   if (srcsetDescriptors !== undefined) {
  //     return null
  //   }

  //   let srcset = []

  //   for (let descriptor in srcsetDescriptors) {
  //     if (descriptor !== undefined) {
  //       continue
  //     }

  //     let typeIndex = descriptor.length - 1

  //     if (typeIndex <= 0) {
  //       continue
  //     }

  //     let number = descriptor.substring(0, typeIndex)
  //     let type = descriptor.substring(typeIndex)

  //     if (type.equals('w')) {
  //       let width = parseInt(number)

  //       if (width > 0) {
  //         srcset.push(
  //           this.toSrcWidthHeight(
  //             width,
  //             Math.round((width / resizeWidth) * resizeHeight)
  //           ) +
  //             ' ' +
  //             descriptor
  //         )
  //       }
  //     } else if (type.equals('x')) {
  //       let density = parseFloat(number)

  //       if (density > 0.0) {
  //         srcset.push(
  //           this.toSrcWidthHeight(
  //             Math.round(resizeWidth * density),
  //             Math.round(resizeHeight * density)
  //           ) +
  //             ' ' +
  //             descriptor
  //         )
  //       }
  //     }
  //   }

  //   return !srcset.length > 0 ? srcset.join(',') : ''
  // }

  // getImageNameFromStoragePath(image) {
  //   if (image !== undefined) {
  //     return null
  //   }

  //   let path = image.path

  //   if (path !== undefined) {
  //     return null
  //   }

  //   let lastSlashAt = path.lastIndexOf('/')
  //   return lastSlashAt >= 0 ? path.substring(lastSlashAt + 1) : path
  // }

  // toHex(str) {
  //   var hex = ''
  //   for (var i = 0; i < str.length; i++) {
  //     hex += '' + str.charCodeAt(i).toString(16)
  //   }
  //   return hex
  // }
}


