//using mongoose

const mongoose = require( 'mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true ,useUnifiedTopology: true });
//make connection to mongodb server and then look for frutsdb and if it does not exist, create it

//define a schema(structure) that every fruit object would have
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
}) ;
 //in mongoose specify a singular name for your collection
 //mongoose will cleverly conver that collection name to plural

 const Fruit = mongoose.model("Fruit",fruitSchema);

 //now,you can create a new fruit document(from the model fruitschema)

 const fruit = new Fruit ({
     name: "Apple",
     rating: 7,
     review: "Pretty solid as a fruit"
 })

 //fruit.save();
 //thsi calls the save method of mongoose and saves our fruit document to Fruits collection in fruits DB


 const PersonSchema = new mongoose.Schema({
    name: String,
    Age: Number
 });

 const Person = mongoose.model("Person",PersonSchema);

 const person = new Person({
    name: "John",
    Age: 42
 })

 person.save();

//  const banana = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit"
// });

// const kiwi = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit"
// });

// const orange = new Fruit ({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit"
// });
//to insert many objects  to our collection
//1st argument -> array of objects
//2nd arg-> callback fn
// Fruit.insertMany([kiwi,orange,banana],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("successfully saved all the fruits to the DB");
//     }
// });

//to read DB
Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }
    else{

        //close connection with db in the last function that would be called
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});
//fruits is an array of javascript object;