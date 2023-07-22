import yaml from 'js-yaml';
import { parse } from 'json2csv';
import { js2xml } from 'xml-js';
import fs from 'fs-extra';
import path from 'path';
import { parseStringPromise } from 'xml2js';
import csvtojson from 'csvtojson';

export async function convertFile(inputFile: string) {
  const inputFilePath = path.resolve(inputFile);
  const inputExtension = path.extname(inputFile);
  const baseName = path.basename(inputFile, inputExtension);
  const directoryName = path.dirname(inputFile);

  if (!['.yml', '.csv', '.json', '.xml'].includes(inputExtension)) {
    throw new Error('Unsupported file type. Please provide a YAML, CSV, JSON or XML file.');
  }

  const inputData = fs.readFileSync(inputFilePath, 'utf8');
  let jsonData;

  switch (inputExtension) {
    case '.yml':
      // Convert YAML to JSON
      jsonData = yaml.load(inputData);
      break;
    case '.csv':
      // Convert CSV to JSON
      jsonData = await csvtojson().fromString(inputData);
      break;
    case '.json':
      // Already in JSON format
      jsonData = JSON.parse(inputData);
      break;
    case '.xml':
      // Convert XML to JSON
      jsonData = await parseStringPromise(inputData);
      break;
    default:
      throw new Error('Unsupported file type.');
  }

  if (!jsonData) {
    throw new Error('Error parsing input file.');
  }

  // Write JSON output
  fs.writeFileSync(path.join(directoryName, `${baseName}.json`), JSON.stringify(jsonData, null, 2));

  // Write YAML output
  fs.writeFileSync(path.join(directoryName, `${baseName}.yml`), yaml.dump(jsonData));

  // Convert JSON to CSV and write output
  const csvData = parse(jsonData);
  fs.writeFileSync(path.join(directoryName, `${baseName}.csv`), csvData);

  // Convert JSON to XML and write output
  const xmlData = js2xml(jsonData, { compact: true, ignoreComment: true, spaces: 4 });
  fs.writeFileSync(path.join(directoryName, `${baseName}.xml`), xmlData);
}
