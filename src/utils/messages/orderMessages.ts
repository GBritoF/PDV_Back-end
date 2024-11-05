export const orderMessages = {
  err: {
    missingClientID:
      'The customer ID (cliente_id) is required to register a new order. Please provide a customer ID to register the product correctly.',
    missingProductOnList:
      'To register an order for a customer, at least one product must be supplied with its respective ID and quantity required by the customer (produto_id, quantidade_produto).',
    clientIdNotANumber:
      'The customer ID (cliente_id) provided is not a valid value. Provide a non-negative number type ID. The value provided was: ',
    obsNotAStr:
      'The note (observacao) regarding the order must be provided in text format, please make sure to enter valid text.',
    productIdNotANumber:
      'The product ID (produto_id) provided must be a valid non-negative number to register an order correctly. The value provided was: ',
    quantityNotANumber:
      'The product quantity (quantidade_produto) provided to register the order is not a valid value. The value for this field must be a non-negative number. The value provided was: ',
    productOnOrderNotFound:
      'Product not found. The ID provided for at least one of the products does not correspond to any existing product in the system.',
    orderNotFoundOnClientID:
      'There are no orders registered for the customer ID (cliente_id) provided. Please check if the ID passed is an existing ID in the database.',
    noOrdersOnDb: 'No orders were found registered in the system.',
    clientDataMissingToPlaceOrders: `You are trying to register an order for a customer who has pending issues in their data, with only mandatory data (name, email, social security number); To register an order for a customer, their details must be complete in the system. Please fill in your customer details to register your order.`,
  },
};
