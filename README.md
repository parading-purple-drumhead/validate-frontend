# Validate

## Description

Validate is a web application that empowers users to submit information for verification and authentication by the community. This platform leverages crowd wisdom to fact-check various claims, categorizing them by topics for easy navigation. The frontend is developed using React, providing a modern and intuitive user interface, while user authentication is facilitated through Google logins.

## How to Install and Run the Code

### Prerequisites
- Node.js: Ensure that Node.js is installed on your system. Download it from [nodejs.org](https://nodejs.org/).

### Installation Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/validate-fact-checking.git
   ```

2. Navigate to the project directory:

   ```bash
   cd validate-fact-checking
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a Google Developer Console project and obtain the OAuth 2.0 client ID. Update the `.env` file in the project root with your client ID:

   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   ```

5. Run the application:

   ```bash
   npm start
   ```

   This will start the development server. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the Validate platform.

**Note:** Ensure that the backend server is running and configured properly for full functionality. Refer to the backend documentation for further details.

---

Feel free to explore Validate, contribute to its development, and help enhance the fact-checking experience! If you encounter any issues or have suggestions, please open an issue on GitHub. Thank you for your interest and support!
