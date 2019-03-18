const { join } = require('path');
const { spawnSync } = require('child_process');

module.exports = string => {
	return new Promise(resolve => {
		if (process.platform === 'win32') {
			const file = join(__dirname, '../helpers/pager.ps1');
			spawnSync('powershell', ['-File', file, string], { stdio: 'inherit' });
		} else {
			const command = `(\ncat << "EOF"\n${string}\nEOF\n) | less -R`;
			spawnSync(command, [], { shell: true, stdio: 'inherit' });
		}

		resolve();
	});
};
