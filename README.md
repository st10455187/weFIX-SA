# 🏙️ WeFix SA — Citizen Reporting App

WeFix SA is a mobile application designed to empower citizens to report municipal service issues directly to local authorities.  
Built with **React Native**, it bridges the communication gap between citizens and municipalities, ensuring faster responses, transparency, and cleaner communities.

---

## 📱 Features

### 👥 User Roles
- **Citizen:** Can log in, submit reports, view their submitted reports, and monitor progress.
- **Admin:** Can log in to view and manage citizen reports (no access to Account screen).

### 🗺️ Reporting Functionality
- Submit detailed reports with:
  - Issue type (e.g. potholes, streetlights, garbage collection, etc.)
  - Description
  - City & Municipality (auto-linked)
  - Optional image (upload from gallery or camera)
  - Current GPS-based location

### 📸 Media Upload
- Capture or upload images to support each report.
- Preview images before submission.

### 📍 Location Detection
- Automatically fetches and fills in your current address using GPS.

### 🧾 Report Management
- Displays a list of all submitted reports.
- Tracks status updates (In Progress, Resolved, Pending).

### 👮 Role-based Access Control
- **Admins** cannot access the Account screen.
- **Citizens** have a personalized Account view.

### 🔐 Authentication
- Login screen with role selection:
  - `Citizen` → Username: `user`, Password: `user123`
  - `Admin` → Username: `admin`, Password: `admin123`
- Friendly alerts for successful or failed logins.

### 🧭 Navigation
- Splash screen → Welcome → Login → Main App
- Drawer navigation with:
  - Home
  - Reports
  - Volunteer
  - Account *(Citizen only)*
- Bottom tab navigation for quick access.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | React Native (Expo) |
| Navigation | React Navigation (Stack, Drawer, and Bottom Tabs) |
| State Management | React Context API |
| Image Handling | Expo Image Picker |
| Location | Expo Location |
| Icons | Expo Vector Icons (Ionicons) |



