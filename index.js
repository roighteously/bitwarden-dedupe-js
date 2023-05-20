// important
const exported = './bitwarden_export_20230520064529.json';

const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync(exported));

let lastItem = {}; // init last item object for previous checking

parsed.items.forEach(item => {
    // console.log(item)
    if(lastItem.name == item.name) {
        // Website is potentially same, lets check user & pass
        if(!lastItem.login.password == item.login.password) return; // lets check user
        if(!lastItem.login.username == item.login.username) return; // its the sme
        console.log('[dupe found]', item.name);
        console.log('username:', lastItem.login.username);
        console.log('---------')
        return;
    }; // most simple, if it's the exact same dont
    console.log(item.name)
    lastItem = item;
})
