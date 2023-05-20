# bitwarden-dedupe-js

but with a gui

Deduplicates JSON Bitwarden exports.  
**Make sure your exported file is not encrypted.**

## Get Started

Use `config.js` to change how it checks, removes, warns about dupes.  
Everything you need to know is included in the config file.  

## Running

Now run the program with `npm run start`. It's simple from there.

## Exporting

The program will export to wherever you set the bitwarden file, with `.new.json` at the end.  
You can check it side by side, if you want to ensure you dont lose data.  
However, once you've done that you can **delete everything in your Bitwarden vault**.  

_**Keep in mind this is very dangerous, make sure you aren't losing any data.**_  

Next, import the file as a `Bitwarden (json)` format.  
