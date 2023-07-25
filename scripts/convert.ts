import { Command } from "commander";
import { convertFile } from "../src/convert";

const program = new Command();

program.version('0.0.1');

program
  .argument('<inputFile>')
  .description('Convert a YAML, CSV, JSON or XML file to JSON, CSV, XML and YAML')
  .action(async (inputFile) => {
    try {
      await convertFile(inputFile);
    } catch (err) {
      console.log('Error:', err);
      process.exit(1);
    }
  });

program.parse(process.argv);
