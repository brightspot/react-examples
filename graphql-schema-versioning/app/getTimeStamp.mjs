import fs from 'fs'

function createCodeGenTimeStamp() {
  let codegenDate = new Date()
  const timeStamp = codegenDate.getTime().toString()
  fs.writeFileSync(
    './schemas/timeStamp.mjs',
    `
  const timeStamp = ${timeStamp}
  export {timeStamp}
  `
  )
}

createCodeGenTimeStamp()
