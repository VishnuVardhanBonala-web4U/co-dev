/* export const users = [
    {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    },
    {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'johnpassword'
    }
]; */

export const signupInputs = [
    {
        type: "text",
        placeholder: "Enter your name",
        name: "username",
        label: "Name",
        required: true,
    },
    {
        type: "email",
        placeholder: "Enter your email",
        name: "email",
        label: "Email",
        required: true,
    },
    {
        type: "password",
        placeholder: "Enter your password",
        name: "password",
        label: "Password",
        required: true,
    },
];

export const signinInputs = [
    {
        type: "email",
        placeholder: "Enter your email",
        name: "email",
        label: "Email",
        required: true,
    },
    {
        type: "password",
        placeholder: "Enter your password",
        name: "password",
        label: "Password",
        required: true,
    },
];
