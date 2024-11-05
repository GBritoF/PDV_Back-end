import prisma from '../../config/prisma';
import supabase from '../../config/supabase';
import { serverMsg } from '../messages/serverMessages';
import { supaMsg } from '../messages/supabaseMessages';

export default async function deleteProductImg(
  productId: number,
  imageURL: string,
) {
  try {
    const imagePath = imageURL.split(
      '/storage/v1/object/public/pdvImg/pdvImg/',
    )[1];

    if (!imagePath) {
      throw new Error(supaMsg.err.invalidUrlFormat);
    }

    const { data, error: deleteError } = await supabase.storage
      .from('pdvImg')
      .remove([imagePath]);

    if (deleteError) {
      throw new Error(`${supaMsg.err.errDeleting} ${deleteError.message}`);
    }

    await prisma.produtos.update({
      where: { id: productId },
      data: {
        imagem_url: null,
      },
    });
  } catch (error) {
    return { status: 500, error: serverMsg.err.internalErr };
  }
}
