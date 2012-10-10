var datastore=require('./chatStore.js');
datastore.storeUser('prateek');
datastore.storeUser('sam');
var u=datastore.findUser('prateek');
console.log(datastore.users.length);
datastore.storeUser('sam');
console.log(datastore.users.length);
