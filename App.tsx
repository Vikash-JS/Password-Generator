import {CheckBox, Slider} from '@rneui/themed';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface CheckBoxProps {
  checked: boolean;
  setChecked: () => void;
  title: string;
}

const CheckboxComp = ({checked, setChecked, title}: CheckBoxProps) => {
  return (
    <>
      <CheckBox
        size={20}
        checkedColor="green"
        title={title}
        checked={checked}
        onPress={setChecked}
        textStyle={{color: 'white'}}
        wrapperStyle={{backgroundColor: '#454545'}}
        containerStyle={{backgroundColor: '#454545'}}
      />
    </>
  );
};

const generatePassword = (
  length,
  useUppercase,
  useLowercase,
  useNumbers,
  useSymbols,
) => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let characters = '';
  if (useLowercase) characters += lowercaseChars;
  if (useUppercase) characters += uppercaseChars;
  if (useNumbers) characters += numberChars;
  if (useSymbols) characters += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
};

const strengthIcons = {
  Low: 'exclamation-circle',
  Medium: 'check-circle',
  High: 'star',
};

const getPasswordStrength = password => {
  if (password.length < 8) {
    return 'Low';
  } else if (password.length < 12) {
    return 'Medium';
  } else {
    return 'High';
  }
};

const App = () => {
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [slider, setSlider] = useState(10);
  const [pass, setPass] = useState('');

  const onGeneratePassword = () => {
    const password = generatePassword(
      slider,
      uppercase,
      lowercase,
      numbers,
      symbols,
    );
    console.log(password);
    setPass(password);
  };

  const copyToClip = () => {
    if (pass.length) {
      Clipboard.setString(pass);
    }
  };

  const passwordStrength = getPasswordStrength(pass);
  const strengthIconName = strengthIcons[passwordStrength];

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: 'white',
            letterSpacing: 1.1,
            fontSize: 18,
            opacity: 0.6,
            marginVertical: 20,
          }}>
          Password Generator
        </Text>
      </View>
      <View style={styles.passBox}>
        <Text style={{color: 'white', fontSize: 22}}>{pass}</Text>
        <Icon onPress={copyToClip} name="copy" color="#98EECC" size={23} />
      </View>
      <View
        style={{
          backgroundColor: '#454545',
        }}>
        <View style={{padding: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>
              Character Length
            </Text>
            <Text style={{color: '#98EECC', fontSize: 32, fontWeight: '700'}}>
              {Math.floor(slider)}
            </Text>
          </View>
          <Slider
            thumbStyle={{backgroundColor: 'white', height: 30, width: 30}}
            minimumValue={0}
            maximumValue={30}
            value={slider}
            onValueChange={value => setSlider(value)}
            maximumTrackTintColor="black"
            minimumTrackTintColor="#98EECC"
          />
          <View>
            <CheckboxComp
              checked={uppercase}
              setChecked={() => setUppercase(!uppercase)}
              title="Include Uppercase Letters"
            />
            <CheckboxComp
              checked={lowercase}
              setChecked={() => setLowerCase(!lowercase)}
              title="Include Lowercase Letters"
            />
            <CheckboxComp
              checked={numbers}
              setChecked={() => setNumbers(!numbers)}
              title="Include Numbers"
            />
            <CheckboxComp
              checked={symbols}
              setChecked={() => setSymbols(!symbols)}
              title="Include Symbols"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'grey',
              padding: 10,
            }}>
            <Text style={{fontSize: 18, color: 'white', opacity: 0.5}}>
              STRENGTH
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{color: 'white', fontSize: 18, marginHorizontal: 10}}>
                {passwordStrength}
              </Text>
              <FontAwesomeIcon
                name={strengthIconName}
                size={20}
                color="green" // You can customize the color
              />
            </View>
          </View>
        </View>
        <Pressable onPress={onGeneratePassword} style={styles.button}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            GENERATE
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#98EECC',
    height: 50,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  passBox: {
    height: 60,
    width: 340,
    backgroundColor: '#454545',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default App;
