const { app, BrowserWindow, ipcMain } = require('electron');
const cfg = require('./config');
const fs = require('fs');
const path = require('path');

function startBitDedupe() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    })

    win.loadFile('gui/index.html')
}

app.on('ready', startBitDedupe);

function bitDedupe(exported) {
    const checks = new Map();
    const itemList = []; // deduped items
    const parsed = JSON.parse(fs.readFileSync(exported));

    let lastItem = {}; // init last item object for previous checking
    let dupedItems = 0;


    // module loading
    fs.readdirSync('./checks').forEach(item => {
        const check = require('./checks/' + item);
        checks.set(check.name, check);
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
    fs.writeFileSync(exported + '.new.json', JSON.stringify(bitwarden_template))
}