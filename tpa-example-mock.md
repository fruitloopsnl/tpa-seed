FORMAT: 1A

# Polls

Polls is a simple API allowing consumers to view polls and vote in them.

[API Blueprint Example](https://help.apiary.io/api_101/api_blueprint_tutorial/)

## Questions Collection [/api/questions]

### List All Questions [GET]

+ Response 200 (application/json)

        {
            "question": "Favourite programming language?",
            "choices": [
                {
                    "choice": "Swift",
                    "votes": 2048
                }, {
                    "choice": "Python",
                    "votes": 1024
                }
            ]
        }
