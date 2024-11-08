import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const config = {

    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.hova.testApp",
    projectId: "672dee5a001197639b1b",
    databaseId: "672df2c700077d29460d",
    userCollectionId: "672df2f6000ed57ce00c",
    videoCollectionId: "672df36b0012328632e6",
    storageId: "672df4e9000db4fe04ad",




}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;


const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });



}

// Register User


