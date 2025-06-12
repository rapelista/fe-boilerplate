'use client';

import {
  Center,
  createPolymorphicComponent,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { IMaskInput } from 'react-imask';

interface PhoneNumberInputProps extends TextInputProps {
  withCountryCode?: boolean;
}

const PolymorphicPhoneNumberInput = createPolymorphicComponent<
  'input',
  TextInputProps
>(TextInput);

export function PhoneNumberInput({
  withCountryCode = true,
  ...props
}: PhoneNumberInputProps) {
  return (
    <PolymorphicPhoneNumberInput
      {...props}
      component={IMaskInput}
      leftSection={
        withCountryCode ? (
          <Center fz={14} h="100%" px="xs" w="100%">
            <span>+62</span>
          </Center>
        ) : (
          props.leftSection
        )
      }
      mask={[
        {
          mask: '000-0000-0000', // untuk 12 digit (misal HP panjang)
        },
        {
          mask: '000-000-0000', // untuk 11 digit
        },
        {
          mask: '000-0000-000', // untuk 11 digit dengan variasi lain
        },
        {
          mask: '0000-0000-000', // untuk rumah dengan kode area panjang
        },
        {
          mask: '0000-000-000', // contoh lain
        },
        {
          mask: '000-0000-0000-0', // untuk nomor internasional atau panjang
        },
      ]}
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
