import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './components/organisms/AppNavigator';
import { logoImg } from './constants/images';
import store, { persistor } from './redux/store';
import palette from './styles/palette';

const App = () => {
  const colorScheme = useColorScheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <AnimatedSplash
      translucent
      isLoaded={isLoaded}
      logoImage={logoImg}
      backgroundColor={palette[colorScheme || 'light'].background}
      logoHeight={150}
      logoWidth={150}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </AnimatedSplash>
  );
};

export default App;
