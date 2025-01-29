export default `
    type Mutation {
        login(data: LoginDto!): AuthLoginResponse!
        register(data: RegisterDto!): AuthLoginResponse!
    }

    input LoginDto {
        email: String!
        password: String!
    }

    input RegisterDto {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        middleName: String
    }

    type AuthLoginResponse {
        jwt: String!
    }
`;