// emails/signup.tsx

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
  subject: string;
  intro: string;
  body?: string;
  [key: string]: any;
};

// --- Helper function to safely render values ---
const renderValue = (value: any) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }
  if (value === null || value === undefined) {
    return '';
  }
  // For arrays, objects, booleans, etc., safely convert to a string
  return JSON.stringify(value);
};

const SignupEmail = (data: Prop) => {
  const { subject, intro, ...others } = data;

  const entries = Object.entries(others);

  return (
    <Html>
      <Tailwind>
        <Heading className="text-center text-xl font-bold">{subject}</Heading>
        <Container className="w-full border border-gray-400 p-4 py-8 rounded-md">
          <Text className="py-4 text-lg">{intro}</Text>
          {entries.length > 0 && (
            <>
              <hr className="border-gray-300 my-4" />
              {entries.map(([key, value], index) => (
                <Row className="flex items-start" key={index}>
                  <Column className="px-4 py-2 font-extrabold capitalize">
                    {key.replace(/_/g, ' ')}:
                  </Column>
                  <Column className="px-4 py-2 text-start">
                    {/* Use the safe render function */}
                    {renderValue(value)}
                  </Column>
                </Row>
              ))}
            </>
          )}
        </Container>
        <Text className="text-center text-sm text-gray-500 mt-4">
          Sent via Royoltech Mail Service
        </Text>
      </Tailwind>
    </Html>
  );
};

export default SignupEmail;