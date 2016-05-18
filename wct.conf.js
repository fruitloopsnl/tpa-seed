module.exports = {
    verbose: true,
    "plugins": {
        "local": {
            "browsers": ['chrome', 'firefox', 'ie']
        },
        "istanbul": {
            "dir": "./coverage",
            "reporters": ["text-summary", "lcov"],
            "include": [
                "/*.html"
            ],
            "exclude": [
            ]
        },
        sauce : {
          disabled : true
        }
    }
};