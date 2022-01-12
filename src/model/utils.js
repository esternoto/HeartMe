
//remove space and swap to lowercase
export const convertTestName = testName => {
    return testName.trim().toLowerCase().replaceAll(/[ ]+/gi, '_');
};

export const validText = text => {
    return /^[a-zA-z0-9(),-:/! ]*$/.test(text);
};

export const validNum = num => {
    return /^[0-9.]*$/.test(num);
};
