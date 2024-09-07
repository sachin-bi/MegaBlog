import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call anathor method (then do login by default)
                return this.login({email,password});
            }
            else { 
                return userAccount;
            }
        } catch (error) {
            throw error;    // but where(may be on signup page or on console)
        }
    }

    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(
            // const userLogin = await this.account.createEmailSession(
                email,
                password,
            );
            return userLogin;
        } catch (error) {
            console.log("Appwrite service :: login :: error",error);
            throw error;


        }
    }

    async getCurrentUser(){
        try {
               return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser:: error",error);
            
            // throw error;
        }
        // no account currently loggedin
        return null;
    }

    async logout(){
        try {
            //logout from all browser
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logOut :: error",error);

            // throw error;
        }
    }
}

const authService = new AuthService();


export default authService ;