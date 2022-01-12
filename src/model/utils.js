
//remove space and swap to lowercase
export const convertTestName = testName => {
    if (typeof testName !== 'string') return testName;
    else {
        testName.trim().toLowerCase();
        /*not support for old js version
        if (testName.length > 1)
            testName.replaceAll(/[ ]+/g, '_');*/
        return testName;
    }
};

export const validText = text => {
    return /^[a-zA-z0-9(),-:/! ]*$/.test(text);
};

export const validNum = num => {
    return /^[0-9.]*$/.test(num);
};
