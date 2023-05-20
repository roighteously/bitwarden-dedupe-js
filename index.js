// important
const exported = './bitwarden_export_20230520064529.json';

const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync(exported));

parsed.items.forEach(item => {
    console.log(item)
})
