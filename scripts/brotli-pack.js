const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { compress } = require('brotli')
const args = require('minimist')(process.argv.slice(2))


function pack(file) {
  const compressed = compress(file)
  if (!compressed) {
    return file
  }
  return compressed
}


async function main() {
  let sourceFilePath = args._[0]
  let toFilePath = args._[1]
  const file = fs.readFileSync(sourceFilePath)
  const compressed = compress(file)
  const fileSize = (file.length / 1024).toFixed(2) + 'kb'
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  const moduleFile = `module.exports = "${Buffer.from(compressed).toString("base64")}"`
  const moduleSize = (compressed.length / 1024).toFixed(2) + 'kb'
  fs.writeFileSync(toFilePath, moduleFile)
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(sourceFilePath))
    )} -> ${chalk.gray(
      chalk.bold(toFilePath)
    )} file:${fileSize} brotli:${compressedSize} module:${moduleSize}`
  )
}

main().catch(err => {
  console.error(err)
})