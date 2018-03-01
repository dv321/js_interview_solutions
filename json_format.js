/**
 * The Javascript Builtin String Method band, everybody.....*crickets*
 * @param {string} string_to_cap
 * @returns {string}
 */
function capitalize(string_to_cap) {
    return string_to_cap.charAt(0).toUpperCase() + string_to_cap.slice(1);
}

/**
 * Capitalizes every key of a dict or list in an object tree and alphabetizes every string in a dict.
 * Works by assigning the value of a key to a capitalized key (ie "a" to "A") and then deleting the
 * original key - inefficient, but since object keys are immutable it's the only way.
 * The alphabetization works because in ES6 keys stay ordered by their modification or creation order,
 * so we process all the keys alphabetically and they stay ordered.
 * @param {object} obj
 */
function capitalize_and_alphabetize_keys(obj) {
    // Dealing with a dict
    if (!Array.isArray(obj)) {

        let sorted_keys = Object.keys(obj).sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        for (let i=0; i<sorted_keys.length; i++) {

            // If the value of this key is an object, capitalize the key
            if (typeof obj[sorted_keys[i]] === 'object') {
                let newkey = capitalize(sorted_keys[i]);
                obj[newkey] = obj[sorted_keys[i]];
                delete obj[sorted_keys[i]];

                capitalize_and_alphabetize_keys(obj[newkey]);
            }
            // Welcome to js horror town - we can't modify keys, but we can delete them and recreate them in order
            // to gain the proper - ie alphabetical, in this case - ordering
            else {
                let temp = obj[sorted_keys[i]];
                delete obj[sorted_keys[i]];
                obj[sorted_keys[i]] = temp;
            }
        }
    }
    // Dealing with an array, recurse into any objects it contains
    else {
        for (let i=0; i < obj.length; i++) {
            if (typeof obj[i] === 'object')
                capitalize_and_alphabetize_keys(obj[i]);
        }
    }
}

/**
 *  Put the opening brackets (ie { and [ ) on a new line with the proper indentation
 *  and removes all commas from the input string.
 *  There might be a really simple way to do this just with regexes but that'll be v2.0
 * @param {string} json_str A string created from the output of JSON.stringify().
 * @returns {string} A formatted version of the input string with brackets on new lines and no commas.
 */
function format_json_string(json_str) {
    // Remove all commas from the output
    json_str = json_str.replace(/,/g, "");

    let firstBracket = json_str[0];
    // Get rid of the first bracket to preserve the indentation
    let str_as_list = json_str.split("\n").slice(1);
    let i = 0;

    while (true) {

        if (i === str_as_list.length)
            break;

        // Make sure this bracket isn't the only thing on its line
        if (
            (str_as_list[i].endsWith("{") || str_as_list[i].endsWith("["))
            &&
            (str_as_list[i].trim().length !== 1)
        ) {
            // Count whitespace
            let indent = str_as_list[i].search(/\S/);
            // Insert the bracket string with proper indentation into the list
            str_as_list.splice(i+1, 0, " ".repeat(indent) + str_as_list[i][str_as_list[i].length-1]);
            // Remove the bracket from the previous line
            str_as_list[i] = str_as_list[i].slice(0, -2);
            i++;
        }
        i++;
    }

    return firstBracket + "\n" + str_as_list.join("\n");
}

/**
 * Turns our JSON-like string into a proper JSON string.
 * Removes all trailing commas and turns True and False into true and false, respectively. Doesn't change True/False if
 * they're a string.
 * @param {string} str
 * @returns {string}
 */
function sanitize_for_json(str) {
    return str.replace(/,([}\]])/g, "$1")
        .replace(/True\s*([,{}\[\]])/g, "true$1")
        .replace(/False\s*([,{}\[\]])/g, "false$1");
}

/**
 * Takes a JSON-like string and returns it formatted according to specific rules.
 * @param {string} str
 * @returns {string}
 */
function visualize_data(str) {

    let json_obj = JSON.parse(sanitize_for_json(str));

    capitalize_and_alphabetize_keys(json_obj);

    return format_json_string(JSON.stringify(json_obj, null, 2));
}

module.exports = {
    capitalize: capitalize,
    capitalize_and_alphabetize_keys: capitalize_and_alphabetize_keys,
    sanitize_for_json: sanitize_for_json,
    format_json_string: format_json_string,
    visualize_data: visualize_data
};