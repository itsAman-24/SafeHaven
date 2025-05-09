
# Safe Haven

**Safe Haven** is a web application that helps users locate nearby **shelters**, **bunkers**, **medical facilities**, and **safe zones** in times of emergency. It provides detailed location data, contact information, and direct access to Google Maps directions to assist users in navigating to the safest possible place quickly and reliably.

---

## Table of Contents

1. [What is Safe Haven?](#what-is-safe-haven)
2. [Who Can Use Safe Haven?](#who-can-use-safe-haven)
3. [Key Features](#key-features)
4. [Tech Stack](#tech-stack)
5. [Procedure Followed](#procedure-followed)
6. [How to Use](#how-to-use)
7. [Common Issues](#common-issues)
8. [Future Enhancements](#future-enhancements)
9. [Contact](#contact)

---

## What is Safe Haven?

Safe Haven is a community-powered platform built to help users during natural disasters or emergency situations. It allows users to:
- View emergency locations on a map
- Access contact info and description for each site
- Navigate to the location using Google Maps

---

## Who Can Use Safe Haven?

- Civilians in emergency-prone areas
- Relief organizations
- Local authorities for facility mapping
- Anyone in need of locating safe points quickly

---

## Key Features

- Interactive map with location markers
- Detailed pop-up cards for each location
- Directions using Google Maps
- Real-time data using Firebase
- Categorized places: Shelter, Bunker, Medical, Safe Zone

---

## Tech Stack

| Tech          | Purpose                            |
|---------------|-------------------------------------|
| React         | Frontend framework                  |
| Tailwind CSS  | Styling and layout                  |
| Firebase (Firestore) | Backend database             |
| React Icons   | Icons for UI components             |
| date-fns      | Formatting dates                    |
| Google Maps   | External navigation support         |

---

## Procedure Followed

1. Ideation & Planning  
   Defined the scope, users, and goals of the app.

2. Tech Stack Finalization  
   Chose Firebase, React, Tailwind CSS, and more for fast, scalable development.

3. Frontend Development  
   - Designed UI with reusable components
   - Categorized locations with distinct badges
   - Developed the location detail modal

4. Map & Data Integration  
   - Fetched real-time data from Firebase
   - Mapped dynamic pins on the map
   - Linked directions to Google Maps

5. Testing & Deployment  
   - Manual testing for responsiveness and accuracy
   - Deployed via Netlify or Firebase Hosting

---

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/safe-haven.git
   cd safe-haven
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase in your `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_PROJECT_ID=your_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Common Issues

| Issue                         | Solution                                 |
|------------------------------|------------------------------------------|
| Blank map or no markers      | Check Firebase Firestore data structure  |
| Google Maps not loading      | Ensure correct use of directions URL     |
| App crashes on load          | Validate environment variables and types |

---

## Future Enhancements

- Role-based access (Admin/Editor)
- Add/edit/delete locations via UI
- Notifications during emergencies
- Search and filter by location or type
- Mobile app version

---

## Contact

**Developer**: Aman Pandey  
**Email**: amanpan2410@gmail.com  
**LinkedIn**: [Aman Pandey](https://www.linkedin.com/in/aman-kumar-pandey-727520270)
