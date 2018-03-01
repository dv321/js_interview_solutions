============
Installation
============

`npm install`
`npm test`

==============
Solution Notes
==============

Wallclock:

    Write a function that accepts a wallclock time in digital format, e.g. "3:20" or "12:42",
    and returns what the angle between the hands would be on an analog clock that
    matches the given time.
    For example, with an input time of "12:30", the minute hand would be at the "6" (180
    degrees) and the hour hand would be midway between the "12" and "1" (15 degrees).
    The return value would be 165 degrees (180 - 15).

    Problem assumptions:
        When dealing with floats we round up to two decimal places.

        The function receives a string formatted appropriately and with valid numbers, there is no validation.

        We always subtract the larger number/hand from the smaller number/hand regardless of which one is which.

    Future enhancements:
        Dali mode!


JSON Formatting:

    Write a function that can accept an arbitrary JSON-like string and format it to the
    console, with indentation for nested dictionaries and arrays in the data structure, with an
    API along the lines of:
    visualize_data( const string& data );
    The data structure has the following properties:
       •
    All dictionary types have string keys and arbitrary data
       •
    Dictionaries should have their keys sorted alphanumerically in the output
       •
    All list types can contain arbitrary data (i.e. mixing strings and numbers)
    Example input: {"colors":["red","green","blue"],"person":{"name":"Bob","age":
    20,"contact":{"email":"bob@example.com",},},"truthy": True,"falsy": False,"pi": 3.14159,}
    Example output:
    "Colors":
    [
      "red"
      "green"
      "blue"
    ]
    "falsy": false
    "Person":
    {
      "age": 20
      "Contact":
      {
        "email": "bob@example.com"
      }
      "name": "Bob"
    }
    "pi": 3.14159
    "truthy": true

    I took a different approach from the standard write-a-tokenizer-build-up-a-tree-then-print-it-recursively approach
    because I'm working in Javascript and I wanted to see what a solution that utilizes builtin JS functionality looks
    like. Taking this approach let me work with some cool ES6 features (like how object keys stay ordered by their)
    creation/modification order).

    Even though this isn't exactly what the example output looked like, I left in the initial and closing brackets
    (and associated indentation) in order to easily indicate whether the object is a dict or list.
    Taking them out would be a simple str.slice(1, -1).

    The 'format_json_string' function could have used the original string but the code would have been less readable so
    I decided to split the string into an array by newlines and modify that instead, at the cost of increased memory use.

    Problem assumptions:
        The whole string (ie the outermost object) may be a list.

        Lists may contain dictionaries as elements.

    Future enhancements:
        I feel like there must be a simpler way to implement the 'format_json_string' function, possibly with regexes.


Boggle

    This version of Boggle adds additional complexity to this fun pastime.
    Write a program to generate a valid Boggle word tray and then solve for the
    best possible score, displaying the tray and the results in text form.
    The rules for this Boggle should be considered exactly the same as for regular
    Boggle, except in the following specific ways:
       •
    The board is 5x5
       •
    On even numbered letter traversals (0, 2, 4 etc) you may only move in a cardinal
    left/right/up/down direction. On odd numbered traversals (1, 3, 5 etc) you may
    only move in a diagonal direction
       •
    The board adopts a Scrabble-like convention. If your word includes letters on the
    colored squares below, the score for that word should be adjusted as follows:
    ◦
    Red: ‘Triple Letter’ score (add 3 to the standard Boggle score for the
    word)
    ◦
    Green: ‘Double letter’ score (add 2 to the standard Boggle score for the
    word)
    ◦
    Blue: Double word score (double the score for the word)
    ◦
    ‘Letter-centric’ scores should be applied prior to computing ‘word-centric’
    scores

    Boggle rules determined from: http://www.fun-with-words.com/play_boggle.html and WikiHow

    As I was building the solver I realized it would be nice to see if the current string could possibly be in the word
    list without having a super nasty brute force lookup, and I knew that there was *some* algorithm/data structure that
    was made to do that, so I googled around and realized it's a trie. When I later looked up other boggle solver
    solutions to see what different implementations exist I found that using a trie is a pretty common approach.

    I decided not to use a dictionary of words to test a board against because the functionality is tested properly
    through unit tests, but it would be trivial to add - find a list of boggle compatible words (no nouns, all more than
    3 letters, etc), read the file in and split it by newline into an array of words.

    Problem assumptions:
        Even/odd number traversals refers to the index of the letter and not the even/oddness of the number of
        traversals we've done so far. I wasn't clear on whether the instructions referred to the traversal number or the
        index so I chose the latter.

        Every row resets the even/oddness - ie the 0th element of any row is always even.

        All 'dictionary' words are at least 3 letters, there is no validation.
