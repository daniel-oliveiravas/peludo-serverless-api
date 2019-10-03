import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { deletePetById } from "../../service/petService";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const petId = event.pathParameters.id;
    await deletePetById(petId);

    return {
        statusCode: 200,
        body: ''
    }
}