import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials";

const handler = NextAuth({
providers:[
    CredentialProvider({
        name:"credential",
        credentials:{
            email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password", placeholder: "*********" },
        },
        async authorize(credentials, req) {
            console.log(credentials);
            
            return null
        },
       
    })
]
})

export { handler as GET, handler as POST }