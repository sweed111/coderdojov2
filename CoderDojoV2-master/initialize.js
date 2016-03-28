
var collections=["user","role","dojo","avatar","meeting"];
var roles=["Administrator","Champion","Mentor","Ninja"];

for (var i=0; i<collections.length;i++){
    db.createCollection(collections[i]); 
}

for (var j=0; j<roles.length;j++){
    db.role.insert({"name":roles[j]}); 
}


var item = { "_id" : "1",
             "firstName" : "admin", 
             "lastName" : "", 
             "roles" : ["Administrator" ], 
             "email" : "admin", 
             "password" : "123", 
             "username" : "admin" };
db.user.insert(item);