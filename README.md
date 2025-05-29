# Storabble QA Automation Assignment

## 📌 Project Objective

This project is a QA Automation assignment for the **Storabble** web application, focusing on validating the **Login functionality** using **Playwright** in **JavaScript**, structured with Page Object Model (POM) and Dockerized for easy execution.

The goal is to ensure:

- Functional validation of login form input
- Proper handling of error messages
- Password reset navigation
- Scalable and reusable test architecture
- Integration with Qase.io for test case management

## ✅ What Has Been Implemented

- ✅ 6 Manual test cases automated using Playwright
- ✅ Page Object Model (POM) structure
- ✅ Centralized test data (`loginData.js`)
- ✅ Error handling and assertions
- ✅ Precondition checks (e.g., cookie banner, login heading)
- ✅ Docker integration for isolated execution
- ✅ Qase.io integration via `playwright-qase-reporter`

## 🗂️ Project Structure

```
Storabble_qaassignment/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── playwright.config.js
├── fixtures/
│   └── loginData.js
├── pages/
│   └── LoginPage.js
├── specs/
│   └── login.spec.js
├── fixtures/
│   └── baseFixture.js
```

## ⚙️ Setup Instructions

### 1. 🔧 Prerequisites

- Docker installed (`docker --version`)
- Git installed
- (Optional) Node.js & Playwright installed for local runs

### 2. 🚀 Run the Tests Using Docker

```bash
# Clone the repo
git clone https://github.com/antonicnenad/storabble-qaassignment.git
cd storabble-qaassignment

# Start Docker and build image
docker compose build

# Run the tests
docker compose up
```

> 🔁 If Playwright version changes in the project, be sure to:

```bash
docker compose down --volumes --remove-orphans
docker compose build --no-cache
docker compose up
```

## 🧪 Available Test Scenarios

| Test Case ID | Description                                           |
| ------------ | ----------------------------------------------------- |
| STL-03       | Submit empty login form                               |
| STL-04       | Login with invalid email format                       |
| STL-05       | Login with unregistered email                         |
| STL-08       | Only email field filled                               |
| STL-09       | Only password field filled                            |
| STL-10       | Forgot password link navigates to reset password page |

## 🧩 Qase.io Integration (Optional)

This project is integrated with Qase.io via [playwright-qase-reporter](https://github.com/qase-tms/qase-javascript/tree/master/qase-playwright).

🔑 API Setup

1. Go to your Qase Project → Settings → API → Generate API Token
2. Set environment variable (optional):

```bash
export QASE_API_TOKEN=<your_token>
export QASE_PROJECT_CODE=STL
```

Or pass via command line when running tests:

```bash
QASE_API_TOKEN=<your_token> QASE_PROJECT_CODE=STL QASE_MODE=testops npx playwright test
```

🧩 Map Test Cases

Each test case uses qase.id() mapping:

```js
import { qase } from "playwright-qase-reporter";

test("STL-03: Submit empty login form", async () => {
  qase.id(3);
  ...
});
```

📈 View Results

After running tests, view detailed reports:
https://app.qase.io/run/STL

## 🧑‍💻 Run Tests Locally (Without Docker)

```bash
# Install dependencies
npm install

# Run Playwright tests
npx playwright test
```

> Tip: Use `npx playwright test --debug` to step through test interactively

## 👨‍🔧 Author

**Nenad Antonic**  
QA Automation Engineer | JavaScript + Playwright | POM + Docker + Qase  
GitHub: [@Nenad Antonic](https://github.com/antonicnenad)

## 📝 License

This project is intended solely for educational and evaluation purposes.
