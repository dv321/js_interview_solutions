import {
    capitalize_and_alphabetize_keys,
    sanitize_for_json,
    format_json_string,
    visualize_data
} from "./json_format";

test('visualize_data example output', () => {
    let expected =
        `{
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
}`;

    let input = '{"colors":["red","green","blue"],"person":{"name":"Bob","age":20,"contact":{"email":"bob@example.com",},},"truthy": True,"falsy": False,"pi": 3.14159,}';

    expect(visualize_data(input)).toBe(expected);
});

test('visualize_data test list', () => {

    let expected =
        `[
  1
  2
  [
    3
    4
  ]
  5
]`;

    let input = '[1,2,[3,4],5]';

    expect(visualize_data(input)).toBe(expected);
});

test('visualize_data test list with anonymous dict', () => {

    let expected =
        `[
  false
  1
  true
  2
  [
    3
    4
  ]
  5
  [
    {
      "6": 7
      "hi": "there"
      "test": true
    }
  ]
  false
]`;

    let input = '[False, 1,True,2,[3,4],5,[{"hi":"there","6":7,"test": True,}],False]';

    expect(visualize_data(input)).toBe(expected);
});

test('sanitize_for_json', () => {

    let expected = '[false, 1,true,2,[3,4],5,[{"hi":"True","6":7,"test": true}],false]';

    let input = '[False, 1,True,2,[3,4],5,[{"hi":"True","6":7,"test": True,}],False]';

    expect(sanitize_for_json(input)).toBe(expected);

});

test('capitalize_and_alphabetize_keys', () => {

    let expected = {
        "Colors": ["red", "green", "blue"],
        "Person": {
            "age": 20,
            "Contact": {
                "email": "bob@example.com"
            },
            "name": "Bob"
        },
        "pi": 3.14159,
        "truthy": true
    };

    let input = {
        "person":
            {"name":"Bob", "age":20,
                "contact":
                    {"email":"bob@example.com"}
            },
        "truthy": true,
        "colors": ["red","green","blue"],
        "pi": 3.14159
    };

    capitalize_and_alphabetize_keys(input);

    expect(input).toEqual(expected);
});

test('format_json_string', () => {

    let input =
        `
{
  "hi": {
    "yo": {
      "gh": 5,
      "j": false
    }
  },
  "yo": [
    1,
    2
  ],
  "gh": 6
}`.slice(1); //remove the first newline

    let expected =
        `
{
  "hi":
  {
    "yo":
    {
      "gh": 5
      "j": false
    }
  }
  "yo":
  [
    1
    2
  ]
  "gh": 6
}`.slice(1); //remove the first newline

    expect(format_json_string(input)).toBe(expected);
});
