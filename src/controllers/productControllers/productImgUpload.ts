import { Response } from 'express';
import { imgUp } from '../../utils/helpers/imgUpload';
import supabase from '../../config/supabase';
import TRequestUserID from '../../types/TRequest';
import { supaMsg } from '../../utils/messages/supabaseMessages';
import Product from '../../models/product';
import deleteProductImg from '../../utils/helpers/productImgDelete';

export default class productImg {
  async upload(req: TRequestUserID, res: Response) {
    const img = req.file;
    const { id } = req.params;
    try {
      if (img) {
        const uploadedImage = await imgUp(
          `productImg/${img!.originalname}`,
          img!.buffer,
          img!.mimetype,
        );

        if (!uploadedImage) {
          return res.status(500).json({
            message: supaMsg.err.imgUpFailedServer,
          });
        }

        const imageExists = await Product.findProductImg(Number(id));

        if (imageExists) {
          const deleteImgAndURL = await deleteProductImg(
            Number(id),
            imageExists,
          );
        }

        const { data } = supabase.storage
          .from('pdvImg')
          .getPublicUrl(uploadedImage.fullPath);

        const insertImgOnDb = await Product.insertImgOnDb(
          Number(id),
          data.publicUrl,
        );

        if (!insertImgOnDb) {
          return res.status(500).json({
            message: supaMsg.err.imgUpFailedDb,
          });
        }

        return res.status(201).json({
          mensagem: supaMsg.success.pdtImgUploaded,
          upload: data.publicUrl,
        });
      }
      const imageExistsToNull = await Product.findProductImg(Number(id));

      if (imageExistsToNull) {
        const deleteImgAndURL = await deleteProductImg(
          Number(id),
          imageExistsToNull,
        );
      }

      const nullProductImg = Product.nullPdtImg(Number(id));

      if (!nullProductImg) {
        return res.status(500).json({
          message: supaMsg.err.nullImgFailed,
        });
      }

      return res.status(201).json({
        message: supaMsg.success.pdtImgUpdatedNull,
        upload: null,
      });
    } catch (error) {
      const erro = error as Error;
      return res.status(500).json({ message: erro.message });
    }
  }
}
