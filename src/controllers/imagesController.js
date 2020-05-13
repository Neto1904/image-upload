import ImagesService from '../services/imagesService';

/**
 * Class to handle images related reqeuests
 */
class ImagesController {
  /**
     * Recieve image upload and insert asocciated information on the database
     * @param {Request} req
     * @param {Reponse} res
     */
  async upload(req, res) {
    try {
      console.log(req.file);
      const {lat, lng, date, idUser} = req.body;
      const {path} = req.file;
      const image = await ImagesService.insert(path, lat, lng, date, idUser);
      return res.status(200).json(image);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ImagesController();
