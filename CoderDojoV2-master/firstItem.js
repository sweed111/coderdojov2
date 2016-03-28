var item = { "_id" : "100",
             "firstName" : "xy", 
             "lastName" : "lei", 
             "roles" : ["Administrator" ], 
             "email" : "sdghd@", 
             "password" : "123", 
             "username" : "xy" };
db.user.insert(item);
db.createCollection("dd");