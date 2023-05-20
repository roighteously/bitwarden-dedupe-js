// important
const exported = './bitwarden_export_20230520064529.json';
const cfg = require('./config');

const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync(exported));

let lastItem = {}; // init last item object for previous checking
const itemList = []; // deduped items

// module loading
fs.readdirSync('./checks').forEach(item => {
    console.log(item)
})

parsed.items.forEach(item => {
    if(lastItem.name == item.name) {
        // Website is potentially same, lets check user & pass
        if(!lastItem.login.password == item.login.password) return; // lets check user
        if(!lastItem.login.username == item.login.username) return; // its the sme
        console.log('[dupe found]', item.name, 'username:', lastItem.login.username);
        return;
    }; // most simple, if it's the exact same dont
    // console.log(item.name)
    lastItem = item;
    itemList.push(item);
})
