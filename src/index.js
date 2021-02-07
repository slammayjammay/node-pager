const { writeSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const tmp = require('tmp');

function windows(string) {
	const file = join(__dirname, '../helpers/pager.ps1');
	spawnSync('powershell', ['-File', file, string], { stdio: 'inherit' });
}

module.exports = (string, options = '-R') => {
	return new Promise((resolve, reject) => {
		if (process.platform === 'win32') {
			windows(string);
			return resolve();
		}

		tmp.file((err, path, fd, cleanupCb) => {
			if (err) {
				return reject(err);
			}

			writeSync(fd, string);
			spawnSync(`less ${options} "${path}"`, { shell: true, stdio: 'inherit' });

			cleanupCb();
			resolve();
		});
	});
};
