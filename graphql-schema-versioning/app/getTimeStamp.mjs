import fs from 'fs'

function createCodeGenTimeStamp() {
  let codeGenDate = new Date()
  const timeStamp = codeGenDate.getTime().toString()
  fs.writeFileSync(
    './schemas/timeStamp.mjs',
    `
  const timeStamp = ${timeStamp}
  export {timeStamp}
  `
  )
}

createCodeGenTimeStamp()
