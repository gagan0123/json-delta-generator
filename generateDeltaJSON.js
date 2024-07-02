const fs = require('fs');

/**
 * Reads a JSON file and parses its content.
 * @param {string} filePath - The path to the JSON file.
 * @returns {object} - The parsed JSON object.
 */
function readJSONFile(filePath) {
	try {
		// Read the file synchronously
		const data = fs.readFileSync(filePath, 'utf8');
		// Parse the JSON data
		return JSON.parse(data);
	} catch (err) {
		// Handle any errors during file reading or JSON parsing
		console.error(`Error reading file ${filePath}:`, err);
		// Exit the process with an error code
		process.exit(1);
	}
}

/**
 * Writes JSON data to a file, formatting it with indentation.
 * @param {string} filePath - The path to the output file.
 * @param {object} data - The JSON data to write.
 */
function writeJSONFile(filePath, data) {
	try {
		// Write the JSON data to the file with indentation
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
	} catch (err) {
		// Handle any errors during file writing
		console.error(`Error writing to file ${filePath}:`, err);
		// Exit the process with an error code
		process.exit(1);
	}
}

/**
 * Compares two JSON objects and returns a delta object containing only the new
 * and changed keys from the updated JSON.
 * @param {object} original - The original JSON object.
 * @param {object} updated - The updated JSON object.
 * @returns {object} - The delta JSON object containing new and changed keys.
 */
function compareJSON(original, updated) {
	// Initialize an empty object to store the delta
	const delta = {};

	// Iterate over keys in the updated JSON object
	for (const key in updated) {
		// Check if the key exists in the original object
		if (!(key in original)) {
			// If the key doesn't exist, it's a new key, so add it to the delta
			delta[key] = updated[key];
		} else if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
			// If the key exists, but the values are different, it's a changed key
			delta[key] = updated[key];
		}
	}

	// Return the delta object
	return delta;
}

/**
 * Generates a delta JSON file by comparing an original and updated JSON file.
 * @param {string} originalPath - The path to the original JSON file.
 * @param {string} updatedPath - The path to the updated JSON file.
 * @param {string} deltaPath - The path to the output delta JSON file.
 */
function generateDeltaJSON(originalPath, updatedPath, deltaPath) {
	// Read the original and updated JSON files
	const originalJSON = readJSONFile(originalPath);
	const updatedJSON = readJSONFile(updatedPath);

	// Compare the two JSON objects to get the delta
	const deltaJSON = compareJSON(originalJSON, updatedJSON);

	// Write the delta JSON to the output file
	writeJSONFile(deltaPath, deltaJSON);
	// Log a success message with the output file path
	console.log(`Delta JSON written to: ${deltaPath}`);
}

// Get the file paths from command line arguments
const [originalFilePath, updatedFilePath, deltaFilePath] = process.argv.slice(2);

// Check if all three file paths are provided
if (!originalFilePath || !updatedFilePath || !deltaFilePath) {
	// If not, log an error message with usage instructions
	console.error('Usage: node generateDeltaJSON.js <original.json> <updated.json> <delta.json>');
	// Exit the process with an error code
	process.exit(1);
}

// Generate the delta JSON file
generateDeltaJSON(originalFilePath, updatedFilePath, deltaFilePath);
