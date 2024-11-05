export const clientMsg = {
  err: {
    notValidCPF:
      'The CPF you provided is in the correct format, but it is not a valid CPF.',
    notValidCpfFormat:
      'Please provide the CPF in the correct format, including dots and hyphen (XXX.XXX.XXX-XX).',
    notValidCEP: 'The ZIP code you provided is not valid.',
    notValidCepFormat:
      'Please provide the ZIP code in the correct format, including a hyphen (XXXXX-XXX).',
    emailInUse:
      'The email provided is already in use for another customer. Please double-check the email or use a different one to complete the registration. If this is an error, please contact support.',
    invalidEmailFormat:
      'The email provided is not valid. Please enter a valid email address.',
    CPFinUse:
      'The CPF provided is already registered for a customer. Please verify the CPF or provide a different one to continue the registration process.',
    missingCpf: 'The CPF field is required and must be provided.',
    missingName: 'The Name (nome) field is required and must be provided.',
    missingEmail: 'The Email (email) field is required and must be provided.',
    missingCep: 'The CEP (cep) field is required and must be provided.',
    missingStreet: 'The Street (rua) field is required and must be provided.',
    missingNumber:
      'The Number (numero) field is required and must be provided.',
    missingNeighborhood:
      'The Neighborhood (bairro) field is required and must be provided.',
    missingCity: 'The City (cidade) field is required and must be provided.',
    missingState: 'The State (estado) field is required and must be provided.',
    cpfNotAString: 'The CPF field must be a valid string.',
    emailNotAString: 'The Email field must be a valid string.',
    nameNotAString: 'The Name field must be a valid string.',
    cepNotAString: 'The CEP field must be a valid string.',
    streetNotAString: 'The Street field (rua) must be a valid string.',
    neighborhoodNotAString:
      'The Neighborhood field (bairro) must be a valid string.',
    cityNotAString: 'The City field (cidade) must be a valid string.',
    stateNotAString: 'The State field (estado) must be a valid string.',
    numberNotANumber: 'The Number field (numero) must be a valid number',
    clientNotFound:
      'The ID provided does not belong to any customer registered in the system, please check the ID value and try again.',
    noClientsOnDb:
      'Customers not found. The system cannot return any customer lists as there are none registered in the system.',
  },
  success: {
    allFieldsProvided:
      'All necessary details for customer have been successfully provided. The customer is fully registered and ready to place orders.',
    onlyRequiredFieldsProvided:
      'Some non-mandatory fields were not provided. You can complete the registration now, but these details will need to be added later in order to place an order: ZIP Code, Street, Number, Neighborhood, City, and State.',
    clientUpdatedAllFields: 'All customer data has been updated successfully!',
    clientUpdatedButMissingFields:
      'All mandatory customer data has been updated successfully, however, customers will only be able to make purchases when all mandatory and non-mandatory fields have been updated.',
    clientUpdatedButSomeFieldsAreEmpty:
      'Some non-mandatory fields were not filled in. Remember that the customer will only be able to place orders when all customer information has been completed.',
    clientDetailHasEmptyFields:
      "Note that the customer detailed above has 'EMPTY' fields, the customer has all mandatory data but will only be able to place orders when all fields are filled in with their respective information.",
  },
};
