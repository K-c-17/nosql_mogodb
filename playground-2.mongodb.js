// Select the database to use.
use('sample_mflix');


/* IA QUESTION 1 - 3 points

How many movies directed by Mel Brooks also had Mel Brooks in the cast?

*/
result1=db.movies.find({$and:[{"directors": 'Mel Brooks'},{"cast":'Mel Brooks'}]})

console.log(
    "The number of movies that are directed by Mel Brooks and also have Mel Brooks in the cast: " + 
    result1.count()
)



/* IA QUESTION 2 - 3 points

How many movies have a runtime between 90 and 120 minutes (inclusive) and are in the Comedy genre?

*/
result2=db.movies.find({"runtime":{$gte:90,$lte:120},"genres":"Comedy"})

console.log(
    "The number of movies that have a runtime between 90 and 120 minutes (inclusive) and are in the Comedy genre: " + 
    result2.count()
)


/* IA QUESTION 3 - 3 points

How many movies have both "Adventure" and "Fantasy" genres and were released before the year 2010?

*/
result3=db.movies.find({"year":{$lt:2010},"genres":{$all:["Adventure","Fantasy"]}})

console.log(
    "The number of movies that have both 'Adventure' and 'Fantasy' genres and were released before the year 2010: " + 
    result3.count()
)


/* IA QUESTION 4 - 4 points

How many movies are available in the Polish or German languages, have at least 1000 IMDB votes, and were released after 1996?

*/
result4=db.movies.find({"languages":{$in:['Polish','German']},"imdb.votes":{$gte:1000},"year":{$gt:1996}})

console.log(
    "The number of movies that are available in the Polish or German languages, have at least 1000 IMDB votes, and were released after 1996: " + 
    result4.count()
)

/* IA QUESTION 5 - 4 points

How many movies have a "Tomatoes" viewer rating less than 8.0, a "Tomatoes" critic rating greater than 7.0, were released in the 1990s (including 1990), and are in the "Drama" genre?

*/
result5=db.movies.find({"tomatoes.viewer.rating":{$lt:8},"tomatoes.critic.rating":{$gt:7},"year":{$gte:1990,$lt:2000},"genres":'Drama'})

console.log(
    "The number of movies that have a 'Tomatoes' viewer rating less than 8.0, a 'Tomatoes' critic rating greater than 7.0, were released in the 1990s (including 1990), and are in the 'Drama' genre: " + 
    result5.count()
)

/* IA QUESTION 6 - 4 points

How many movies have both "Comedy" and "Romance" genres, were released in the 2000s (including 2000), have a runtime less than 100 minutes, and have a "PG" rating?

*/
result6=db.movies.find({"genres":{$all:['Comedy','Romance']},"year":{$gte:2000,$lt:2010},"runtime":{$lt:100},"rated":'PG'})

console.log(
    "The number of movies that have both 'Comedy' and 'Romance' genres, were released in the 2000s (including 2000), have a runtime less than 100 minutes, and have a 'PG' rating: " + 
    result6.count()
)

/* IA QUESTION 7 - 4 points

How many movies have a metacritic score between 80 and 90 (inclusive), are in the "Thriller" or "Horror" genres, were released in the 2010s, and have a "R" rating?

*/
result7=db.movies.find({"metacritic":{$gte:80,$lte:90},"genres":{$in:['Thriller','Horror']},"year":{$gte:2010,$lt:2020},"rated":'R'})

console.log(
    "The number of movies that have a metacritic score between 80 and 90 (inclusive), are in the 'Thriller' or 'Horror' genres, were released in the 2010s, and have a 'R' rating: " + 
    result7.count()
)