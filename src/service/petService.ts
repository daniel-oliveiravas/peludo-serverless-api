import * as uuid from 'uuid';
import { getDynamoDBClient } from '../utils/AwsUtils';
import { CreatePetRequest } from '../requests/CreatePetRequest';

const dynamoClient = getDynamoDBClient();
const PETS_TABLE = process.env.PETS_TABLE;
const PETS_CONDITION_INDEX = process.env.PETS_CONDITION_INDEX;

export const createPet = async (newPetRequest: CreatePetRequest) => {
    const petUUID = uuid.v4();

    const newPet = {
        ...newPetRequest,
        id: petUUID,
        createdAt: new Date().toISOString()
    }

    const petCreated = await dynamoClient.put({
        TableName: PETS_TABLE,
        Item: newPet
    }).promise();

    return petCreated.Attributes;
}

export const getPetsByCondition = async (condition: string) => {
    const result = await dynamoClient.query({
        TableName: PETS_TABLE,
        IndexName: PETS_CONDITION_INDEX,
        KeyConditionExpression: '#condition = :condition',
        ExpressionAttributeValues: {
            ':condition': condition
        },
        ExpressionAttributeNames: {
            '#condition': 'condition'
        }
    }).promise();

    return result.Items;
}

export const deletePetById = async (petId: string) => {
    await dynamoClient.delete({
        TableName: PETS_TABLE,
        Key: {
            'id': petId
        }
    }).promise();
}

export const getPetById = async (petId: string) => {
    const result = await dynamoClient.query({
        TableName: PETS_TABLE,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': petId
        }
    }).promise();

    return result.Items;
}