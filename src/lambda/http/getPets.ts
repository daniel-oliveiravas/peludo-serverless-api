import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getPetsByCondition } from "../../service/petService";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const condition = event.queryStringParameters && event.queryStringParameters.condition;

    if (!condition) {
        return {
            statusCode: 400,
            body: 'Condition param is required'
        };
    }
    const pets = await getPetsByCondition(condition);

    return {
        statusCode: 200,
        body: JSON.stringify(pets)
    };
}