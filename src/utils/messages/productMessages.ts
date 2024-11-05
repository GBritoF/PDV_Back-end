export const pdtMessage = {
  err: {
    requiredDescription: 'Description is required and must be a text.',
    requiredStockQuantity:
      'Stock quantity is required and must be a valid number.',
    requiredValue: 'Value is required and must be a valid number.',
    requiredCategory: 'Category is required and must be a valid number.',
    requiredFieldsUp:
      'All required fields must be filled out to successfully update the product. Please ensure that you provide all necessary information. (Descrição, Quantidade Estoque, Valor, Categoria ID)',
    pdtCategoryNotFind:
      'The category you provided does not exist in our database. Please check the category list bellow and try again.',
    invalidStockQuantity:
      'The stock quantity (quantidade_estoque) must be a valid number and cannot be negative.',
    invalidValue:
      'The value (valor) must be a valid number and must be greater than zero.',
    invalidDescription: 'The description must be a valid text.',
    invalidCategoryValue: 'The category must be a valid number.',
    pdtAlreadyExistsWhenUpdate:
      'You are attempting to update a product with details that already exist in our database. Please consider editing or deleting the existing product, or provide a different description (descricao) for the new product.',
    pdtAlreadyExists:
      'You are attempting to register a product with details that already exist in our database. Please consider editing or deleting the existing product, or provide a different description (descricao) for the new product.',
    pdtNotFound:
      'Product not found. The provided ID does not match any existing products in the system.',
    paramNotProvided:
      "No parameter was provided. Please include the required 'id' parameter.",
    paramGivenUsrNotMatch:
      'The provided parameter does not match the logged-in user ID. You are only allowed to view your own products with your user id on this route. If you need to list products by their category or see all products registered in the system, there is a specific route for this.',
    usrPdtInvalidParam:
      'Invalid request: The user ID provided to find products must be a valid number. Please check your input and try again.',
    cannotDeleteProductLinkedToOrder:
      'The product cannot be deleted because it is linked to an active order.',
    insufficientStock:
      'The quantity ordered for the following product is not sufficient to support this order. Product ID: ',
  },
  success: {
    noPdtFoundInThisCategory:
      'Category found, but there are no products currently registered under this category.',
  },
};
