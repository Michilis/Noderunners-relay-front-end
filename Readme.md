# Noderunners Relay

Noderunners Relay is a web application that provides access to the Noderunners relay service. This application allows users to purchase access plans and manage their whitelist status using the Nostr protocol.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login using Nostr protocol.
- **Payment Processing**: Integration with LNbits and BTCPay for handling payments.
- **Whitelist Management**: Automatically manage user access based on payment status.
- **Responsive Design**: Built with Tailwind CSS and Lucide React for a modern UI.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/noderunners-relay.git
   cd noderunners-relay
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in the required values.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Start the production server**:
   ```bash
   npm start
   ```

## Configuration

The application requires several environment variables to be set. These are defined in the `.env` file:
