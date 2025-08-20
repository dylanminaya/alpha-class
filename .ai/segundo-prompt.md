# Create Authentication Pages for TrackIt Capital App

## Objective
Design and build responsive login and sign-up pages for "TrackIt" - a capital/finance app for independent workers and freelancers. These pages should maintain consistency with the existing landing page design while providing secure, user-friendly authentication forms.

---

## Pages Overview

### 1. **Login Page (`/login`)**
**Purpose:** Allow existing users to securely access their TrackIt accounts.

**Components Needed:**
- `LoginForm.tsx` - Main login form component
- `LoginForm.css` - Styling for the login form

**Content & Features:**
- **Page Header:** "Welcome Back" with TrackIt text logo
- **Login Form Fields:**
  - Email address (required, with email validation)
  - Password (required, with show/hide toggle)
  - "Remember me" checkbox
- **Primary CTA:** "Sign In" button (blue theme consistent with landing page)
- **Secondary Actions:**
  - "Forgot Password?" link
  - "Don't have an account? Sign up" link to registration page
- **Form Validation:** Real-time validation with clear error messages

### 2. **Sign-Up Page (`/signup`)**
**Purpose:** Enable new users to create TrackIt accounts with proper onboarding.

**Components Needed:**
- `SignupForm.tsx` - Main registration form component
- `SignupForm.css` - Styling for the signup form

**Content & Features:**
- **Page Header:** "Join TrackIt" with TrackIt text logo and welcoming subtitle
- **Registration Form Fields:**
  - Full name (required)
  - Email address (required, with email validation and availability check)
  - Password (required, with strength indicator)
  - Confirm password (required, with match validation)
  - Work type dropdown (Freelancer, Consultant, Independent Contractor, Other)
- **Terms & Privacy:**
  - Checkbox: "I agree to TrackIt's Terms of Service and Privacy Policy"
- **Primary CTA:** "Create Account" button
- **Secondary Actions:**
  - "Already have an account? Sign in" link to login page
- **Form Validation:** Comprehensive validation with helpful error messages

---

## Design Requirements

### **Visual Design**
- **Color Scheme:** Clean, modern design with light gray backgrounds (#f8fafc), white form containers, and blue accents (#3b82f6)
- **Layout:** Centered white form container with subtle shadows on light gray background
- **Typography:** Same font family and hierarchy as landing page
- **Branding:** TrackIt text logo prominently displayed with blue gradient
- **Shadows:** Subtle, modern box shadows (0 10px 15px -3px rgba(0, 0, 0, 0.1)) for depth

### **Form Design Standards**
- **Input Fields:** 
  - Clean, rounded border inputs with proper focus states
  - **Full Width:** All form inputs, selects, and buttons must use `width: 100%` and `box-sizing: border-box`
  - **Password Fields:** Use `padding-right: 2.5rem` to accommodate show/hide toggle buttons
  - Consistent padding (0.75rem 1rem) and spacing
  - Clear labels and placeholder text
- **Buttons:** 
  - **Full Width:** All form buttons must span the complete container width (`width: 100%`)
  - Primary buttons with blue styling (#3b82f6)
  - Secondary/social buttons with appropriate styling
  - Disabled states for form submission
  - Use `box-sizing: border-box` for consistent sizing
- **Error States:** 
  - Red border and text for invalid inputs
  - Success states with green indicators
  - Loading states with blue spinners
- **Background Standards:**
  - **DO NOT USE:** Purple, gradient, or dark backgrounds
  - **ALWAYS USE:** Light gray (#f8fafc) page backgrounds with white form containers

### **Responsive Design**
- **Mobile-First:** Forms should work seamlessly on all screen sizes
- **Full-Width Layout:** All form elements should utilize available container space
- **Touch-Friendly:** Adequate button sizes and touch targets (full-width buttons provide better mobile UX)
- **Keyboard Navigation:** Full keyboard accessibility support
- **Consistent Spacing:** Use `gap: 1.5rem` for form sections and `gap: 0.5rem` for form groups

---

## Technical Implementation

### **Form Management**
- Use React Hook Form or similar for form state management
- Implement proper form validation (client-side and server-side ready)
- Handle form submission states (loading, success, error)
- **Layout Standards:** Ensure all form elements use full container width with proper box-sizing

### **Routing**
- Set up React Router routes for `/login` and `/signup`
- Add navigation between login and signup pages
- Redirect authenticated users appropriately

### **Security Considerations**
- Password strength validation
- Email format validation
- Prevent common security issues (XSS protection)
- Prepare for backend integration

### **User Experience**
- **Loading States:** Show loading spinners during form submission
- **Error Handling:** Clear, user-friendly error messages
- **Success Feedback:** Confirmation messages for successful actions
- **Auto-focus:** First input field should be focused on page load

---

## File Structure
```
src/
  pages/
    Auth/
      Login/
        Login.tsx
        Login.css
      Signup/
        Signup.tsx
        Signup.css
  components/
    Forms/
      LoginForm/
        LoginForm.tsx
        LoginForm.css
      SignupForm/
        SignupForm.tsx
        SignupForm.css
```

---

## Integration Notes
- Forms should be designed to easily connect to a backend authentication API
- Consider state management for user authentication status
- Plan for features like email verification and password reset flows
- Ensure forms work with the existing Navbar login/signup buttons

