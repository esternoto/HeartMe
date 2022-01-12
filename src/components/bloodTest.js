import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard
} from 'react-native';

import {convertTestName, validText, validNum} from '../model/utils';
import {getTestData, findSimilarTest} from '../model/dataController';
import {styles} from '../theme/styles/style';


export const BloodTest = () => {
  const [text, setText] = React.useState('');
  const [unsupportedText, setUnsupportedText] = React.useState(false);
  const [unsupportedNum, setUnsupportedNum] = React.useState(false);
  const [num, setNum] = React.useState('');
  const [testName, setTestName] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [res, setRes] = React.useState(null);

  //initial with test data only once
   React.useEffect(() => {
    async function fetchData() {
      if (!data) {
        const testData = await getTestData();
        setData(testData);
      }
    }
    fetchData();
  },[]);

  //determine render the validation error and disable/enable button
  const validation = (_text, _num) => {
    _text = _text.trim();
    let flag = false;
    if (_text !== '' && !validText(_text)) {
      setUnsupportedText(true);
      flag = true;
    }
    _num = num.trim();
    if (_num !== '' && !validNum(_num)) {
      setUnsupportedNum(true);
      flag = true;
    }

    if (flag || _text === '' || _num === '' ) {
      setTestName('');
      setDisableButton(true);
    } else {
      setUnsupportedText(false);
      setUnsupportedNum(false);
      setDisableButton(false);
      setTestName(convertTestName(_text));
    }
  };

  const onPress = async () => {
    //init the result as empty
    Keyboard.dismiss();
    console.log(res);
    //if not found the correct test, try find similar one
    let _testName = testName;
    if (!data[_testName]) {
      _testName = findSimilarTest(data, _testName);
      setTestName(_testName);
      console.log(testName);
    }

    //calculate result
    if (data[_testName]) {
      if (parseInt(num) < data[_testName].val) {
        setRes({name: data[_testName].name, val: 1});
      } else {
        setRes({name: data[_testName].name, val: -1});
      }
    } else {
      setRes({name: data.noresult.name, val: 0});
    }

  };

  return (
      <ScrollView
          style={{minHeight:560}}
          contentContainerStyle={{flexGrow:1}}
          keyboardShouldPersistTaps={'handled'}
      >
    <SafeAreaView style={{marginTop:20, backgroundColor: "#fff"}}>
      <Text style={styles.title}> Am I OK? </Text>
      <TextInput
        style={styles.input}
        onChangeText={_text => {
          setText(_text);
          validation(_text, num);
        }}
        value={text}
        placeholder="Please enter the test name"
      />
      { unsupportedText &&
          <Text style={styles.error}>Invalid characters</Text>
      }
      <TextInput
        style={styles.input}
        onChangeText={_num => {
          setNum(_num);
          validation(text, _num);
        }}
        value={num}
        placeholder="Please enter the result number"
        keyboardType="numeric"
      />
      { unsupportedNum &&
      <Text style={styles.error}>Invalid number</Text>
      }
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 14}}>
        <TouchableOpacity
          style={styles.button}
          disabled={disableButton}
          onPress={() => onPress()}>
          <Text
            style={{
              ...styles.buttonText,
              color: disableButton ? '#999999' : '#ffffff',
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {res && (
        <View
          style={{
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <Text style={{textAlign: 'center'}}>
            {' '}
            {res.name + ': '}{' '}
            <Text style={{color: res.val === 1 ? 'green' : 'orange'}}>
              {' '}
              {res.val === 1 ? 'GOOD' : res.val === -1 ? 'BAD' : 'UNKNOWN'}{' '}
            </Text>
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            {res.val === 1 && (
              <Image
                source={require('../theme/images/good.png')}
                style={styles.goodImage}
              />
            )}
            {res.val === -1 && (
              <Image
                source={require('../theme/images/bad.jpeg')}
                style={styles.badImage}
              />
            )}
            {res.val === 0 && (
              <Image
                source={require('../theme/images/unkonwn.jpeg')}
                style={styles.unknownImage}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
      </ScrollView>
  );
};

