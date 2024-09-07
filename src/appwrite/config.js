import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,   // documentID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite services - config.js :: createPost :: ", error);

        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite services - config.js :: updatePost :: ", error);

        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite services - config.js :: deletePost :: ", error);
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )

        } catch (error) {
            console.log("Appwrite services - config.js :: getPost :: ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            // return await this.databases.getDocument(
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                // [Query.equal("status","active")]
            )
        } catch (error) {
            console.log("Appwrite services - config.js :: getPosts :: error", error);
            return false

        }
    }

    // file upload service or methods

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,  // storage id
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log("Appwrite services - config.js :: uploadFile :: ", error);
            return false
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true

        } catch (error) {
            console.log("Appwrite services - config.js :: deleteFile :: ", error);
            return false
        }
    }
     getPreviewFile(fileId) {
        console.log("fileId", fileId);
        
        // try {
            // returns img preview url
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
            

        // } catch (error) {
        //     console.log("Appwrite services - config.js :: previewFile :: ", error);
        //     return false
        // }
    }





}

const service = new Service()

export default service