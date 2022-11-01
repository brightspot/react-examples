import md5 from 'node_modules/blueimp-md5/js/md5.js'
export default {
  generateUrl: function (settings, image, size) {
    this.settings = settings
    this.baseUrl = this.settings.baseUrl
    this.sharedSecret = this.settings.sharedSecret

    this.originalUrl = image.publicUrl
    this.mimeType = image.contentType

    this.originalFilename = image.filename
    let originalWidth = image.width
    let originalHeight = image.height
    console.log(
      ' originalWidth start 😊 😊 😊: ',
      originalWidth,
      ' 😊 😊 😊originalHeight start: ',
      originalHeight
    )
    // Absolute final size.
    if (image.metadata !== undefined) {
      let exif = image.exif

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

    this.resizeWidth = size.width
    this.resizeHeight = size.height
    let maximumWidth = size.maximumWidth

    if (this.resizeWidth > 0.0) {
      if (maximumWidth > 0.0 && maximumWidth < this.resizeWidth) {
        this.resizeHeight *= maximumWidth / this.resizeWidth
        this.resizeWidth = maximumWidth
      }
    } else if (maximumWidth > 0.0 && maximumWidth < originalWidth) {
      this.resizeHeight = (maximumWidth / originalWidth) * originalHeight
      this.resizeWidth = maximumWidth
    }

    let maximumHeight = size.maximumHeight

    if (this.resizeHeight > 0.0) {
      if (maximumHeight > 0.0 && maximumHeight < this.resizeHeight) {
        this.resizeWidth *= maximumHeight / this.resizeHeight
        this.resizeHeight = maximumHeight
      }
    } else if (maximumHeight > 0.0 && maximumHeight < originalHeight) {
      this.resizeWidth = (maximumHeight / originalHeight) * originalWidth
      this.resizeHeight = maximumHeight
    }

    let edits = image.cmsEdits
    this.rotate =
      edits !== undefined && edits.rotate !== undefined ? edits.rotate : 0

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
    let crops = image.crops
    let crop
    if (crops !== undefined) {
      for (let cropItem of crops) {
        if (cropItem.name === size.name) {
          crop = cropItem
          break
        }
      }
    }
    console.log('CROP 😊 😊 😊', crop) //undefined
    if (
      crop !== undefined &&
      crop.width !== undefined &&
      crop.height !== undefined
    ) {
      let w = crop.width
      let h = crop.height
      focusX = originalWidth * (crop.x + w / 2)
      focusY = originalHeight * (crop.y + h / 2)
      cropWidth = originalWidth * w
      cropHeight = originalHeight * h
      console.log(
        'HI!!! cropWidth! 😊 😊 😊',
        cropWidth,
        'cropHeight! 😊 😊 😊',
        cropHeight
      )
      // Auto width or height.
      if (this.resizeWidth <= 0.0) {
        if (this.resizeHeight <= 0.0) {
          this.resizeWidth = cropWidth
          this.resizeHeight = cropHeight
        } else {
          this.resizeWidth = (this.resizeHeight / cropHeight) * cropWidth
        }
      } else if (this.resizeHeight <= 0.0) {
        this.resizeHeight = (this.resizeWidth / cropWidth) * cropHeight
      } else {
        // Crop width and height could be slightly wrong at this point.
        let s = Math.sqrt(
          (cropWidth * cropHeight) / this.resizeWidth / this.resizeHeight
        )
        cropWidth = this.resizeWidth * s
        cropHeight = this.resizeHeight * s
      }
    } else {
      // Use the focus, the implicit focus, or default to center.
      let focus = image.focus
      console.log(
        'FOCUS 😊 😊 😊',
        focus,
        'originalWidth  😊 😊 😊: ',
        originalWidth,
        'originalHeight!! 😊 😊 😊',
        originalHeight
      ) //this is right!
      focusX =
        originalWidth *
        (focus !== undefined && focus.x.length > 0 ? focus.x : 0.5)
      focusY =
        originalHeight *
        (focus !== undefined && focus.y.length > 0 ? focus.y : 0.5)
      console.log('focusX 😊😊😊', focusX, 'focusY 😊😊😊', focusY)
      // Auto width or height.
      console.log('resizeWidth  😊 😊 😊', this.resizeWidth) //338
      if (this.resizeWidth <= 0.0) {
        if (this.resizeHeight <= 0.0) {
          this.resizeWidth = originalWidth
          this.resizeHeight = originalHeight
          console.log(
            'resizeWidth is <=0.0 😊 😊 😊',
            originalWidth,
            originalHeight
          )
        } else {
          this.resizeWidth =
            (this.resizeHeight / originalHeight) * originalWidth
          console.log('resizeWidth in else block 😊 😊 😊', this.resizeWidth)
        }
      } else if (this.resizeHeight <= 0.0) {
        console.log(
          'resizeHeight is <=0.0 😊 😊 😊',
          originalWidth,
          originalHeight
        )
        this.resizeHeight = (this.resizeWidth / originalWidth) * originalHeight
      }

      let s = Math.min(
        originalWidth / this.resizeWidth,
        originalHeight / this.resizeHeight
      )
      cropWidth = this.resizeWidth * s
      cropHeight = this.resizeHeight * s
      console.log('😊 😊 😊 cropWidth HEY', cropWidth, cropHeight)
      console.log('😊 😊 😊 S HEY', s) //1
    }

    // Make sure that the crop is within the original bounds.
    let cropLeft = focusX - cropWidth / 2.0
    console.log('😊 😊 😊 cropLeft', cropLeft) //0
    if (cropLeft < 0.0) {
      cropLeft = 0.0
    } else if (cropLeft + cropWidth > originalWidth) {
      cropLeft = originalWidth - cropWidth
    }

    let cropTop = focusY - cropHeight / 2.0
    console.log('😊 😊 😊 cropTop!', cropTop) //0

    if (cropTop < 0.0) {
      cropTop = 0.0
    } else if (cropTop + cropHeight > originalHeight) {
      cropTop = originalHeight - cropHeight
    }

    this.cropLeft = Math.round(cropLeft)
    this.cropTop = Math.round(cropTop)
    this.cropWidth = Math.round(cropWidth)
    this.cropHeight = Math.round(cropHeight)
    this.resizeWidth = Math.round(this.resizeWidth)
    this.resizeHeight = Math.round(this.resizeHeight)
    this.srcsetDescriptors = size.descriptors

    if (edits !== undefined) {
      this.brightness = edits.brightness
      this.contrast = edits.contrast
      this.flipHorizontal = edits.flipH
      this.flipVertical = edits.flipV
      this.filter = edits.filter
    }

    this.format = size.format
    this.formatMappings = size.formatMappings

    if (size.quality > 0) {
      this.quality = size.quality
    }

    return this.toSrc()
  },

  toSrcWidthHeight: function (resizeWidth, resizeHeight) {
    let commands = ''

    commands = commands.concat('strip/true/')

    if (this.flipHorizontal !== undefined) {
      commands = commands.concat('flipflop/horizontal/')
    }

    if (this.flipVertical !== undefined) {
      commands = commands.concat('flipflop/vertical/')
    }

    let rotate = this.rotate

    if (rotate !== 0) {
      commands = commands.concat('rotate/')
      commands = commands.concat(rotate)
      commands = commands.concat('/')
    }

    let cropWidth = this.cropWidth
    let cropHeight = this.cropHeight

    if (cropWidth != null && cropHeight != null) {
      let cropLeft = this.cropLeft
      let cropTop = this.cropTop

      commands = commands.concat('crop/')
      commands = commands.concat(cropWidth)
      commands = commands.concat('x')
      commands = commands.concat(cropHeight)
      commands = commands.concat('+')
      commands = commands.concat(cropLeft != null ? cropLeft : 0)
      commands = commands.concat('+')
      commands = commands.concat(cropTop != null ? cropTop : 0)
      commands = commands.concat('/')
    }

    if (
      'image/svg+xml' !== this.mimeType &&
      (resizeWidth != null || resizeHeight != null)
    ) {
      commands = commands.concat('resize/')

      if (resizeWidth != null) {
        commands = commands.concat(resizeWidth)
        commands = commands.concat('x')

        if (resizeHeight != null) {
          commands = commands.concat(resizeHeight)
          commands = commands.concat('!')
        } else {
          commands = commands.concat('^')
        }
      } else {
        commands = commands.concat('x')
        commands = commands.concat(resizeHeight)
        commands = commands.concat('^')
      }

      commands = commands.concat('/')
    }

    let brightness = this.brightness !== undefined ? this.brightness : 0.0
    let contrast = this.contrast !== undefined ? this.contrast : 0.0

    if (brightness !== 0.0 || contrast !== 0.0) {
      commands = commands.concat('brightness/')
      commands = commands.concat((brightness * 100) / 1.5)
      commands = commands.concat('x')
      commands = commands.concat(contrast * 100)
      commands = commands.concat('/')
    }

    if (this.filter === 'Grayscale') {
      commands = commands.concat('grayscale/true/')
    } else if (this.filter === 'Invert') {
      commands = commands.concat('invert/true/')
    } else if (this.filter === 'Sepia') {
      commands = commands.concat('sepia/0.8/')
    }

    let format = this.format

    if (format !== undefined) {
      let originalFilename = originalFilename

      if (originalFilename !== undefined) {
        let extension = originalFilename.split('.').pop()

        if (extension !== undefined) {
          let formatMappings = formatMappings

          if (formatMappings !== undefined) {
            format = formatMappings.extension
          }
        }
      }
    }

    if (format !== undefined) {
      commands = commands.concat('format/')
      commands = commands.concat(this.encodeUri(format))
      commands = commands.concat('/')
    }

    let quality = this.quality

    if (quality > 0) {
      commands = commands.concat('quality/')
      commands = commands.concat(quality)
      commands = commands.concat('/')
    }

    let url = ''

    if (this.baseUrl != null) {
      let baseUrl = this.baseUrl
      if (!baseUrl.endsWith('/')) {
        baseUrl.concat('/')
      }
      url = url.concat(baseUrl)
    }

    let expire = 2147483647
    let originalUrl = this.originalUrl

    if (originalUrl.startsWith('/')) {
      originalUrl = originalUrl.concat('http://localhost')
    }

    // Workaround for mod_dims encoding bug.
    originalUrl = decodeURI(originalUrl)

    if (this.sharedSecret != null) {
      let signature = expire + this.sharedSecret + commands + originalUrl

      url = url.concat(md5(signature, false, false).substr(0, 7))
      url = url.concat('/')
      url = url.concat(expire)
      url = url.concat('/')
    }

    url = url.concat(commands)
    url = url.concat('?url=')
    url = url.concat(encodeURIComponent(originalUrl))

    return url
  },

  encodeUri: function (input) {
    return encodeURI(input).replace('+', '%20')
  },

  toSrc: function () {
    return this.toSrcWidthHeight(this.resizeWidth, this.resizeHeight)
  },

  toSrcset: function () {
    let resizeWidth = this.resizeWidth
    let resizeHeight = this.resizeHeight //this had a typo

    if (resizeWidth !== undefined || resizeHeight !== undefined) {
      return null
    }

    let srcsetDescriptors = this.srcsetDescriptors

    if (srcsetDescriptors !== undefined) {
      return null
    }

    let srcset = []

    for (let descriptor in srcsetDescriptors) {
      if (descriptor !== undefined) {
        continue
      }

      let typeIndex = descriptor.length - 1

      if (typeIndex <= 0) {
        continue
      }

      let number = descriptor.substring(0, typeIndex)
      let type = descriptor.substring(typeIndex)

      if (type.equals('w')) {
        let width = parseInt(number)

        if (width > 0) {
          srcset.push(
            this.toSrcWidthHeight(
              width,
              Math.round((width / resizeWidth) * resizeHeight)
            ) +
              ' ' +
              descriptor
          )
        }
      } else if (type.equals('x')) {
        let density = parseFloat(number)

        if (density > 0.0) {
          srcset.push(
            this.toSrcWidthHeight(
              Math.round(resizeWidth * density),
              Math.round(resizeHeight * density)
            ) +
              ' ' +
              descriptor
          )
        }
      }
    }

    return !srcset.length > 0 ? srcset.join(',') : ''
  },

  getImageNameFromStoragePath: function (image) {
    if (image !== undefined) {
      return null
    }

    let path = image.path

    if (path !== undefined) {
      return null
    }

    let lastSlashAt = path.lastIndexOf('/')
    return lastSlashAt >= 0 ? path.substring(lastSlashAt + 1) : path
  },

  toHex: function (str) {
    var hex = ''
    for (var i = 0; i < str.length; i++) {
      hex += '' + str.charCodeAt(i).toString(16)
    }
    return hex
  },
}
