import {convertTestName} from './utils';
import {findBestMatch} from 'string-similarity';

export const getTestData = async () => {
    let testArr = [];
    try {
        const response = await fetch(
            'https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json',
        );
        const json = await response.json();
        if (json.bloodTestConfig) {
            json.bloodTestConfig.forEach(test => {
                if (test && test.name && test.threshold) {
                    const testName = convertTestName(test.name);
                    testArr[testName] = [];
                    testArr[testName].key = testName;
                    testArr[testName].name = test.name;
                    testArr[testName].val = test.threshold;
                }
            });
        } else {
            console.log('No have data');
        }
        testArr.noresult = [];
        testArr.noresult.name = 'Not Recognition test';
        testArr.noresult.val = 0;

        console.log(testArr);
        return testArr;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const findSimilarTest = (data, testName) => {
    const arrKeys = Object.keys(data);

    //remove noresult key
    arrKeys.pop();
    //find the best match and check if it with more then 50% match
    let matches = findBestMatch(testName, arrKeys);

    if (matches.bestMatch.rating > 0.5){
        return matches.bestMatch.target;
    }else return "";
};

