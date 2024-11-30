// Select the database to use.
use('sample_mflix');

/* SAMPLE QUESTION 1
Find all movies in the database with the title "Star Trek
*/
db.movies.find( {"title" : "Star Trek"});



/* SAMPLE QUESTION 2
How MANY movies in the database have the title "Star Trek"?
*/
console.log(
    "The number of movies titled 'Star Trek' is: " +
    db.movies.find( {"title" : "Star Trek"}).count()
)


/* SAMPLE QUESTION 3
- A MongoDB query is just a JSON object.
- Using Javascript, you can define your object and store it in a variable.
- You can then use that variable later in your code, thus making your code more readable.

How many movies released in 1956 have an IMDB rating greater than 8?
*/
query3 = {
    "year" : 1956,
    "imdb.rating" : { $gt : 8 }
}

// View the results
db.movies.find(query3);

// You can ALSO store the results of the query in a variable
results3 = db.movies.find(query3);

// Log the number of objects in the result set with `.count()`
console.log(
    "The number of movies released in 1956 with an IMDB rating > 8 is: " +
    results3.count()
)


/*
**************************
In-Class Exercise: MongoDB Queries Introduction
**************************
- Work collaboratively to write the queries that answer the questions below.

- Every student will submit this exercise.

- Log a response to each question in the console as demonstrated above.

- TO SUBMIT: Attach your playground file to Brightspace.
*/

/*
QUESTION 1: How many movies were released in the year 2000 that have a rating of either "PG" or "PG-13"?
*/
result4=db.movies.find({$and:[{"rated": {$in:["PG","PG-13"]}},{"year":2000}]})

console.log(
    "The number of movies that were released in the year 2000 that have a rating of either 'PG' or 'PG-13' is: " + 
    result4.count()
)

/*
QUESTION 2: How many movies were directed by either "Christopher Nolan" or "Steven Spielberg"?
*/
result5=db.movies.find({$or:[{"directors":"Christopher Nolan"},{"directors":"Steven Spielberg"}]})

console.log(
    "The number of movies that were directed by 'Christopher Nolan' and 'Steven Spielberg' is: " + 
    result5.count()
)

/*
QUESTION 3: How many movies have both "Drama" and "Romance" genres?
*/
result6 = db.movies.find({"genres": {$all: ["Drama", "Romance"]}})

console.log(
    "The number of movies that have both 'Drama' and 'Romance' genres is: " + 
    result6.count()
)

/*
QUESTION 4: How many movies were released between the years 1995 and 2000 (inclusive)?
*/
result7 = db.movies.find({"year": {$gte:1995,$lte:2000}})

console.log(
    "The number of movies that were released between the years 1995 and 2000 (inclusive) is: " + 
    result7.count()
)

/*
QUESTION 5: How many theaters are located in the state of California "CA"?
*/
result8 = db.theaters.find({"location.address.state":'CA'})

console.log(
    "The number of theaters are located in the state of California 'CA': " + 
    result8.count()
)

