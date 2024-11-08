// Importing necessary modules from the react-native-appwrite library
// These include modules to manage accounts, avatars, database, storage, queries, and client setup.
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

// Configuration object containing details for Appwrite setup
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",         // Appwrite endpoint URL
    platform: "com.hova.testApp",                     // Application identifier or bundle ID
    projectId: "672dee5a001197639b1b",                // Unique ID for the Appwrite project
    databaseId: "672df2c700077d29460d",               // Database ID within the project
    userCollectionId: "672df2f6000ed57ce00c",         // ID for user collection in the database
    videoCollectionId: "672df36b0012328632e6",        // ID for video collection in the database
    storageId: "672df4e9000db4fe04ad",                // Storage ID used for storing files
}

// Initializing the Appwrite client with the necessary configurations
const client = new Client();

client
    .setEndpoint(config.endpoint) // Setting the endpoint URL for Appwrite
    .setProject(config.projectId) // Setting the project ID for Appwrite
    .setPlatform(config.platform) // Setting the application platform ID or bundle ID

// Initializing Appwrite modules
const account = new Account(client); // Initializing Account module for user management
const avatars = new Avatars(client); // Initializing Avatars module to handle user avatars
const database = new Databases(client); // Initializing Databases module for database operations

/**
 * Creates a new user account in Appwrite using email, password, and username.
 * 
 * @param {string} email - User's email for account creation
 * @param {string} password - Password for the user account
 * @param {string} username - Username chosen by the user
 * @returns {void}
 */
export const createUser = async (email, password, username) => {
    try {
        // Create a new account with unique ID, email, password, and username
        const newAccount = await account.create(
            ID.unique(),          // Automatically generates a unique user ID
            "email",              // User's email address
            "password",           // User's password for login
            "username"            // Username for display and identification
        );

        // Check if the account creation was successful
        if (!newAccount) {
            throw new Error("Failed to create user"); // Error handling if account creation fails
        }

        // Generate avatar URL with user's initials based on the username
        const avatarUrl = avatars.getInitials(username);

        // Automatically sign in the user after account creation
        await signIn(email, password);
        const newUser = await database.createDocument(
            config.databaseId, // Database ID
            config.userCollectionId, // User collection ID
            ID.unique(), // Unique user ID
            {
                name: username, // User's name
                email: email, // User's email address
                avatar: avatarUrl, // User's avatar URL
            }



        )
        return newUser
    } catch (error) {
        console.log(error); // Log the error for debugging
        throw new Error(error); // Throw error to be handled by the calling function
    }
};

/**
 * Signs in the user by creating a session with email and password.
 * 
 * @param {string} email - User's email for signing in
 * @param {string} password - User's password for signing in
 * @returns {object} session - The session object for the signed-in user
 */
export const signIn = async (email, password) => {
    try {
        // Attempt to create a session with the given email and password
        const session = await account.createEmailSession(email, password);
        return session; // Return the session object on successful login
    } catch (error) {
        throw new Error(error); // Throw error if login fails
    }
};

// Register User - Entry point for user registration process
