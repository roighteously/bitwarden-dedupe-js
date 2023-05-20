// important
const exported = './bitwarden_export_20230520064529.json';
const cfg = require('./config');

const fs = require('fs');

const checks = new Map();
const itemList = []; // deduped items
const parsed = JSON.parse(fs.readFileSync(exported));

let lastItem = {}; // init last item object for previous checking


// module loading
fs.readdirSync('./checks').forEach(item => {
    const check = require('./checks/'+item);
    checks.set(check.name, check);
})

parsed.items.forEach(item => {
    checks.forEach(check => {
        if(cfg.check.includes(check.name)) {
            const callback = check.exec(item, lastItem);

            if(callback == true) return; // if duped item is found right here, exclude from item list
        }
    })

    lastItem = item;
    itemList.push(item);
})

if(cfg.file == "new")