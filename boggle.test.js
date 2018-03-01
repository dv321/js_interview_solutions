//have to use require since i don't have webpack set up for this project
const fs = require('fs');
import {calc_extra_points, Trie, Boggle} from "./boggle";

test('solve random board with word list', () => {
    let words = JSON.parse(fs.readFileSync("words.json"));
    let game = new Boggle(words);

    game.solve();

    //uncomment this to see the full trie
    //console.log(game.trie);
});

test('solve board', () => {
    let board = [
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o'],
        ['p', 'qu', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y']
    ];
    let words = ['abhgkf','ntsy','wwww','qum','onr','onrs','onrsx'];
    let game = new Boggle(words, board);
    game.solve();

    let expected = { 'abhgkf':8, 'ntsy':6, 'onr':1, 'onrs':3, 'qum':5};

    expect(game.found_words).toEqual(expected);
});

test('I mean, you really should though', () => {
    let board = [
        ['y', 'a', 's', 'p', 'u'],
        ['l', 'l', 'h', 'o', 'l'],
        ['m', 'l', 'i', 'n', 'd'],
        ['e', 'e', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y']
    ];
    let words = ['yall','should','hireme'];
    let game = new Boggle(words, board);
    game.solve();

    let expected = { 'yall':6, 'should':8, 'hireme':5};

    expect(game.found_words).toEqual(expected);
});

test('calculate_extra_points', () => {

    expect(calc_extra_points([[0,0],[1,1],[2,2],[0,3]])).toBe(10);

    expect(calc_extra_points([[0,0],[0,1],[0,2],[0,3]])).toBe(3);
});

test('Trie', () => {

    let trie = new Trie([
        'ab',
        'gh',
        'abc',
        'g',
        'o',
        'ag'
    ]);

    expect(trie.trie).toEqual({
        'a': {
            'b': {
                'c': {}
            },
            'g': {}
        },
        'g': {
            'h': {}
        },
        'o': {}
    });
    expect(trie.check_string('abc')).toBe(true);
    expect(trie.check_string('abj')).toBe(false);
    expect(trie.check_string('o')).toBe(true);
    expect(trie.check_string('gh')).toBe(true);
    expect(trie.check_string('ghu')).toBe(false);
    expect(trie.check_string('gu')).toBe(false);
});
