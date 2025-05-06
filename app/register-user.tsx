import Button from '@/components/auth/Button';
import Loader from '@/components/Loader';
import { AuthContext } from '@/context/authContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function Signup() {
  const router = useRouter();
  const { signUp } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const [showLoader, setShowLoader] = useState(false);
  

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Use Firebase authentication for signup
      await signUp(email, password);
      setShowLoader(true); 
      setTimeout(() => {
        router.replace("/(protected)/(drawer)/(tabs)"); 
      }, 3000);
    } catch (error: any) {
      console.error(error);
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      
      // Clear error after a delay
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
    if (showLoader) return <Loader />;

  return (
    <View style={styles.container}>
     <View style={styles.headerContainer}>
         <Text style={styles.title}>SIGNUP</Text>
         <Text style={styles.heading}>Healthcare</Text>
       </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Id</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#5391B4" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#5391B4" style={styles.icon} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
            />
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          onPress={handleSignup}
          title={loading ? 'Signing Up...' : 'SIGN UP'}
          loading={loading}
          disabled={loading}
          buttonStyle={styles.buttonStyle}
        />
        
        <Text style={styles.registerText}>
          Already Have an Account :
          <Text style={styles.registerLink} onPress={() => router.push('/login')}> Click here to login</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    marginBottom: 50,
    fontWeight: '700',
    fontFamily: 'BalooThambi2-Medium',
    color: '#5391B4',
  },
  heading: {
    fontSize: 32,
    marginBottom: 40,
    fontFamily: 'BalooThambi2-Medium',
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5391B4',
    marginBottom: 5,
    alignSelf: 'flex-start',
    top: 15,
    left: 15,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontFamily: 'BalooThambi2-Regular',  
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5391B4',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    zIndex: 0,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  registerLink: {
    color: '#5391B4',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    width: "100%",
    marginTop: 10,
  }
});