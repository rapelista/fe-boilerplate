'use client';

import { Center, TextInput, TextInputProps } from '@mantine/core';

interface PhoneNumberInputProps extends TextInputProps {
  withCountryCode?: boolean;
}

export function PhoneNumberInput({
  withCountryCode = true,
  ...props
}: PhoneNumberInputProps) {
  return (
    <TextInput
      {...props}
      leftSection={
        withCountryCode ? (
          <Center fz={14} h="100%" px="xs" w="100%">
            <span>+62</span>
          </Center>
        ) : (
          props.leftSection
        )
      }
      styles={{
        input: {
          minHeight: 40,
          height: 40,
        },
      }}
      type="tel"
    />
  );
}
