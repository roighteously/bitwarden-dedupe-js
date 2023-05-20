module.exports = {
    name: 'user_pass',
    exec: (item, lastItem) => {
        if(lastItem.name == item.name) {
            // Website is potentially same, lets check user & pass
            if(!lastItem.login.password == item.login.password) return; // lets check user
            if(!lastItem.login.username == item.login.username) return; // its the sme
            console.log('[dupe found]', item.name, 'username:', lastItem.login.username);
            return true;
        };
    }
}