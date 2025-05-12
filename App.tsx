import React, { useEffect } from 'react';
import { initPreferences } from './src/services/preferences';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './src/context/ThemeContext';

const App: React.FC = () => {
  useEffect(() => {
    initPreferences();
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator />
      <Toast />
    </ThemeProvider>
  );
};

export default App;