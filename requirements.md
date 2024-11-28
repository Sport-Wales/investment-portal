# A Place for Sport - Crowdfunder Calculator Requirements

## Core Requirements

### User Input Fields
1. Postcode input field
   - Required field
   - Will be used to check WIMD ranking (pending data from Jon)
   - Validation for Welsh postcodes needed

2. Target Groups Selection
   - Multiple checkbox selection
   - Options include:
     - Women & Girls
     - Disabled People
     - Young People
     - LGBTQIA+ People
     - Elderly People
     - Ethnic Minority People
     - None of the above
   - At least one option must be selected

3. Project Cost Input
   - Required field
   - Numerical input only
   - Must handle decimal values
   - Validation for minimum (£300) and maximum values

### Calculation Logic

1. Base Funding Percentage Determination
   - 30% baseline funding
   - 40% if targeting inequality groups
   - 50% if in top 30% deprived area (WIMD ranks 1-573)
   - Maximum funding cap of £15,000

2. Funding Rules
   - Minimum pledge: £300
   - Maximum pledge: £15,000
   - Support range: 30-50% of raised amount

### Output Display

1. Results Section
   - Display maximum match funding amount
   - Show applicable funding percentage
   - Display total potential project value (user amount + match funding)
   - Clear presentation of results

## Technical Requirements

1. Form Validation
   - Real-time validation
   - Error messaging for invalid inputs
   - Prevent submission with invalid data

2. Responsive Design
   - Mobile-friendly layout
   - Accessible on all screen sizes
   - Sport Wales branding compliance


4. Performance
   - Instant calculations
   - Smooth user experience
   - No page reloads needed

## Integration Requirements

1. WIMD Data Integration
   - Efficient postcode lookup system
   - Regular data updates capability
   - Fallback handling for unknown postcodes


## User Experience Requirements

1. Interface
   - Clear, step-by-step layout
   - Intuitive design
   - Immediate feedback on inputs

2. Help Features
   - Tool tips for complex terms
   - Clear instructions

3. Error Handling
   - User-friendly error messages
   - Clear validation feedback
   - Guidance for correction

## Requiremented

1. Functional Testing
   - All calculation scenarios
   - Edge cases
   - Input validation
   - WIMD lookups


## Future Considerations

2. Expandability
   - Ability to add WIMD data updates

3. Accessibility
   - WCAG compliance
   - Screen reader compatibility
   - Keyboard navigation support
   - Clear error states and messages


## Welsh Index of Multiple Deprivation
 
The Welsh Index of Multiple Deprivation (WIMD) is the Welsh Government’s official measure of relative deprivation for small areas in Wales. It identifies areas with the highest concentrations of several different types of deprivation. WIMD ranks all small areas in Wales from 1 (most deprived) to 1,909 (least deprived). It is a National Statistic produced by statisticians at the Welsh Government. Small areas are Census geographies called Lower-layer Super Output Areas (LSOAs).

The full index is updated every 4 to 5 years. The most recent index was published in 2019. WIMD 2019 index and domain ranks can be seen on the WIMD 2019 tab.

There are numerous indicators that feed into WIMD. Some of these are updated annually (when possible), some periodically, some only for the overall WIMD update and some only when census data becomes available. You can access all the indicator data at various geography levels on the indicator data tab.

You can find more information about WIMD on the webpages on the Welsh Government website (please see the links below).

For those interested specifically in pan-England and Wales measures of local area deprivation, please see the output 'Indices of Deprivation 2019: income and employment domains combined for England and Wales' (under links below).

Geospatial information on WIMD 2019 and WIMD 2014, including shapefiles, can be found on Data Map Wales (see link below).