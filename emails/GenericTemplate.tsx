// emails/GenericTemplate.tsx

import {
  Column,
  Container,
  Heading,
  Html,
  Row,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// The props for our new generic template
export interface GenericTemplateProps {
  subject: string;
  intro: string;
  // This allows any other string/number key-value pairs
  [key: string]: any;
}

// Helper function to safely render any value type
const renderValue = (value: any): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  if (value === null || value === undefined) {
    return '';
  }
  // Safely convert complex types (objects, arrays, booleans) to a string
  return JSON.stringify(value, null, 2); // Using JSON.stringify with formatting
};

const GenericTemplate = (props: GenericTemplateProps) => {
  // Destructure the known props and gather the rest into 'others'
  const { subject, intro, ...others } = props;

  // Filter out any non-string/number values that might have slipped through
  const entries = Object.entries(others);

  return (
    <Html>
      <Tailwind>
        <Heading className="text-center text-xl font-bold">{subject}</Heading>
        <Container className="w-full border border-gray-400 p-4 py-8 rounded-md">
          <Text className="py-4 text-lg">{intro}</Text>
          
          {/* Render the key-value pairs only if there are any */}
          {entries.length > 0 && (
            <>
              <hr className="border-gray-300 my-4" />
              {entries.map(([key, value]) => (
                <Row className="flex items-start" key={key}>
                  <Column className="px-4 py-2 font-extrabold capitalize w-[30%]">
                    {key.replace(/_/g, ' ')}:
                  </Column>
                  <Column className="px-4 py-2 text-start">
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

export default GenericTemplate;