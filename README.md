# Moovie

This is a decentralized video streaming platform built using React for the frontend and Arweave for storing videos and user data. This platform allows users to upload, view, and share videos in a decentralized and censorship-resistant manner.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Decentralized Storage:** Videos and user data are stored on the Arweave network, ensuring data immutability and availability.
- **User Authentication:** Users can create accounts and log in securely using decentralized identity solutions.
- **Video Upload:** Users can upload videos to the platform, which are stored on Arweave.
- **Video Streaming:** Stream videos directly from the Arweave blockchain.
- **User Profiles:** Users can create and customize their profiles.
- **Video Sharing:** Share videos with other users and on social media.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or higher)
- NPM (Node Package Manager) or Yarn installed
- An Arweave wallet to interact with the Arweave blockchain

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/decentralized-video-streaming.git
   ```

2. Navigate to the project directory:

   ```bash
   cd decentralized-video-streaming
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up your Arweave wallet by adding your wallet file (JSON) to the project directory.

5. Configure the environment variables by creating a `.env` file in the root directory of the project. Add the following variables:

   ```env
   REACT_APP_ARWEAVE_API_URL=<Arweave API URL>
   REACT_APP_ARWEAVE_UPLOAD_PRICE=<Arweave upload price>
   REACT_APP_ARWEAVE_UPLOAD_TYPE=<Arweave upload type>
   ```

   Replace `<Arweave API URL>`, `<Arweave upload price>`, and `<Arweave upload type>` with the appropriate values.

6. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

   The application should now be running locally at `http://localhost:3000`.

## Usage

1. Create an account or log in.
2. Upload videos to the platform.
3. View and stream videos from the platform.
4. Customize your user profile.
5. Share videos with others.

## Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md) to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
