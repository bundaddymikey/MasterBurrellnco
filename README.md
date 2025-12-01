# Burrell & Co. Mobile Detailing

A premium, responsive landing page for a mobile car detailing service.

## Features

- **Modern Design**: Built with React and Tailwind CSS (via CDN for rapid prototyping).
- **Animations**: Smooth transitions using Framer Motion.
- **Booking System**: Integrated booking form that generates a pre-filled email to the business owner.
- **AI Assistant**: Chatbot powered by Google Gemini to answer customer questions (requires API key).
- **Responsive**: Fully optimized for mobile and desktop.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the root directory and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

To deploy to production (e.g., Vercel, Netlify):

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  Upload the `dist` folder.

## Note on Styling

This project currently uses Tailwind CSS via CDN in `index.html` for simplicity and speed. For a large-scale production app, it is recommended to migrate to a standard PostCSS build setup.

## Note on Booking

The booking form currently uses a `mailto` link to send data directly to `Shawn@Burrellnco.com`. This ensures no backend infrastructure is required to receive requests.
