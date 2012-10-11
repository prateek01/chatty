var datastore=require('./chatStore.js'),
repo=require('./repository.js');

// datastore.storeUser('prateek');
// datastore.storeUser('sam');
// datastore.storeUser('pam');
// // datastore.storeUser('jammy');
// // datastore.storeUser('hungry');

// datastore.addUserContact('prateek','sam');
// //datastore.addUserContact('prateek','pam');
// var u=datastore.findUser('prateek');
// //console.log(JSON.stringify(datastore.findSuggestedUsers(u)));
// console.log(JSON.stringify(datastore.getContacts(u)));
// u=datastore.findUser('sam');
// //console.log(JSON.stringify(datastore.findSuggestedUsers(u)));
// console.log(JSON.stringify(datastore.getContacts(u)));
// u=datastore.findUser('pam');
// //console.log(JSON.stringify(datastore.findSuggestedUsers(u)));
// console.log(JSON.stringify(datastore.getContacts(u)));

repo.register('prateek');
repo.register('sam');

repo.register(repo.idToName['prateek'],repo.idToName['sam']);
console.log(JSON.stringify(repo));