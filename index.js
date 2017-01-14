const join = require('path').join
const spawnSync = require('child_process').spawnSync

const PAGER_COMMAND_LOC = './helpers/pager'

/**
 * @param {string} text - A string of text.
 * @return {null}
 */
const pager = (text, exitCallback) => {
	let pagerCommand = join(__dirname, PAGER_COMMAND_LOC)
	spawnSync(pagerCommand, [text], { stdio: 'inherit' })

	// I think this works? exitCallback seems to execute only after the less pager
	// is exited.
	setTimeout(exitCallback, 0)
}

module.exports = pager
