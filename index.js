const join = require('path').join
const spawnSync = require('child_process').spawnSync

const PAGER_COMMAND_LOC = './helpers/pager'

/**
 * @param {string} text - A string of text.
 * @return {null}
 */
const pager = (text) => {
	return new Promise((resolve) => {
		let pagerCommand = join(__dirname, PAGER_COMMAND_LOC)
		spawnSync(pagerCommand, [text], { stdio: 'inherit' })

		// I think this works? resolve seems to execute only after the less pager is exited.
		setTimeout(resolve, 0)
	})
}

module.exports = pager
