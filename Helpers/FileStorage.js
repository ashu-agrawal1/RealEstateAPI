import multer from 'multer';
import path from 'path';

const storageConf = (fname) => {
	return multer.diskStorage({
		destination: function (req, file, clb) {
			clb(null, fname);
		},
		filename: function (req, file, clb) {
			const uniquePrefix =
				Date.now() + '_' + Math.round(Math.random() * 1e9);
			clb(
				null,
				file.fieldname +
					'_' +
					uniquePrefix +
					path.extname(file.originalname)
			);
		},
	});
};

export default storageConf;
