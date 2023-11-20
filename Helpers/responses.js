export const res200 = (res, result = null) => {
	res.send(result);
};

export const res500 = (res) => {
	res.status(500).send('Something is broke!');
};

export const res400 = (res, msg = null) => {
	res.status(400).send(msg);
};

export const res409 = (res) => {
	res.status(409).send('Already Exist');
};

export const res404 = (res) => {
	res.status(404).send('Page Not Found');
};

export const invalidValue = (result, maping = null) => {
	if (maping != null) {
		let str =
			maping[result?.errors[0]?.path] !== undefined
				? maping[result?.errors[0]?.path]
				: result.errors[0].path;
		return str + ' has ' + result?.errors[0]?.msg;
	} else {
		return result?.errors[0]?.path + ' has ' + result.errors[0].msg;
	}
};

export const invalidValueMessage = (result, maping) => {
	let errors = '';
	if (result?.errors?.length >= 1) {
		result?.errors.map((err) => {
			if (!errors.includes(err.msg)) {
				errors += err.msg + '\n';
			}
		});
		return errors;
	} else {
		return result?.errors[0]?.msg;
	}
};
