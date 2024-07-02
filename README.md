# JSON Delta Generator

This Node.js script compares an original JSON file with an updated JSON file and generates a delta JSON file containing only the new and changed objects from the updated file. It ignores removed objects from the original file.

## Usage

1. **Prerequisites:** Ensure you have Node.js installed on your system.

2. **Save the Script:** Save the provided `generateDeltaJSON.js` script to your desired directory.

3. **Run the Script:** Use the following command in your terminal, replacing the placeholders with your actual file paths:

   ```bash
   node generateDeltaJSON.js path/to/original.json path/to/updated.json path/to/delta.json
   ```

    - **`<original.json>`:** Path to the original JSON file.
    - **`<updated.json>`:** Path to the updated JSON file.
    - **`<delta.json>`:** Path to the output delta JSON file.

## Example

```bash
node generateDeltaJSON.js data/original.json data/updated.json data/delta.json
```

This command will compare `data/original.json` with `data/updated.json` and create `data/delta.json` containing the differences.

