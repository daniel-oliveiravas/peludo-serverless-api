import { updatePet } from '../../service/petService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePetRequest } from '../../requests/UpdatePetRequest';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const petId = event.pathParameters.id;
    const updatePetRequest: UpdatePetRequest = JSON.parse(event.body);

    const petUpdated = await updatePet(petId, updatePetRequest);

    return {
        statusCode: 201,
        body: JSON.stringify(petUpdated)
    };
}