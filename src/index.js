const join = require('path').join
const spawnSync = require('child_process').spawnSync
const ansiEscapes = require('ansi-escapes')
const getCursorPosition = require('@patrickkettner/get-cursor-position')

const isWin = process.platform === 'win32'
const SHELL = isWin ? 'powershell' : '/bin/bash'
const PAGER_COMMAND_LOC = '../helpers/pager' + (isWin ? '.ps1' : '')

/**
 * Output the given text into a pager (less). First move the cursor to the top
 * left corner, otherwise the text may appear off. On exit, return the cursor
 * to its original position.
 *
 * @param {string} text - A string of text.
 * @return {promise}
 */
const pager = (text) => {
  return new Promise((resolve) => {
    const pos = getCursorPosition.sync()
    process.stdout.write(ansiEscapes.cursorTo(0, 0))

    const pagerCommand = join(__dirname, PAGER_COMMAND_LOC)
    spawnSync(SHELL, [isWin ? '-File' : '', pagerCommand, text], { stdio: 'inherit' })

    setTimeout(() => {
      process.stdout.write(ansiEscapes.cursorTo(pos.col - 1, pos.row - 1))

      // I think this works? resolve seems to execute only after the pager is exited.
      resolve()
    }, 0)
  })
}

module.exports = pager
