# TrackHub - Habit Tracker

![Screen](screen)

#### Video Demo: [Habit Tracking Made Easy 🌱 - TrackHub](https://youtu.be/uRczUZB7UiI)

#### Live Demo: [TrackHub](https://track-hub-seven.vercel.app/)

## Description

TrackHub is a free micro-SaaS habit tracker designed to help users build discipline and track their progress over time. Built with **Next.js, Prisma, and Supabase**, TrackHub offers a seamless experience for monitoring daily habits with a streak-based system. Users can visualize their completed tasks, track ongoing habits, and review their historical performance.

### Key Features
- **Landing Page**: A visually appealing introduction with a blue-purple color scheme, a silent video demo, fictitious testimonials, and a list of benefits for using TrackHub.
- **User Authentication**: Sign-up and login pages, allowing users to create an account and access their personalized dashboard.
- **Dashboard**: Displays the user's current habits, streak count, and completion status.
- **Task Creation**: A dedicated page for adding new habits, specifying frequency, and setting goals.
- **History Page**: A comprehensive overview of completed and pending tasks, along with statistics on total habits and streak performance.

## Tech Stack
- **Frontend**: Next.js for a modern, fast user interface.
- **Backend**: Prisma and Supabase for robust database management.
- **Authentication**: Support for standard email/password authentication and soon GitHub login.
- **Database Models**:

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  email     String   @unique
  password  String?
  githubId  String?  @unique
  habits    Habit[]
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt   
}

model Habit {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  name      String
  frequency String
  goal      String
  progress  Progress[]
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt     
}

model Progress {
  id        String   @id @default(uuid())
  habit     Habit    @relation(fields: [habitId], references: [id])
  habitId   String
  date      DateTime @default(now())
  completed Boolean  @default(false)
  createdAt DateTime @default(now())  
  updatedAt DateTime @updatedAt     
}
```

## Future Improvements & Monetization Ideas

To transition TrackHub into a more advanced platform with monetization potential, consider the following upgrades:

### **1. Advanced Analytics**
- Provide detailed habit-tracking statistics with graphs and insights.
- Allow users to set reminders and receive notifications.

### **2. Social & Community Features**
- Add a leaderboard where users can compare streaks with friends.
- Enable users to form accountability groups for shared habit challenges.

### **3. Mobile Application**
- Develop a React Native version for a better mobile experience.
- Implement offline tracking for seamless habit logging.

### **4. Premium Subscription Model**
- Offer a **Pro Version** with features such as:
  - Custom habit templates.
  - Personalized progress reports.
  - Integration with Google Calendar and Notion.

### **5. AI-Powered Recommendations**
- Implement AI-based habit suggestions based on user patterns.
- Provide motivational insights to improve user engagement.

### **6. API & Third-Party Integrations**
- Create an API for developers to connect TrackHub with other productivity tools.
- Integrate with platforms like Zapier for automation.

