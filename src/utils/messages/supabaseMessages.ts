export const supaMsg = {
  err: {
    invalidUrlFormat: 'Invalid image URL format.',
    errDeleting: 'Error deleting image from Supabase:',
    imgUpFailedServer:
      'Unable to upload the image due to a server error. Please try again later. If the problem persists, please contact our support system.',
    nullImgFailed:
      'Unable to set the image to null in the database due to an internal error. Please try again later. If the problem persists, please contact our support system.',
    imgUpFailedDb:
      'There was a problem updating the image URL in the database. Please try again later. If the problem persists, please contact our support system.',
  },
  success: {
    pdtImgUploaded:
      'Product image has been successfully updated. Here is the new image URL.',
    pdtImgUpdatedNull:
      'Product image has been successfully updated, but no new image was provided. The image is now set to null.',
  },
};
