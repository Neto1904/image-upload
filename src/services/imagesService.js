import database from '../config/database';

/**
 * Class to handle image related queryss
 */
class ImagesService {
  /**
     * Query to insert a new image reference on the database.
     * This method does not store the image itself, but only
     * a path that is used to acces the image on the server
     * @param {string} path
     * @param {number} lat
     * @param {number} lng
     * @param {Date} date
     * @param {number} idUser
     */
  async insert(path, lat, lng, date, idUser) {
    const sql = `insert into images(path, coordinates, date, id_user) values($1, 
                        st_transform(st_setsrid(st_makepoint($2, $3), 4326), 4326), $4, $5)`;
    const {rows: image} = await database.query(sql, [path, lng, lat, date, idUser]);
    console.log(image);
    return image;
  }
}

export default new ImagesService();
