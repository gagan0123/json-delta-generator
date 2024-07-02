const fs = require('fs');

function readJSONFile(filePath) {
	try {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error(`Error reading file ${filePath}:`, err);
		process.exit(1);
	}
}

function writeJSONFile(filePath, data) {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
	} catch (err) {
		console.error(`Error writing to file ${filePath}:`, err);
		process.exit(1);
	}
}

function compareJSON(original, updated) {
	const delta = {};

	for (const key in updated) {
		if (!(key in original)) {
			delta[key] = updated[key];
		} else if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
			delta[key] = updated[key];
		}
	}

	return delta;
}

function generateDeltaJSON(originalPath, updatedPath, deltaPath) {
	const originalJSON = readJSONFile(originalPath);
	const updatedJSON = readJSONFile(updatedPath);
	const deltaJSON = compareJSON(originalJSON, updatedJSON);

	writeJSONFile(deltaPath, deltaJSON);
	console.log(`Delta JSON written to: ${deltaPath}`);
}

const [originalFilePath, updatedFilePath, deltaFilePath] = process.argv.slice(2);

if (!originalFilePath || !updatedFilePath || !deltaFilePath) {
	console.error('Usage: node generateDeltaJSON.js <original.json> <updated.json> <delta.json>');
	process.exit(1);
}

generateDeltaJSON(originalFilePath, updatedFilePath, deltaFilePath);
