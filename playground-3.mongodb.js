/*
INSTRUCTIONS

Use MongoDB Compass to upload new data to your cluster.

-- Database 1: Nobel Prize winners
In Compass, 
    1. Create a new database named `nobel`
    2. Create a new collection named `prizes`
    3. Use the Add Data feature to upload the JSON file `nobel_prizes.json`

-- Database 2: Jeopardy questions
In Compass, 
    1. Create a new database named `jeopardy`
    2. Create a new collection named `questions`
    3. Use the Add Data feature to upload the JSON file `jeopardy_questions.json`
    NOTE: this is a huge dataset (200,000+ documents!) and will take quite some time to load. Be patient.

Once your data is uploaded, copy and paste this playground file into your Visual Studio code window and connect to your cluster.

You should see the new databases in the MongoDB extension.
*/

/* SECTION 1: NOBEL PRIZE WINNERS */
/****** 
 * IMPORTANT NOTE: Nobel prizes can be SHARED by any number of winners (laureates). However, they only count as ONE Nobel prize. 
 * A Nobel prize shared by 3 people is ONE prize shared by THREE laureates.
******/


// Select the database to use.
use('nobel');

/***
 * EXAMPLE QUESTION 1
 * How many Nobel prizes have a laureate whose surname begins with "Q"?
***/

surname = db.prizes.find( { "laureates.surname" : { "$regex" : "^Q" } } ).count();
console.log('There are ' + surname + ' laureates whose surname starts with `Q`.');

/***
 * EXAMPLE QUESTION 2
 * How many Nobel prizes have a laureate whose surname contains a space " "?
 * NOTE THE SYNTAX IN THE REGULAR EXPRESSION BELOW. We couldn't get this to work in class.
    * ANY TIME you are using "\" to escape a character or put in a token in MongoDB (examples: \s, \S, \d), 
    * you MUST use a double backslash in the MongoDB regex syntax (\\s, \\S, \\d, etc.)
***/

surname = db.prizes.find( { "laureates.surname" : { "$regex" : "\\s" } } ).count();
console.log('There are ' + surname + ' laureates whose surname contains a space.');


/*** 
 * IA QUESTION 1 - 1 point
 * How many Nobel prizes have a laureate whose surname begins with "D" (any case)?
***/

surname = db.prizes.find( { "laureates.surname" : { "$regex" : "^(d|D)" } } ).count();
console.log('There are ' + surname + ' number of nobel prizes that have laureates whose surname begins with "D" (any case)');

/*** 
 * IA QUESTION 2 - 1 point
 * How many Nobel prizes have a laureate whose surname begins with "H" or "K" (any case)?
***/

surname = db.prizes.find( { "laureates.surname" : { "$regex" : "^(h|H|k|K)" } } ).count();
console.log('There are ' + surname + ' number of nobel prizes that have a laureate whose surname begins with "H" or "K" (any case)');

/*** 
 * IA QUESTION 3 - 2 points
 * How many Nobel prizes have a laureate whose firstname contains a space and ends with a "."?
***/

surname = db.prizes.find( { "laureates.firstname" : { "$regex" : ".*\\s.*\\.$" } } ).count();
console.log('There are ' + surname + ' number of nobel prizes that have a laureate whose firstname contains a space and ends with a "."');

/*** 
 * IA QUESTION 4 - 2 points
 * How many Nobel prizes in literature have a laureate whose lastname contains exactly two characters?
***/

surname = db.prizes.find( { "laureates.surname" : { "$regex" : "^.{2}$" } ,"category":"literature"} ).count();
console.log('There are ' + surname + ' number of nobel prizes in literature that have a laureate whose lastname contains exactly two characters');

/*** 
 * IA QUESTION 5 - 2 points
 * How many Nobel prizes awarded in the 1900s have a laureate whose surname ENDS in `sen`?
***/

surname = db.prizes.find( { "laureates.surname":{"$regex":"sen$"},"year":{$gte:"1900",$lte:"1999"}} ).count();
console.log('There are ' + surname + ' number of Nobel prizes awarded in the 1900s have a laureate whose surname ENDS in `sen`');

/* SECTION 2: JEOPARDY QUESTIONS */
/****** 
 * NOTE: 
 * Each document in the database is a question from the game show Jeopardy! 
 * There is a field called 'question' within each document. 
 * CAREFULLY read the text of the exercises below to ensure you are building the correct query. 
 ******/ 

// Select the database to use.
use('jeopardy');


/*** 
 * IA QUESTION 6 - 3 points
 * How many documents in the database were presented on the 15th of the month (any month) and contain a 4-digit number in its question?
***/

docs = db.questions.find( {"air_date":{"$regex":"\\-15$"},"question":{"$regex":"\\b[0-9]{4}\\b"}} ).count();
console.log('There are ' + docs + ' number of documents in the database that were presented on the 15th of the month (any month) and contain a 4-digit number in its question.');

/*** 
 * IA QUESTION 7 - 3 points
 * How many documents in the database have a value of $200 or $2000 and have the word "Galileo" or "Galilee" in their question?
***/

docs = db.questions.find( {$or:[{"value":"$200"},{"value":"$2000"}],"question":{"$regex":"(Galileo|Galilee)"}} ).count();
console.log('There are ' + docs + ' number of documents in the database that have a value of $200 or $2000 and have the word "Galileo" or "Galilee" in their question');

/*** 
 * IA QUESTION 8 - 3 points
 * How many UNIQUE CATEGORIES contain at least one number of EXACTLY 2 digits?
 * (Hint: Look up the MongoDB .distinct() method.)
***/

docs = db.questions.distinct("category",{"category":{"$regex":"(\\b\\d{2}\\b)+"}});
total_categories=docs.length;
console.log('There are ' + total_categories + ' number of UNIQUE CATEGORIES that contain at least one number of EXACTLY 2 digits');

/*** 
 * IA QUESTION 9 - 4 points
 * How many questions in the database contain a four digit year in the 20th century? 
 * The technical definition of the 20th century is 1901-2000, inclusive.
***/

docs = db.questions.find( {"question":{"$regex":"(\\b(19[0-9][1-9]|19[1-9]0|2000)\\b)"}} ).count();
console.log('There are ' + docs + ' questions in the database that contain a four digit year in the 20th century');

/*** 
 * IA QUESTION 10 - 4 points
 * How many UNIQUE CATEGORIES contain the words "AMERICA" or "AMERICAN" but NOT "AMERICANA"
 * (Hint: Look up the MongoDB .distinct() method.)
 * Examples:
    * ✅ "AN AMERICAN IN PARIS"
    * ❌ "AMERICANS"
    * ✅ "BLACK AMERICA"
    * ✅ "ASIAN-AMERICAN ACHIEVERS"
    * ❌ "20th CENTURY AMERICANA"
***/

docs = db.questions.distinct("category",{"category":{"$regex":"(\\bAMERICA\\b|\\bAMERICAN\\b)"}});
total_categories=docs.length;
console.log('There are ' + total_categories + ' number of UNIQUE CATEGORIES that contain the words "AMERICA" or "AMERICAN" but NOT "AMERICANA"');