import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getPetById } from "../../service/petService";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const petId = event.pathParameters.id;
    const pets = await getPetById(petId);

    return {
        statusCode: 200,
        body: JSON.stringify(pets)
    };
}