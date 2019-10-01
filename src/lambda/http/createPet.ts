import { createPet } from '../../service/petService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreatePetRequest } from '../../requests/CreatePetRequest';
//import { getUserId } from '../../utils/AuthUtils';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const newPetRequest: CreatePetRequest = JSON.parse(event.body);
    //const userId = getUserId(event);

    const petCreated = await createPet(newPetRequest);

    return {
        statusCode: 201,
        body: JSON.stringify({ pet: petCreated })
    };
}