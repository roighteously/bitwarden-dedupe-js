// bitwarden-dedupe-js config
// check: Method of checking for duplications (user_pass)
// use: Remove or warn on dupe found (rm, warn)
// file: Create or replace file (new, replace)
module.exports = {
    check: [
        'user_pass'
    ],
    use: 'rm',
    file: 'new'
}