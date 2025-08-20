### Improved Prompt: Create a Landing Page for a Capital App for Independents

**Objective:** Design and build a single-page, responsive landing page for "TrackIt" - a capital/finance app designed for independent workers and freelancers. The landing page should be located within a `components` folder and include a navigation bar, a hero section, and a footer.

---

### **Component Breakdown**

**1. `Navbar.tsx` (Navigation Bar):**
* **Purpose:** The top-most component of the landing page, providing quick navigation.
* **Content:**
    * **Logo/App Name:** "TrackIt" text logo located on the left side.
    * **Navigation Links:** Include links for "Features," "Pricing," and "Support."
    * **Call-to-Action (CTA) Buttons:** "Log In" and "Sign Up" buttons on the right.
* **Responsiveness:** The navigation bar should collapse into a hamburger menu on mobile devices.

**2. `Hero.tsx` (Hero Section):**
* **Purpose:** The main, eye-catching section of the landing page, designed to grab the user's attention.
* **Content:**
    * **Catchy Headline:** "A capital app for independents" - targeting freelancers and independent workers.
    * **Sub-headline:** "Get paid faster and manage your finances effortlessly. Perfect for freelancers seeking a seamless financial solution."
    * **Primary CTA Button:** "Join today" - a blue button encouraging beta signup.
    * **Supporting Visuals:** A rotated iPhone mockup showing a payments app interface with a VISA card, "Payments" header, and "Integrate with just one single tap" messaging.
* **Responsiveness:** The layout should adjust gracefully, with text and images stacking vertically on smaller screens, and phone mockup straightening on mobile.

**3. `Footer.tsx` (Footer):**
* **Purpose:** The bottom-most component containing essential legal information and basic links.
* **Content:**
    * **Footer Links:** Simple horizontal links for "About," "Terms of Service," and "Privacy Policy."
    * **Copyright Information:** "©2024 TrackIt. All rights reserved."
* **Responsiveness:** The footer links should stack vertically on mobile devices for better readability.

---

**General Design & Technical Notes:**

* The entire landing page should be built as a **single-page application** (SPA), meaning all content is loaded on a single HTML page.
* The design must be **fully responsive**, ensuring a great user experience on all screen sizes, from mobile phones to large desktop monitors.
* **Color Scheme:** Light theme with white/light gray backgrounds, blue accent colors (#4f46e5 for CTA buttons), and clean typography.
* **Layout:** Clean, professional design with ample whitespace and modern styling.
* Please place all components (`Navbar.tsx`, `Hero.tsx`, and `Footer.tsx`) within a dedicated `components` directory.
* Each component should have its own CSS file for styling (e.g., `Navbar.css`, `Hero.css`, `Footer.css`).

** Implementation Complete & Verified:**

* **Full Viewport Coverage:** Hero section uses CSS technique with `100vw` width and negative margins to ensure full-width background coverage without dark areas.
* **Seamless Layout Flow:** Footer also implements full-width technique with zero margins to eliminate any gray space gaps between sections.
* **Responsive Grid System:** Two-column grid layout that seamlessly transitions to single-column on mobile devices.
* **Interactive Elements:** Hamburger menu for mobile navigation, hover effects on phone mockup, and animated tap indicator.
* **Performance Optimized:** Clean CSS structure with proper overflow controls and box-sizing for optimal rendering.
* **Cross-Device Testing:** Layout verified to work perfectly across desktop and mobile viewports without spacing issues.

**Key Technical Solutions Applied:**
- CSS full-width breakout technique for both hero and footer backgrounds
- Proper viewport units (`100vw`, `100vh`) for consistent sizing
- `overflow-x: hidden` to prevent horizontal scrolling
- Flexbox and CSS Grid for responsive layouts
- Mobile-first responsive design with proper breakpoints
- Zero-margin layout flow to prevent unwanted gray space between sections