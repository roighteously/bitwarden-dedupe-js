# bitwarden-dedupe-js

Deduplicates JSON bitwarden exports.

## Get Started

This program has 0 dependencies, using only fs and basic string checking.  
To use it, just add your `bitwarden_export` file to the folder, and replace the 2nd line in `index.js` with the path to the file.  
Use `config.js` to change how it checks, removes, warns about dupes.  
Everything you need to know is included in the config file.  

## Exporting

The program will export to wherever you set the bitwarden file, with `.new.json` at the end.  
You can check it side by side, if you want to ensure you dont lose data.  
However, once you've done that you can **delete everything in your Bitwarden vault**.  

_**Keep in mind this is very dangerous, make sure you aren't losing any data.**_  

Next, import the file as a `Bitwarden (json)` format.  
