//using mongoose

const mongoose = require( 'mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true ,useUnifiedTopology: true });
//make connection to mongodb server and then look for frutsdb and if it does not exist, create it

//define a schema(structure) that every fruit object would have
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
       // required: [true,"Please mention name"] // name is compulsory field
    },
    rating: {
        type: Number,
        min: 1,
        max: 10    //validation in mongoose
    },
    review: String
}) ;
 //in mongoose specify a singular name for your collection
 //mongoose will cleverly conver that collection name to plural

 const Fruit = mongoose.model("Fruit",fruitSchema);

 //now,you can create a new fruit document(from the model fruitschema)

 const fruit = new Fruit ({
    // name: "Apple",
     rating: 4,
     review: "Peaches are great"
 })

 //fruit.save();
 //thsi calls the save method of mongoose and saves our fruit document to Fruits collection in fruits DB


 const PersonSchema = new mongoose.Schema({
    name: String,
    Age: Number,
    favoriteFruit: fruitSchema
 });

 const Person = mongoose.model("Person",PersonSchema);
 
 const strawberry = new Fruit({
    name: "strawberry",
    rating: 9,
    review: "great"
 });

 strawberry.save(); 

 const person = new Person({
    name: "john",
    Age: 12,
    favoriteFruit: strawberry
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


Fruit.updateOne({_id: "5e0caa46df66df153854ed6e"}, {name: "Peach"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("success update");
    }
})

Fruit.deleteOne({_id:"5e0cab8e47fedf2b60ed5ca8"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("deleted");
    }
})

Person.deleteMany({name: "John"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("deleted Johns");
    }
})