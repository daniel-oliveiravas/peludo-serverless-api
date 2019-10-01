import * as uuid from 'uuid';
import { getDynamoDBClient } from '../utils/AwsUtils';
import { CreatePetRequest } from '../requests/CreatePetRequest';

const dynamoClient = getDynamoDBClient();
const PETS_TABLE = process.env.PETS_TABLE;

export const createPet = async (newPetRequest: CreatePetRequest) => {
    const petUUID = uuid.v4();

    const newPet = {
        ...newPetRequest,
        petId: petUUID,
        createdAt: new Date().toISOString()
    }

    const petCreated = await dynamoClient.put({
        TableName: PETS_TABLE,
        Item: newPet
    }).promise();

    return petCreated.Attributes;
}