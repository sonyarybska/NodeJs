const {ApiError:{ApiError},messagesEnum,statusEnum} = require('../errors/');
const {avsS3:{PHOTOS_MIMETYPES,PHOTO_MAX_SIZE}}=require('../constans');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {avatar} = req.files;

            if (!avatar) {
                next();
                return;
            }
            const {name,size,mimetype}=avatar;

            if(!PHOTOS_MIMETYPES.includes(mimetype)){
                throw new ApiError(messagesEnum.NOT_SUPPORTED_FORMAT,statusEnum.BAD_REQUEST);
            }

            if(size>PHOTO_MAX_SIZE){
                throw new ApiError(messagesEnum.FILE_IS_TOO_BIG(name),statusEnum.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
