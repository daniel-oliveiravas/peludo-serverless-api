import * as AWS from 'aws-sdk';

let dynamoClient: AWS.DynamoDB.DocumentClient;

export const getDynamoDBClient = () => {
    dynamoClient = dynamoClient || createDynamoDBClient();
    return dynamoClient;
}

const createDynamoDBClient = () => {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance')
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new AWS.DynamoDB.DocumentClient()
};