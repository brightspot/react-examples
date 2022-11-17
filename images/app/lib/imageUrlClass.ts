import md5 from 'blueimp-md5'
import {
  CustomImageConfiguration,
  Settings,
  CustomImage,
  CustomImageSize,
} from './types'

class ImageUrlCreator implements CustomImageConfiguration {
  resizeWidth: number | null | undefined
  resizeHeight: number | null | undefined
  rotate: number | null | undefined
  cropLeft: number | undefined
  cropTop: number | undefined
  cropWidth: number | undefined
  cropHeight: number | undefined
  srcsetDescriptors: string[] | null | undefined
  brightness: number | null | undefined
  contrast: number | null | undefined
  flipVertical: boolean | null | undefined
  flipHorizontal: boolean | null | undefined
  filter: any
  format: any
  formatMappings: { [key: string]: string }[] | null | undefined
  quality: number | undefined

  constructor(
    public settings: Settings,
    public image: CustomImage,
    public size: CustomImageSize
  ) {
    this.settings = settings
    this.image = image
    this.size = size

    this.resizeWidth = this.size.width
    this.resizeHeight = this.size.height
  }

  public generateUrl() {
    let originalWidth = this.image.width || 0
    let originalHeight = this.image.height || 0
    if (this.image.exif && this.image.exif.length > 0) {
      let orientation = this.image.exif.get('Orientation')

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

    let maximumWidth = this.size.maximumWidth || 0
    if (
      this.resizeWidth !== null &&
      this.resizeWidth !== undefined &&
      this.resizeWidth > 0.0
    ) {
      if (
        this.resizeHeight != null &&
        this.resizeHeight !== undefined &&
        maximumWidth > 0.0 &&
        maximumWidth < this.resizeWidth
      ) {
        this.resizeHeight *= maximumWidth / this.resizeWidth
        this.resizeWidth = maximumWidth
      }
    } else if (maximumWidth > 0.0 && maximumWidth < originalWidth) {
      this.resizeHeight = (maximumWidth / originalWidth) * originalHeight
      this.resizeWidth = maximumWidth
    }

    let maximumHeight = this.size.maximumHeight || 0.0
    if (
      this.resizeHeight !== undefined &&
      this.resizeHeight !== null &&
      this.resizeHeight > 0.0
    ) {
      if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        maximumHeight > 0.0 &&
        maximumHeight < this.resizeHeight
      ) {
        this.resizeWidth *= maximumHeight / this.resizeHeight
        this.resizeHeight = maximumHeight
      }
    } else if (maximumHeight > 0.0 && maximumHeight < originalHeight) {
      this.resizeWidth = (maximumHeight / originalHeight) * originalWidth
      this.resizeHeight = maximumHeight
    }

    let edits = this.image.cmsEdits

    this.rotate =
      edits !== undefined &&
      edits !== null &&
      edits.rotate !== undefined &&
      edits.rotate !== null
        ? edits.rotate
        : 0

    if (this.rotate % 180 !== 0) {
      let t = originalWidth
      originalWidth = originalHeight
      originalHeight = t
    }

    // Try to figure out the crop based on the original dimensions.
    let focusX
    let focusY
    let cropWidth
    let cropHeight

    // Editorial crop?
    let crops = this.image.crops
    let crop
    if (crops !== undefined) {
      for (let cropItem of crops) {
        if (cropItem.name === this.size.name) {
          crop = cropItem
          break
        }
      }
    }

    if (
      crop !== undefined &&
      crop.width !== undefined &&
      crop.width !== null &&
      crop.height !== undefined &&
      crop.height !== null &&
      crop.x !== null &&
      crop.x !== undefined &&
      crop.y !== null &&
      crop.y !== undefined
    ) {
      let w = crop.width
      let h = crop.height
      focusX = originalWidth * (crop.x + w / 2)
      focusY = originalHeight * (crop.y + h / 2)
      cropWidth = originalWidth * w
      cropHeight = originalHeight * h

      // Auto width or height.
      if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeWidth <= 0.0
      ) {
        if (
          this.resizeHeight !== null &&
          this.resizeHeight !== undefined &&
          this.resizeHeight <= 0.0
        ) {
          this.resizeWidth = cropWidth
          this.resizeHeight = cropHeight
        } else if (
          this.resizeWidth !== null &&
          this.resizeWidth !== undefined &&
          this.resizeHeight !== null &&
          this.resizeHeight !== undefined
        ) {
          this.resizeWidth = (this.resizeHeight / cropHeight) * cropWidth
        }
      } else if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeHeight !== null &&
        this.resizeHeight !== undefined &&
        this.resizeHeight <= 0.0
      ) {
        this.resizeHeight = (this.resizeWidth / cropWidth) * cropHeight
      } else if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeHeight !== null &&
        this.resizeHeight !== undefined
      ) {
        // Crop width and height could be slightly wrong at this point.
        let s = Math.sqrt(
          (cropWidth * cropHeight) / this.resizeWidth / this.resizeHeight
        )
        cropWidth = this.resizeWidth * s
        cropHeight = this.resizeHeight * s
      }
    } else {
      // Use the focus, the implicit focus, or default to center.
      let focus = this.image.focus || null
      let x = focus?.x || null
      let y = focus?.y || null
      focusX = originalWidth * (focus !== null && x !== null && x > 0 ? x : 0.5)
      focusY =
        originalHeight * (focus !== null && y !== null && y > 0 ? y : 0.5)

      // Auto width or height.
      if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeWidth <= 0.0
      ) {
        if (
          this.resizeHeight !== null &&
          this.resizeHeight !== undefined &&
          this.resizeHeight <= 0.0
        ) {
          this.resizeWidth = originalWidth
          this.resizeHeight = originalHeight
        } else if (
          this.resizeHeight !== null &&
          this.resizeHeight !== undefined
        ) {
          this.resizeWidth =
            (this.resizeHeight / originalHeight) * originalWidth
        }
      } else if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeHeight !== null &&
        this.resizeHeight !== undefined &&
        this.resizeHeight <= 0.0
      ) {
        this.resizeHeight = (this.resizeWidth / originalWidth) * originalHeight
      }
      let s
      if (
        this.resizeWidth !== null &&
        this.resizeWidth !== undefined &&
        this.resizeHeight !== null &&
        this.resizeHeight !== undefined
      ) {
        s = Math.min(
          originalWidth / this.resizeWidth,
          originalHeight / this.resizeHeight
        )
        cropWidth = this.resizeWidth * s
        cropHeight = this.resizeHeight * s
      }
    }

    // Make sure that the crop is within the original bounds.
    let cropLeft
    if (cropWidth !== undefined) {
      cropLeft = focusX - cropWidth / 2.0
    }

    if (cropLeft !== undefined && cropLeft < 0.0) {
      cropLeft = 0.0
    } else if (
      cropLeft !== undefined &&
      cropWidth !== undefined &&
      cropLeft + cropWidth > originalWidth
    ) {
      cropLeft = originalWidth - cropWidth
    }

    let cropTop

    if (cropHeight !== undefined) {
      cropTop = focusY - cropHeight / 2.0
    }

    if (cropTop !== undefined && cropTop < 0.0) {
      cropTop = 0.0
    } else if (
      cropHeight !== undefined &&
      cropTop !== undefined &&
      cropTop + cropHeight > originalHeight
    ) {
      cropTop = originalHeight - cropHeight
    }

    this.cropLeft = cropLeft !== undefined ? Math.round(cropLeft) : undefined
    this.cropTop = cropTop !== undefined ? Math.round(cropTop) : undefined
    this.cropWidth = cropWidth !== undefined ? Math.round(cropWidth) : undefined
    this.cropHeight =
      cropHeight !== undefined ? Math.round(cropHeight) : undefined
    this.resizeWidth =
      this.resizeWidth !== undefined && this.resizeWidth !== null
        ? Math.round(this.resizeWidth)
        : null
    this.resizeHeight =
      this.resizeHeight !== undefined && this.resizeHeight !== null
        ? Math.round(this.resizeHeight)
        : null
    this.srcsetDescriptors = this.size.descriptors || []

    this.brightness = this.image?.cmsEdits?.brightness || 0.0
    this.contrast = this.image?.cmsEdits?.contrast || 0.0
    this.flipHorizontal = this.image?.cmsEdits?.flipH
    this.flipVertical = this.image?.cmsEdits?.flipV

    this.format = this.size.format
    this.formatMappings = this.size.formatMappings

    if (
      this.size.quality !== null &&
      this.size.quality !== undefined &&
      this.size.quality > 0
    ) {
      this.quality = this.size.quality
    }

    return this.toSrc()
  }

  private toSrcWidthHeight(
    resizeWidth: number | null | undefined,
    resizeHeight: number | null | undefined
  ) {
    let commands = ''

    commands = commands.concat('strip/true/')

    if (this.flipHorizontal !== undefined && this.flipHorizontal) {
      commands = commands.concat('flipflop/horizontal/')
    }

    if (this.flipVertical !== undefined && this.flipVertical) {
      commands = commands.concat('flipflop/vertical/')
    }

    let rotate = this.rotate || 0

    if (rotate !== 0) {
      commands = commands.concat('rotate/')
      commands = commands.concat(rotate.toString())
      commands = commands.concat('/')
    }

    let cropWidth = this.cropWidth
    let cropHeight = this.cropHeight

    if (cropWidth != null && cropHeight != null) {
      let cropLeft = this.cropLeft
      let cropTop = this.cropTop

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
      'image/svg+xml' !== this.image?.contentType &&
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
      } else if (resizeHeight !== null && resizeHeight !== undefined) {
        commands = commands.concat('x')
        commands = commands.concat(resizeHeight.toString())
        commands = commands.concat('^')
      }

      commands = commands.concat('/')
    }

    let brightness =
      this.brightness !== undefined && this.brightness !== null
        ? this.brightness
        : 0.0
    let contrast =
      this.contrast !== null && this.contrast !== undefined
        ? this.contrast
        : 0.0

    if (brightness !== 0.0 || contrast !== 0.0) {
      commands = commands.concat('brightness/')
      commands = commands.concat(((brightness * 100) / 1.5).toString())
      commands = commands.concat('x')
      commands = commands.concat((contrast * 100).toString())
      commands = commands.concat('/')
    }

    if (this.image.cmsEdits?.grayscale) {
      commands = commands.concat('grayscale/true/')
    } else if (this.image.cmsEdits?.invert) {
      commands = commands.concat('invert/true/')
    } else if (this.image.cmsEdits?.sepia) {
      commands = commands.concat('sepia/0.8/')
    }

    let format = this.format

    if (format !== undefined) {
      let originalFilename = this.image.filename

      if (originalFilename !== undefined && originalFilename !== null) {
        let extension = originalFilename.split('.').pop()

        if (extension !== undefined) {
          let formatMappings = this.formatMappings
          //TODO: CHECK THIS IS RIGHT - I changed things
          if (formatMappings !== undefined && formatMappings !== null) {
            formatMappings.forEach((mapping: { [key: string]: string }) => {
              for (const key in mapping) {
                if (key === extension) {
                  format = mapping[key]
                }
              }
            })
          }
        }
      }
    }

    if (format !== undefined) {
      commands = commands.concat('format/')
      commands = commands.concat(this.encodeUri(format))
      commands = commands.concat('/')
    }

    let quality = this.quality || 0

    if (quality > 0) {
      commands = commands.concat('quality/')
      commands = commands.concat(quality.toString())
      commands = commands.concat('/')
    }

    let url = ''

    if (this.settings.baseUrl != null) {
      let baseUrl = this.settings.baseUrl
      if (!baseUrl.endsWith('/')) {
        baseUrl.concat('/')
      }
      url = url.concat(baseUrl)
    }

    let expire = 2147483647
    let originalUrl = this.image.originalUrl

    if (
      originalUrl !== null &&
      originalUrl !== undefined &&
      originalUrl.startsWith('/')
    ) {
      originalUrl = originalUrl.concat('http://localhost')
    }

    // Workaround for mod_dims encoding bug.
    if (originalUrl !== null && originalUrl !== undefined) {
      originalUrl = decodeURI(originalUrl)
    }

    if (this.settings?.sharedSecret != null) {
      let signature =
        expire + this.settings?.sharedSecret + commands + originalUrl

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

  private encodeUri(input: string) {
    return encodeURI(input).replace('+', '%20')
  }

  private toSrc() {
    return this.toSrcWidthHeight(this.resizeWidth, this.resizeHeight)
  }

  public toSrcset() {
    let resizeWidth = this.resizeWidth
    let resizeHeight = this.resizeHeight

    let srcsetDescriptors = this.srcsetDescriptors || []
    let srcset: string[] = []
    if (
      resizeWidth === undefined ||
      resizeHeight === undefined ||
      srcsetDescriptors.length <= 0
    ) {
      return null
    } else {
      for (let i = 0; i < srcsetDescriptors.length; i++) {
        let typeIndex = srcsetDescriptors[i].length - 1
        if (typeIndex <= 0) {
          continue
        }

        let number = srcsetDescriptors[i].substring(0, typeIndex)
        let type = srcsetDescriptors[i].substring(typeIndex)
        if (type === 'w') {
          const width = parseInt(number)

          if (
            width > 0 &&
            resizeWidth !== null &&
            resizeWidth !== undefined &&
            resizeHeight !== null &&
            resizeHeight !== undefined
          ) {
            // const aspectRatio = resizeWidth / resizeHeight // so width will be 1, height will be value of aspectRatio
            const height = Math.round((width / resizeWidth) * resizeHeight)

            srcset.push(
              this.toSrcWidthHeight(width, height) + ' ' + srcsetDescriptors[i]
            )
          }
        } else if (type === 'x') {
          let density = parseFloat(number)

          if (
            density > 0.0 &&
            resizeWidth !== null &&
            resizeWidth !== undefined &&
            resizeHeight !== null &&
            resizeHeight !== undefined
          ) {
            const width = Math.round(resizeWidth * density)
            const height = Math.round(resizeHeight * density)

            srcset.push(
              this.toSrcWidthHeight(width, height) + ' ' + srcsetDescriptors[i]
            )
          }
        }
      }

      const srcsetHashMap: { [key: string]: string } = {}
      if (srcset.length > 0) {
        srcset.map((item: any) => {
          const tempArray = item.split(' ')
          srcsetHashMap[tempArray[1]] = tempArray[0]
        })
      }

      if (srcset.length > 0) {
        return {
          srcsetUrlsString: srcset.join(','),
          srcsetUrlsHashMap: srcsetHashMap,
        }
      } else {
        return null
      }
    }
  }
}

export default ImageUrlCreator
