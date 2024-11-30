# MongoDB Comprehensive Guide

This document provides an overview of MongoDB commands, GeoJSON, and geospatial query operators.

---

## NoSQL Databases

NoSQL databases are non-relational databases designed to handle distributed data efficiently. They are known for their flexibility, scalability, and high performance.

### Key Features:
- **Schema-less:** Allows flexible data structure.
- **Horizontal Scaling:** Scales out by adding more servers.
- **High Performance:** Handles high read and write loads effectively.
- **Data Models:** Includes key-value, document, column-family, and graph models.

---

## MongoDB Overview

MongoDB is a NoSQL database that stores data in JSON-like documents. It is schema-flexible and supports complex queries, making it ideal for modern web applications.

### Features:
- Document-oriented storage
- Dynamic schema
- Geospatial queries
- Rich query language
- Horizontal scalability

---

## MongoDB Commands

### Database Related Commands
```bash
show dbs
use admin  # Switch to the admin database
use school  # Create and switch to a new "school" database
db.createCollection("students")  # Create a new collection "students"
db.dropDatabase()  # Drop the current database
```

### Inserting Documents
```bash
db.students.insertOne({name: "Spongebob", age: 30, gpa: 3.2})
db.students.insertMany([
  {name: "Patrick", age: 38, gpa: 1.5},
  {name: "Sandy", age: 27, gpa: 4.0},
  {name: "Gary", age: 18, gpa: 2.5}
])
db.students.find()
```

---

## Data Types in MongoDB
- **String:** `"Hello"`
- **Integer:** `123`
- **Double:** `123.45`
- **Boolean:** `true`/`false`
- **Date:** `new Date("YYYY-MM-DD")`
- **Null:** `null`
- **Array:** `[value1, value2]`
- **Nested Document:** `{key1: value1, key2: {key3: value3}}`

Example:
```bash
db.students.insertOne({
  name: "Lary",
  age: 32,
  gpa: 2.8,
  fullTime: false,
  registerDate: new Date("2023-01-02"),
  graduationDate: null,
  courses: ["biology", "chemistry", "calculus"],
  address: {street: "123 Fake St.", city: "Bikini Bottom"}
})
```

---

### Sorting and Limiting Documents
```bash
db.students.find()
db.students.find().sort({name: 1})  # Ascending alphabetical order
db.students.find().sort({name: -1})  # Descending alphabetical order
db.students.find().limit(1)
db.students.find().sort({gpa: -1}).limit(1)  # Highest GPA
```

---

### Finding Documents
```bash
db.students.find({gpa: 4.0}, {name: true, _id: false})
db.students.find({name: "Spongebob", gpa: 3.5})
db.students.find({}, {name: true})
db.students.find({}, {_id: false, name: true, gpa: true})
```

---

### Updating Documents
```bash
db.students.updateOne({name: "Spongebob"}, {$set: {fullTime: true}})
db.students.updateOne({_id: ObjectId("123abc")}, {$unset: {fullTime: ""}})
db.students.updateMany({}, {$set: {fullTime: false}})
db.students.updateMany({fullTime: {$exists: false}}, {$set: {fullTime: true}})
```

---

### Deleting Documents
```bash
db.students.deleteOne({name: "Lary"})
db.students.deleteMany({fullTime: false})
db.students.deleteMany({registerDate: {$exists: false}})
```

---

### Comparison Operators
```bash
db.students.find({name: {$ne: "Spongebob"}})
db.students.find({age: {$lt: 20}})
db.students.find({age: {$gte: 27}})
db.students.find({gpa: {$gte: 3, $lte: 4}})
db.students.find({name: {$in: ["Spongebob", "Patrick", "Sandy"]}})
```

---

### Logical Operators
```bash
db.students.find({$and: [{fullTime: true}, {age: {$gt: 23}}]})
db.students.find({$or: [{fullTime: true}, {age: {$gt: 23}}]})
db.students.find({$nor: [{fullTime: true}, {age: {$gt: 23}}]})
db.students.find({age: {$not: {$gt: 30}}})
```

---

## GeoJSON and Geospatial Queries

### What is GeoJSON?

GeoJSON is a JSON format used for encoding geographic data structures. It supports features like `Point`, `LineString`, and `Polygon`.

Example GeoJSON:
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Sample Location"
  }
}
```

---

### Geospatial Indexes

1. **2dsphere**: Maps data on a spherical surface (preferred).
2. **2d**: Maps data on a flat plane.

---

### Geospatial Query Operators

#### `$near`
Find nearby points:
```bash
db.locations.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [77.1025, 28.7041]
      },
      $maxDistance: 5000
    }
  }
})
```

#### `$geoWithin`
Find points within a polygon:
```bash
db.locations.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[[77.1010, 28.7040], [77.1040, 28.7050], [77.1030, 28.7030], [77.1010, 28.7040]]]
      }
    }
  }
})
```

#### `$geoIntersects`
Find regions intersecting a line:
```bash
db.regions.find({
  boundary: {
    $geoIntersects: {
      $geometry: {
        type: "LineString",
        coordinates: [[77.1010, 28.7040], [77.1040, 28.7050]]
      }
    }
  }
})
```

#### `$centerSphere`
Find points within a spherical radius:
```bash
db.places.find({
  location: {
    $geoWithin: {
      $centerSphere: [[77.1025, 28.7041], 1 / 6378.1]  # Radius in radians
    }
  }
})
```

---

### Example: Find Nearby Stores
```bash
db.stores.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-122.4194, 37.7749]
      },
      $maxDistance: 2000
    }
  }
}).limit(10)
```

---
