# calorie-tracker-ios


### Project Name: Caloria

### Overview:
Caloria is an iOS application designed to help users track their daily calorie allowance based on a specific diet plan. The app allows users to either "spend" or "save" a daily allowance of 150 free calories. Unused calories can be accumulated over time, with a maximum accumulation period of 10 days.

### Key Features:
1. **Daily Calorie Tracking**: Track the daily intake and saving of 150 free calories.
2. **Calorie Usage Entry**: Users can mark calories as used and enter details on what they were spent on.
3. **Calorie Saving Feature**: If calories are not used, they are automatically added to an accumulated balance.
4. **Accumulation Cap**: The app should cap the calorie accumulation at 10 days worth of calories (1500 calories).
5. **History View**: Display a history of daily calorie usage and savings.
6. **Data Persistence**: Store user data locally to keep track of calorie intake over time.

### Technical Specifications:
- **Platform**: iOS 15+
- **Languages**: Swift 5
- **UI Toolkit**: SwiftUI
- **Data Management**: Core Data for local data storage
- **Architecture**: MVVM (Model-View-ViewModel) for a clean separation of concerns and better manageability.

### Data Model:
Entity: **Caloria**
Attributes:
- **date** (Date): The date for the calorie entry.
- **caloriesUsed** (Boolean): Flag to indicate if the calories were used or saved.
- **details** (String, optional): Description of what the calories were spent on (only if used).
- **accumulatedCalories** (Int): Total accumulated calories (updated only if saved).

### User Interface:
1. **Home View**:
    - **Date Display**: Shows the current date.
    - **Calorie Status Toggle**: Switch to mark calories as used or saved.
    - **Details Input Field**: Appears if calories are marked as used; users can enter what they were spent on.
    - **Accumulated Calories Display**: Shows the total accumulated calories if not used.
    - **Save Button**: To save the day’s calorie data.

2. **History View**:
    - List or calendar view of past entries.
    - Each entry shows the date, status (used/saved), and details if used.

### Development Milestones:
1. **Setup and Project Configuration**:
    - Initialize the project in Xcode with Swift and SwiftUI.
    - Enable Core Data for local storage.
    - Setup the initial project structure following MVVM principles.

2. **Core Data Model Setup**:
    - Define the Core Data entity and attributes as per the specification.
    - Generate NSManagedObject subclasses.

3. **UI Development**:
    - Develop the Home View using SwiftUI.
    - Implement the History View for tracking past calorie data.

4. **Data Integration**:
    - Integrate Core Data into SwiftUI views.
    - Implement the logic for adding, updating, and retrieving calorie data.

5. **Testing**:
    - Perform unit tests to ensure the business logic is correct.
    - UI tests to ensure the app behaves as expected across different devices.

6. **Deployment Preparation**:
    - Ensure all assets comply with Apple’s guidelines.
    - Prepare metadata and screenshots for submission to the App Store.

7. **Launch**:
    - Submit the app for review.
    - Address any feedback from Apple and prepare for launch.

### Best Practices:
- **Code Quality**: Ensure the code is clean, well-commented, and adheres to current Swift best practices.
- **Security**: Implement appropriate data handling and storage practices to ensure user privacy.
- **Accessibility**: Make the app accessible to a broad audience, including support for dynamic text sizes and VoiceOver.
- **Localization**: Prepare the app’s interface to be localized into multiple languages in the future if needed.

### Documentation:
Provide detailed documentation on the project structure, data model, and any third-party libraries used. Include setup instructions and a comprehensive guide on how the app operates.

---

This document outlines everything your developer will need to start building the "Caloria" app comprehensively. If there are additional specific features or design elements you want to include, you can add those details to the overview or technical specifications sections.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/calorie-tracker-ios.git
cd calorie-tracker-ios
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
