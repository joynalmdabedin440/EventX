# EventX - Next-Level Event Management Platform

![EventX Banner](https://img.shields.io/badge/EventX-Event%20Management-blue?style=for-the-badge&logo=eventbrite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)
![Convex](https://img.shields.io/badge/Convex-1.31.7-orange?style=flat&logo=convex)
![Clerk](https://img.shields.io/badge/Clerk-6.37.1-red?style=flat&logo=clerk)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)

A modern, full-stack event management platform built with Next.js, Convex, and Clerk. EventX empowers organizers to create stunning events and attendees to discover and register for amazing experiences.

**🔗 Live Demo:** [https://event-x-gamma.vercel.app/](https://event-x-gamma.vercel.app/)

## 🌟 Features

### For Event Organizers
- **AI-Powered Event Creation**: Generate event details using Google Generative AI
- **Comprehensive Dashboard**: Track registrations, manage attendees, and monitor event performance
- **QR Code Check-in System**: Seamless attendee verification with QR codes
- **Flexible Ticketing**: Support for free and paid events with capacity management
- **Custom Branding**: Theme colors and cover images for personalized events
- **Real-time Analytics**: Live registration counts and attendee management

### For Attendees
- **Event Discovery**: Browse events by location, category, and popularity
- **Easy Registration**: One-click registration with email confirmation
- **Digital Tickets**: QR code-based entry system
- **Personal Dashboard**: Track registered events and check-in status

### Platform Features
- **Authentication**: Secure user management with Clerk
- **Real-time Database**: Powered by Convex for instant updates
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Location Services**: City and state-based event filtering
- **Search & Categories**: Advanced event discovery tools

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.0, Shadcn
- **Component Library**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Themes**: next-themes

### Backend & Database
- **Backend-as-a-Service**: Convex
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI
- **QR Code Generation**: react-qr-code
- **QR Code Scanning**: html5-qrcode

### Development Tools
- **Linting**: ESLint
- **Package Manager**: npm
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
eventx/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (main)/                   # Protected user pages
│   │   ├── create-event/         # Event creation
│   │   ├── my-events/            # Organizer dashboard
│   │   └── dashboard/            # User dashboard
│   ├── (public)/                 # Public pages
│   │   └── explore/              # Event discovery
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.jsx                  # Homepage
├── components/                   # Reusable UI components
│   ├── ui/                       # Radix UI components
│   └── ...                       # Custom components
├── convex/                       # Convex backend functions
│   ├── auth.config.js            # Authentication config
│   ├── schema.js                 # Database schema
│   ├── events.js                 # Event CRUD operations
│   ├── explore.js                # Event discovery queries
│   ├── dashboard.js              # Dashboard queries
│   ├── registrations.js          # Registration management
│   ├── users.js                  # User management
│   └── _generated/               # Auto-generated types
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
│   ├── data.js                   # Static data
│   ├── location-utils.js         # Location helpers
│   └── utils.js                  # General utilities
└── public/                       # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Convex account and CLI
- Clerk account and application
- Google AI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joynalmdabedin440/EventX
   cd eventX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev --once
   ```
   This will create a `.env.local` file with your Convex deployment URL.

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Google AI (for AI event creation)
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

5. **Set up Clerk application**
   - Create a new application at [clerk.com](https://clerk.com)
   - Configure sign-in and sign-up URLs
   - Add your domain to allowed origins

6. **Run database migrations**
   ```bash
   npx convex deploy
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Creating an Event

1. Sign up or sign in to your account
2. Navigate to "Create Event"
3. Use AI assistance or fill in details manually:
   - Event title and description
   - Category and tags
   - Date, time, and timezone
   - Location (physical or online)
   - Capacity and ticketing options
   - Custom branding (Pro feature)

### Registering for Events

1. Browse events on the explore page
2. Filter by location, category, or search
3. Click on an event to view details
4. Register with your email
5. Receive QR code for check-in

### Managing Events (Organizers)

1. Access your dashboard at "My Events"
2. View registration statistics
3. Manage attendee lists
4. Generate QR codes for check-in
5. Edit or delete events

## API Documentation

### Convex Functions

#### Events
- `createEvent`: Create a new event
- `getEventBySlug`: Retrieve event by slug
- `getMyEvents`: Get events created by current user
- `deleteEvent`: Delete an event

#### Explore
- `getEventsByLocation`: Get events by city/state
- `getEventsByCategory`: Get events by category
- `getFeaturedEvents`: Get featured events
- `getPopularEvents`: Get popular events by registration count
- `getCategoryCounts`: Get event counts by category

#### Registrations
- `registerForEvent`: Register user for event
- `getEventRegistrations`: Get registrations for an event
- `checkInAttendee`: Check in attendee with QR code
- `cancelRegistration`: Cancel user registration

#### Users
- `getCurrentUser`: Get current authenticated user
- `updateUserProfile`: Update user profile
- `completeOnboarding`: Complete user onboarding

#### Dashboard
- `getDashboardStats`: Get organizer dashboard statistics

## Testing

Run the linter:
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Convex](https://convex.dev/) for the real-time backend
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://radix-ui.com/) for accessible components
- [Google Generative AI](https://ai.google.dev/) for AI features

## Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with for event organizers and attendees worldwide**
