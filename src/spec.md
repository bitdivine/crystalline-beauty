# BotSpa Application

## Overview
BotSpa is a service ordering application that allows users to create and manage service orders for various types of maintenance and support services.

## Authentication
- Users must authenticate using Internet Identity login system
- All functionality requires user authentication
- User sessions are maintained throughout the application usage

## Core Functionality

### Order Creation
- Users can create new service orders after authentication
- Each order must specify:
  - Service type (cleaning, consumable replacement, repair, or other)
  - Service details (description of what is needed)
- Orders are automatically associated with the logged-in user

### Order Management
- Users can view a list of their own orders
- Each order displays the service type and details
- Orders are displayed in a simple, readable format

## Data Persistence
- All orders must be stored persistently in the backend
- Orders are linked to the user's Internet Identity
- Users can only access their own orders

## User Interface
- Simple, clean interface for order creation with form fields for service type and details
- Clear navigation between order creation and order viewing
- Responsive design suitable for desktop and mobile devices
- All content and interface elements in English
- Global background uses a green color scheme applied consistently across all components and pages
- Background styling maintains excellent contrast with text and UI elements for optimal readability and accessibility
- Text and accent colors are adjusted to ensure good visibility and accessible contrast against the green background
- Green background theme is applied uniformly across all views including login, dashboard, forms, and all other components
- Design supports both light and dark modes with appropriate color adjustments for each mode
- Typography and layout remain unchanged, with contrast optimizations for the new green background theme
