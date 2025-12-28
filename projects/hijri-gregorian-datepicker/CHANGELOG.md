# Changelog

All notable changes to this project will be documented in this file.

## [1.5.0] - 2025-12-25

### 🎉 Major Features Added

#### ⏰ Time Picker Integration
- **Full time picker support** with hours and minutes
- **12-hour and 24-hour format** toggle (`useMeridian` input)
- **Stepper controls** with custom Remix Icon arrows for increment/decrement
- **Initial time support** via `initialDate` input
- **Horizontal layout** with professional modern design
- **AM/PM toggle button group** for 12-hour format
- **Keyboard input** support for manual time entry
- **Current system time** as default when enabled

#### 📅 Range Selection Mode
- **Range selection support** with start and end dates
- **Visual range highlighting** in calendar view
- **Initial range dates** via `initialRangeStart` and `initialRangeEnd` inputs
- **Time support for ranges** - each date can have different times
- **Automatic date swapping** if end date is before start date
- **Range-specific styling** with connected day highlights

#### 🎨 Beautiful Custom Select Dropdowns
- **Replaced native selects** with stunning custom dropdowns
- **Smooth animations** with slide-down effects
- **Custom scrollbar** styled to match the theme
- **Click-outside detection** to close dropdowns
- **Selected state highlighting** in purple
- **Hover effects** with smooth transitions
- **Remix Icon integration** for dropdown chevrons
- **Auto-close on selection** with smart toggle behavior

#### 🌐 Bilingual Typography System
- **Google Fonts integration** - Poppins (English) and Zain (Arabic)
- **Automatic font switching** based on `[dir]` and `[lang]` attributes
- **Language-aware font weights** - optimized for each script
- **Proper letter-spacing** for both languages
- **Enhanced readability** with line-height adjustments (1.6 for English, 1.8 for Arabic)
- **Typography best practices** applied throughout the component

### 🎨 UI/UX Improvements

#### Modern Select Styling
- **Enhanced borders** - 2px solid with 8px border-radius
- **Professional shadows** - subtle elevation with hover effects
- **Purple theme integration** - Sfida colors (#5b479c)
- **Smooth transitions** - 0.2s ease on all interactions
- **Better spacing** - improved padding and margins

#### Time Picker Design
- **Clean horizontal layout** - hour : minute : AM/PM
- **Color-coded elements** - purple accents throughout
- **Focus indicators** - purple rings for keyboard navigation
- **Disabled state styling** - proper visual feedback
- **Responsive spacing** - works on all screen sizes

### 🔧 Technical Improvements
- **TypeScript strict mode** compatibility
- **Angular 15+** compatibility maintained
- **Form validation** integration preserved
- **Accessibility enhancements** - proper ARIA labels
- **Performance optimized** - no unnecessary re-renders
- **XSS security** - safe inline SVG usage
- **Zero breaking changes** - full backward compatibility

### 🌍 RTL/LTR Enhancements
- **Full RTL support** for all new features
- **Icon positioning** adjusts automatically
- **Proper padding** for both directions
- **Scrollbar positioning** adapts to direction
- **Text alignment** follows language direction

### 📦 Dependencies
- **Remix Icon CDN** added for modern icon support
- **Google Fonts** - Poppins and Zain via CDN
- No additional npm dependencies required

### 🐛 Bug Fixes
- Fixed Arabic numeral display in number inputs
- Fixed time initialization issues at midnight
- Improved form control synchronization
- Enhanced date validation for ranges

### 📝 Documentation Updates
- Added comprehensive feature documentation
- Included usage examples for all new features
- Updated README with new capabilities
- Added keyboard shortcuts documentation

---

## [Previous Versions]

All previous version history maintained in git repository.

### Notes
- This release maintains 100% backward compatibility
- All existing features continue to work as before
- New features are opt-in via input properties
- Recommended to update to Angular 15+ for best experience
