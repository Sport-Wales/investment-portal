import { parse } from 'csv-parse/sync';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const convertCSVtoJSON = async () => {
  try {
    // Define paths
    const dataDir = path.join(__dirname, '../data');
    const csvFilePath = path.join(dataDir, 'PostcodesCSV.csv');
    const jsonFilePath = path.join(dataDir, 'wimd_data.json');

    // Check if data directory exists, if not create it
    if (!existsSync(dataDir)) {
      console.log('Creating data directory...');
      mkdirSync(dataDir, { recursive: true });
    }

    // Check if CSV file exists
    if (!existsSync(csvFilePath)) {
      console.error(`CSV file not found at: ${csvFilePath}`);
      console.log('\nPlease ensure:');
      console.log('1. The data directory exists at: ' + dataDir);
      console.log('2. Your CSV file is named exactly "PostcodesCSV.csv"');
      console.log('3. The CSV file is placed in the data directory');
      process.exit(1);
    }

    console.log('Starting conversion process...');
    console.log('Reading from:', csvFilePath);
    
    // Read the CSV file
    const fileContent = readFileSync(csvFilePath, 'utf-8');
    console.log('CSV file read successfully');

    // Parse CSV to JSON
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    console.log(`Parsed ${records.length} records from CSV`);

    // Log the headers from the first record to help with debugging
    if (records.length > 0) {
      console.log('\nCSV Headers found:', Object.keys(records[0]));
    }

    // Create the formatted data array
    const formattedData = records.map(row => ({
      'Welsh Postcode': row['Welsh Postcode'] || row['welsh postcode'] || row['WELSH POSTCODE'],
      'LSOA Code': row['LSOA Code'] || row['lsoa code'] || row['LSOA CODE'],
      'LSOA Name (English)': row['LSOA Name (English)'] || row['lsoa name (english)'] || row['LSOA NAME (ENGLISH)'],
      'LSOA Name (Cymraeg)': row['LSOA Name (Cymraeg)'] || row['lsoa name (cymraeg)'] || row['LSOA NAME (CYMRAEG)'],
      'WIMD 2019 LSOA Rank': parseInt(row['WIMD 2019 LSOA Rank'] || row['wimd 2019 lsoa rank'] || row['WIMD 2019 LSOA RANK']),
      'WIMD 2019 Overall Decile': parseInt(row['WIMD 2019 Overall Decile'] || row['wimd 2019 overall decile'] || row['WIMD 2019 OVERALL DECILE']),
      'WIMD 2019 Overall Quintile': parseInt(row['WIMD 2019 Overall Quintile'] || row['wimd 2019 overall quintile'] || row['WIMD 2019 OVERALL QUINTILE']),
      'WIMD 2019 Overall Quartile': parseInt(row['WIMD 2019 Overall Quartile'] || row['wimd 2019 overall quartile'] || row['WIMD 2019 OVERALL QUARTILE'])
    }));

    // Write to JSON file
    await writeFile(jsonFilePath, JSON.stringify(formattedData, null, 2));

    console.log('\nConversion completed successfully!');
    console.log(`Output saved to: ${jsonFilePath}`);
    console.log(`Total entries processed: ${formattedData.length}`);
    
    // Log sample entries
    console.log('\nFirst entry as sample:');
    console.log(formattedData[0]);

  } catch (error) {
    console.error('\nError details:', error);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
};

// Run the conversion
convertCSVtoJSON().catch(error => {
  console.error('Top level error:', error);
  process.exit(1);
});