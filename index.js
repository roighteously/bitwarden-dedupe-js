const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const cfg = require('./config');
const fs = require('fs');
const path = require('path');

function startBitDedupe() {
    const win = new BrowserWindow({
        width: 450,
        height: 450,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    let file = '';

    ipcMain.on('set-file', (event, f) => {
        file = f;
        console.log('Set file to', f)
    })

    ipcMain.on('start', (event) => {
        bitDedupe(file, event);
    })

    ipcMain.on('open-file', (event, f) => {
        dialog.showOpenDialog({ properties: ['openFile'] }).then(function (response) {
            if (!response.canceled) {
                // handle fully qualified file name
                event.returnValue = response.filePaths[0];
            } else {
                event.returnValue = '';
            }
        });
    })

    win.loadFile('gui/index.html')
}

app.on('ready', startBitDedupe);

function bitDedupe(exported, ev) {
    const checks = new Map();
    const itemList = []; // deduped items
    const parsed = JSON.parse(fs.readFileSync(exported));

    let lastItem = {}; // init last item object for previous checking
    let dupedItems = 0;

    checksList.forEach(item => {
        checks.set(item.name, item);
    })

    parsed.items.forEach(item => {
        duped = false;
        checks.forEach(check => {
            if (cfg.check.includes(check.name)) {
                const callback = check.exec(item, lastItem, cfg);

                if (callback == true) {
                    dupedItems++;
                    duped = true;
                    lastItem = {};
                }; // if duped item is found right here, exclude from item list
            }
        })

        if (cfg.use.includes('rm') && duped == true) return;

        lastItem = item;
        itemList.push(item);
    })

    const bitwarden_template = {
        "encrypted": false,
        "folders": parsed.folders,
        "items": itemList
    }

    console.log(`${itemList.length}/${parsed.items.length - dupedItems} expected items deduped, ${dupedItems} dupes removed, ${parsed.items.length} items originally`)
    console.log('Found & removed', dupedItems, 'duped items in', exported + '.new.json')
    ev.returnValue = `${itemList.length}/${parsed.items.length - dupedItems} expected items deduped, ${dupedItems} dupes removed, ${parsed.items.length} items originally (${exported + '.new.json'})`
    fs.writeFileSync(exported + '.new.json', JSON.stringify(bitwarden_template))
}

const checksList = [
    {
        name: 'user_pass',
        exec: (item, lastItem, cfg) => {
            console.log(item)
            if (!('login' in item) || !('login' in lastItem)) return;
            if (!('password' in item.login)) return;
            if (!('password' in lastItem.login)) return;
            if(lastItem.name === item.name) {
                // Website is potentially same, lets check user & pass
                if (lastItem.login.password !== item.login.password) return; // lets check user
                if (lastItem.login.username !== item.login.username) return; // its the sme
                if (cfg.use.includes('warn')) console.log('[dupe found]', item.name, 'username:', lastItem.login.username);
                return true;
            };
        }
    }
]
