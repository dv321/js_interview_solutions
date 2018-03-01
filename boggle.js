let EXTRA_POINTS_BOARD = [
    ['+3','','','','+3'],
    ['','+2','','+2',''],
    ['','','*2','',''],
    ['','+2','','+2',''],
    ['+3','','','','+3']
];

/**
 * Returns true if a subarray containing 2 items is found within a larger array.
 * @param {array.<array>} array_to_check
 * @param {array} subarray
 * @returns {boolean}
 */
function subarray_is_in_array(array_to_check, subarray) {
    return array_to_check.some((element) => {
        return (element[0] === subarray[0] && element[1] === subarray[1])
    })
}

/**
 * A simple trie data structure implementation.
 */
class Trie {
    /**
     * Constructor
     * @param {array} word_list An array of strings used to construct the trie.
     */
    constructor(word_list) {
        this.trie = Trie.build_trie(word_list);
    }

    /**
     * Returns true if the whole input string can be found in the trie, false otherwise
     * @param {string} str
     * @returns {boolean}
     */
    check_string(str) {

        let current_layer = this.trie;

        for (let i=0; i<str.length; i++) {
            if (current_layer[str[i]] !== undefined)
                current_layer = current_layer[str[i]];
            else
                return false;
        }
        return true;
    }

    /**
     * Builds the trie from the list of words and returns it.
     * @param {array.<string>} word_list An array of strings used to construct the trie.
     * @returns {{}} The finished trie.
     */
    static build_trie(word_list) {

        let trie = {};
        let current_level;
        let current_word;
        let current_char;

        // Go through all the words
        for (let i=0; i<word_list.length; i++) {

            current_word = word_list[i];
            current_level = trie;

            // Go through every character in the current word
            for (let j=0; j<current_word.length; j++) {

                current_char = current_word[j];

                //this letter does not exist in the tree, add it
                if (current_level[current_char] === undefined)
                    current_level[current_char] = {};

                current_level = current_level[current_char];
            }
        }
        return trie;
    }
}

/**
 * Calculates the extra points for our boggle board based on the given coordinates.
 * @param {array.<array>} visited_coords
 * @returns {number} The total score.
 */
function calc_extra_points(visited_coords) {

    let score = 0;
    let sqaure;

    for (let i=0; i<visited_coords.length; i++) {
        sqaure = EXTRA_POINTS_BOARD[visited_coords[i][0]][visited_coords[i][1]];
        if (sqaure === '')
            continue;
        if (sqaure[0] === '*')
            score *= parseInt(sqaure[1]);
        else
            score += parseInt(sqaure[1]);
    }
    return score;
}

/**
 * Generates a 5x5 2s array of random chars.
 * @returns {*[]}
 */
function generate_board() {

    // Easier to handle the qu edge case with this than any fancy alphabet builder
    let chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','qu','r','s','t','v','w','x','y','z'];
    let board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

    for (let row=0; row<5; row++) {
        for (let col=0; col<5; col++) {
            // Courtesy of https://stackoverflow.com/a/5915122
            board[row][col] = chars[Math.floor(Math.random()*chars.length)];
        }
    }
    return board;
}

/**
 * Boggle class.
 */
class Boggle {

    /**
     * Constructor. Takes an array of words to look for in the game, and optionally a board array. If the board is not
     * provided we generate one.
     * @param {array.<string>} words The words used as the in game "dictionary".
     * @param board The game board. Either a valid baord passed in, or a default of an empty array.
     */
    constructor(words, board=[]) {

        if (board.length === 0)
            board = generate_board();
        this.board = board;

        this.words = {};
        // Turn the words into keys in a dictionary so we get 0(1) lookup time
        for (let i=0; i<words.length; i++) {
            this.words[words[i]] = 0;
        }

        this.trie = new Trie(words);
        this.found_words = {};
    }


    /**
     * Recursively searches the board for valid words according to the rules.
     * @param row {Number} The current row index
     * @param col {Number} The current column index
     * @param str {String} The current word string
     * @param visited_coords {array} An array of the coordinates we've already visited
     */
    search(row, col, str='', visited_coords=[]){

        str += this.board[row][col];

        // If this string can't lead to a valid word no point in continuing the traversal
        if (!this.trie.check_string(str))
            return;

        // Found a word
        if (this.words[str] !== undefined) {

            // We temporarily add the current coords to the list for scoring purposes, but must remove it for later
            // traversal checks
            visited_coords.push([row, col]);

            let score = calc_extra_points(visited_coords);

            switch (str.length) {
                case 3:
                    score += 1;
                    break;
                case 4:
                    score += 1;
                    break;
                case 5:
                    score += 2;
                    break;
                case 6:
                    score += 3;
                    break;
                case 7:
                    score += 4;
                    break;
                default:
                    score += 11;
            }

            this.found_words[str] = score;

            // Pop the current coord out
            visited_coords = visited_coords.slice(0, -1);
        }

        let directions;
        // Up, down, left, right
        if (col === 0 || col%2 === 0) {

            //up, down. left, right
            directions = [
                [row-1, col],
                [row+1, col],
                [row, col-1],
                [row, col+1]
            ];
        }
        // Diagonal
        else {
            // Up right, up left. down right, down left
            directions = [
                [row-1, col+1],
                [row-1, col-1],
                [row+1, col+1],
                [row+1, col-1]
            ];
        }

        for (let i=0; i<directions.length; i++) {
            let coord = directions[i];
            // Skip this coordinate if it's invalid or we've already visited it
            if
            (
                (this.board[coord[0]] === undefined || this.board[coord[0]][coord[1]] === undefined)
                ||
                (subarray_is_in_array(visited_coords, coord))
            )
                continue;

            // Create a copy of the array so a single reference doesn't get added to by all the different paths
            let new_visited_coords = visited_coords.slice(0);
            new_visited_coords.push([row, col]);
            this.search(coord[0], coord[1], str, new_visited_coords);
        }

    }

    /**
     * Searches each letter in the board for words, prints the board, and prints the words found and the total score.
     */
    solve() {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                this.search(row, col);
            }
        }

        // Pretty print board
        for (let i=0; i<this.board.length; i++) {
            console.log(this.board[i]);
        }

        console.log("Words found:", this.found_words);

        if (Object.keys(this.found_words).length !== 0)
            console.log("Total score:",
                Object.values(this.found_words).reduce((accumulator, currentValue) => accumulator + currentValue)
            );
        else
            console.log("Total score: 0");
    }
}

module.exports = {
    calc_extra_points: calc_extra_points,
    Trie: Trie,
    Boggle: Boggle
};
