const join = require('path').join
const spawnSync = require('child_process').spawnSync

const PAGER_COMMAND_LOC = './helpers/pager'

/**
 * @param {string} text - A string of text.
 * @return {null}
 */
const pager = (text) => {
	let pagerCommand = join(__dirname, PAGER_COMMAND_LOC)
	spawnSync(pagerCommand, [text], { stdio: 'inherit' })
}

module.exports = pager
