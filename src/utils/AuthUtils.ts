import { APIGatewayProxyEvent } from "aws-lambda";
import { decode } from 'jsonwebtoken'
import { JwtPayload } from './JwtPayload';

export const getUserId = (event: APIGatewayProxyEvent): string => {
    const authorization = event.headers.Authorization;

    if (authorization) {
        const split = authorization.split(' ');
        const jwtToken = split[1];
        return parseUserId(jwtToken);
    }

    return '';
}

const parseUserId = (jwtToken: string): string => {
    const decodedJwt = decode(jwtToken) as JwtPayload
    return decodedJwt.sub;
};