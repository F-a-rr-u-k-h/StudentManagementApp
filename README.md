StudentManagementApp
A React Native application for managing student records, featuring a tab-based interface with Home, Add Student, and Settings screens, light/dark theme support, and SQLite storage. Built with TypeScript, React Navigation, and modern React Native components.
Features

Student Management: Add, view, and delete student records with details like name, email, and enrollment status.
Tab Navigation: Navigate between Home, Add Student, and Settings using a bottom tab bar.
Light/Dark Theme: Toggle between light and dark themes, persisted across app restarts.
Local Storage: Store student data and preferences using SQLite (react-native-sqlite-storage).
Responsive UI: Optimized for Android with a clean design using react-native-vector-icons.

Prerequisites

Node.js (v18 or higher)
React Native CLI
Android Studio with Android SDK
Java Development Kit (JDK) (v11 or higher)
A physical Android device or emulator

Getting Started
1. Clone the Repository
git clone https://github.com/F-a-rr-u-k-h/StudentManagementApp
cd StudentManagementApp

2. Install Dependencies
npm install

3. Link Native Modules
Link native dependencies for Android:
npx react-native link react-native-vector-icons
npx react-native link react-native-sqlite-storage
npx react-native link @react-native-async-storage/async-storage

4. Set Up Android

Ensure Android Studio is configured with an emulator or a connected device.
Update android/local.properties with your SDK path (if needed):sdk.dir=/path/to/your/android/sdk



5. Run the App
Start the Metro bundler:
npx react-native start

In a separate terminal, run the app on Android:
npx react-native run-android

6. Build APK (Optional)
To generate a release APK:
cd android
./gradlew assembleRelease

The APK will be in android/app/build/outputs/apk/release/.
Testing
The app includes unit and UI tests using Jest and React Native Testing Library.
Prerequisites

Install testing dependencies:npm install --save-dev jest @testing-library/react-native ts-jest @types/jest



Run Tests
npm test


Unit Tests: Test utility functions like countTotalStudents (src/utils/__tests__/studentUtils.test.ts).
UI Tests: Test HomeScreen rendering and behavior (src/screens/__tests__/HomeScreen.test.tsx).
App Tests: Verify App component rendering (__tests__/App.test.tsx).

Test Coverage

countTotalStudents: Tests empty arrays, single/multiple students, and null/undefined inputs.
HomeScreen: Tests student list display, empty state, and error handling.
App: Ensures the app renders without crashing.

Project Structure
StudentManagementApp/
├── src/
│   ├── context/          # ThemeContext for light/dark theme
│   ├── navigation/       # AppNavigator with tab navigation
│   ├── screens/          # HomeScreen, AddStudentScreen, SettingsScreen
│   ├── services/         # API and preferences (SQLite storage)
│   ├── types/            # TypeScript interfaces (e.g., Student)
│   ├── utils/            # Utility functions (e.g., countTotalStudents)
│   ├── __tests__/        # Jest test files
├── android/              # Android native code
├── __tests__/            # App-level tests
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation

Key Dependencies

react-native-sqlite-storage: For local student data storage.
@react-navigation/native: For tab navigation.
@react-navigation/bottom-tabs: For bottom tab bar.
react-native-vector-icons: For tab bar icons.
@react-native-async-storage/async-storage: For theme persistence.
react-native-toast-message: For error/success notifications.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please ensure your code follows the existing style, includes tests, and passes npm test.
Troubleshooting

Database Errors: Verify react-native-sqlite-storage is linked and SQLite is initialized in preferences.ts.
Test Failures: Check jest.config.js and ensure mocks are set up (e.g., react-native-sqlite-storage). Run npx jest --clearCache if issues persist.
Build Issues: Clear Gradle cache (cd android && ./gradlew clean) and rebuild.
Navigation Issues: Ensure @react-navigation/native and @react-navigation/bottom-tabs are correctly configured in AppNavigator.tsx.

For detailed issues, open a GitHub Issue with logs and steps to reproduce.
License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out via GitHub Issues or your-email@example.com.
