# AGRIVISION 2.0

## Current State
Full single-page React/TS website. Has hero, about, agenda timeline (Day 1+2), evaluation, prize, registration, footer. Uses Tailwind CSS.

## Requested Changes (Diff)

### Add
- IntersectionObserver scroll reveal for agenda items (fade-in + upward motion, staggered delays)
- Active highlighted state on visible timeline dot
- Hover effects on agenda cards
- Green gradient overlay on hero background image

### Modify
- Color theme: deep green primary (#1B5E20), light green secondary, earthy gold accent
- Soft gradients replacing flat colors
- Hero buttons: rounded, shadow, hover scale
- Timeline: vertical line + dots with active highlighting
- Consistent spacing and mobile responsiveness

### Remove
- Flat colors clashing with new Agri-Tech theme

## Implementation Plan
1. Update CSS variables to Agri-Tech palette
2. Add gradients to section backgrounds
3. Hero: gradient overlay, improved buttons
4. Timeline: vertical line, dot styles, active state
5. IntersectionObserver for agenda scroll reveal with stagger
6. Hover effects on cards
7. Spacing and mobile polish
