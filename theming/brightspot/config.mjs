import { dirname } from 'path'
import { spawnSync } from 'child_process'
import { access, constants } from 'fs'
import { fileURLToPath } from 'url'

// The path to the current file in the file system
const currentFile = fileURLToPath(import.meta.url)

// Get the directory name of the current file
const directory = dirname(currentFile)

// Change the current working directory
process.chdir(directory)

// Check if 'zip' command is available in the system
access('/usr/bin/zip', constants.F_OK, (err) => {
  if (err) {
    console.log(
      `An error has occurred: ${err}`
    )
  } else {
    // Create a zip file
    const zip = spawnSync(
      'zip',
      ['-r', 'custom-theme.zip', '_config.json', '_name'],
      { stdio: 'inherit' }
    )

    if (zip.error) {
      console.error(`Error executing zip command: ${zip.error}`)
    }
  }
})
