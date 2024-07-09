import {
  Column,
  Container,
  Heading,
  Html,
  Row,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type Prop = {
  subject:string,
  intro:string,
  body?:string,
  [key:string]:any
}


const SignupEmail  = (data:Prop) => {
  const { subject, intro, ...others } = data;

  const entries = Object.entries(others);

  
  return (
    <Html>
      <Tailwind>
        <Heading className="text-center text-xl font-bold">{subject}</Heading>
        <Container className="w-full border border-gray-400  p-4 py-8  rounded-md">
          <Text className="py-4 text-lg">{intro}</Text>
          {entries.map(([key, value], index) => (
            <Row className="flex items-start" key={index}>
              <Column className="px-4 py-2 font-extrabold">{" "}{key}:</Column>
              <Column className="px-4 py-2  text-start">
                {value}
              </Column>
            </Row>
          ))}
        </Container>
      </Tailwind>
    </Html>
  );
};

export default SignupEmail;
