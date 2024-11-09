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
        // Log out any existing session to ensure a fresh user context
        await deleteSession();

        // Create a new user account with a unique ID, email, password, and username
        const newAccount = await account.create(
            ID.unique(), 
            email,
            password,
            username
        );

        // Ensure the account creation was successful
        if (!newAccount) {
            throw new Error("User account creation failed.");
        }

        // Generate avatar URL with user's initials based on the username
        const avatarUrl = avatars.getInitials(username);
        if (!avatarUrl) {
            throw new Error("Failed to generate user avatar.");
        }

        // Automatically sign in the user after account creation
        await signIn(email, password);

        // Create a new user document in the database with account details
        const newUser = await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw new Error("User creation process failed: " + error.message);
    }
};


/**
 * Signs in the user by creating a session with email and password.
 * 
 * @param {string} email - User's email for signing in
 * @param {string} password - User's password for signing in
 * @returns {object} session - The session object for the signed-in user
 */
export async function signIn(email, password) {
  try {
    // First, delete any existing session (log out if already logged in)
    await deleteSession()
    // Create a new session with the provided email and password
    const session = await account.createEmailSession(email, password);

    // Ensure session was created successfully
    if (!session) {
      throw new Error("Failed to create session");
    }

    return session;
  } catch (error) {
    console.log(error); // Log the error for debugging
    throw new Error("Failed to sign in: " + error.message); // Throw error to be handled by the calling function
  }
}

// Register User - Entry point for user registration process


// export async function signIn(email, password) {
//     try {
//       const session = await account.createEmailPasswordSession(email, password);
  
//       return session;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

const deleteSession = async () => {
    try {
      const activeSessions = await account.listSessions();
      if (activeSessions.total > 0) {
        await account.deleteSession("current")    
      }
    } catch (error) {
      console.log("No session available.");
    }
  };