const { join } = require('path');
const { spawnSync } = require('child_process');

function createUniqueId() {
	return Math.random().toFixed(20).slice(2);
}

module.exports = string => {
	return new Promise(resolve => {
		if (process.platform === 'win32') {
			const file = join(__dirname, '../helpers/pager.ps1');
			spawnSync('powershell', ['-File', file, string], { stdio: 'inherit' });
		} else {
			const id = createUniqueId();
			const command = `(\ncat << "${id}"\n${string}\n${id}\n) | less -R`;
			spawnSync(command, [], { shell: true, stdio: 'inherit' });
		}

		resolve();
	});
};
