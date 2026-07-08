import { Module } from 'module';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

const TEST_EMAIL_DOMAIN = 'pedeaqui-test.local';
const { faker } = (Module as any)._load('@faker-js/faker/locale/pt_BR', module, false);

const buildCpf = (base: string): string => {
  const digit1 = cpfValidator.verifierDigit(base).toString();
  const digit2 = cpfValidator.verifierDigit(`${base}${digit1}`).toString();
  return `${base}${digit1}${digit2}`;
};

const buildNumericCnpj = (base: string): string => {
  const digit1 = cnpjValidator.verifierDigit(base).toString();
  const digit2 = cnpjValidator.verifierDigit(`${base}${digit1}`).toString();
  return `${base}${digit1}${digit2}`;
};

export function makeTestEmail(): string {
  const uniqueId = `${Date.now()}-${faker.string.alphanumeric({ length: 10, casing: 'lower' })}`;
  return `test-${uniqueId}@${TEST_EMAIL_DOMAIN}`;
}

export function makeTestCPF(): string {
  for (let attempt = 0; attempt < 10; attempt++) {
    const cpf = buildCpf(faker.string.numeric({ length: 9, allowLeadingZeros: false }));
    if (cpfValidator.isValid(cpf)) {
      return cpf;
    }
  }

  return cpfValidator.generate();
}

export function makeTestCNPJ(): string {
  for (let attempt = 0; attempt < 10; attempt++) {
    const cnpj = buildNumericCnpj(`${faker.string.numeric({ length: 8, allowLeadingZeros: false })}0001`);
    if (/^\d{14}$/.test(cnpj) && cnpjValidator.isValid(cnpj, true)) {
      return cnpj;
    }
  }

  return '33683111000107';
}

export function makeTestPhone(): string {
  return `11${faker.string.numeric({ length: 9, allowLeadingZeros: false })}`;
}

export function makeTestStoreSlug(prefix = 'loja-teste'): string {
  return `${prefix}-${Date.now()}-${faker.string.alphanumeric({ length: 6, casing: 'lower' })}`;
}

export function makeTestProfileName(): string {
  return faker.person.fullName();
}

export function makeTestStoreName(): string {
  return faker.company.name();
}

export function makeTestAddress(): string {
  return `${faker.location.street()}, ${faker.location.buildingNumber()}`;
}

export function makeTestProductName(): string {
  return faker.commerce.productName();
}

export function makeTestProductDescription(): string {
  return faker.commerce.productDescription();
}

export function makeTestPriceCents(): number {
  return faker.number.int({ min: 1000, max: 9900 });
}
