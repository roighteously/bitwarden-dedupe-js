// bitwarden-dedupe-js config
// check: Method of checking for duplications (user_pass)
// use: Remove or warn on dupe found (rm, warn)
module.exports = {
    check: [
        'user_pass'
    ],
    use: [
        'rm',
        'warn' // Remove item and warn
    ]
}