# Social Club Membership & Revenue Model

Interactive React application for managing social club membership tiers, budget planning, fundraisers, and member contribution analysis.

## Features

### 📊 Membership Management
- **Multi-tier system**: Customize membership tiers with different dues, tickets, centuries, and misc expenses
- **Flexible toggles**: Enable/disable revenue streams per tier
- **Real-time calculations**: Automatic totals and revenue projections

### 💰 Revenue Streams
- **Annual Dues**: Base membership fees
- **Tickets**: Monthly ticket sales with member cost vs club revenue split ($20 member pays, $8 club keeps)
- **Centuries**: Annual century runs with profit margin tracking ($200 member pays, $82 club keeps)
- **Misc Expenses**: Flexible per-member annual expenses

### 📈 Budget Planning
- **Category-based budgeting**: Organize expenses into customizable categories
- **Item-level detail**: Track quantity × unit cost for each budget item
- **Net income tracking**: Real-time comparison of income vs expenses against goals

### 🎯 Fundraising Module
- **Custom fundraisers**: Track profit per unit and estimated sales
- **Flexible pricing**: Support both member-paid items and pure profit events
- **Total profit projections**: Automatic calculations with margin analysis

### 👤 Member View
- **Per-member analysis**: See what individual members pay vs what the club keeps
- **Cost transparency**: Visual split showing member costs and club revenue
- **Budget share calculation**: Each member's share of total club expenses
- **Net contribution**: Whether each tier is net positive or negative

## Quick Start

```bash
# Install dependencies
npm install react react-dom

# The component is ready to use - just import and render
import MembershipModel from './membership_model.jsx'

function App() {
  return <MembershipModel />
}
```

## Default Configuration

### Membership Tiers
- **Adult Men**: 49 members, $450 dues, 6 tickets/mo, 12 centuries/yr
- **Adult Women**: 40 members, $800 dues, 6 centuries/yr
- **Student (14–17)**: $150 dues, 3 tickets/mo, 4 centuries/yr
- **Sponsor (60+/25+ yrs)**: 10 members, $1200 dues

### Budget Categories
- **Show**: Suits, designer, painter, foam, lighting ($185,400)
- **Day Of**: Buses, rentals, DJ, floor, food ($14,100)
- **Misc**: Garage, association dues ($34,000)

### Fundraisers
- **Eagles Blocks**: $10 cost, $300 profit per unit
- **King of Hearts**: $30,000 pure profit

## Pricing Constants

```javascript
TICKET_MEMBER_COST = 20    // What member pays
TICKET_REVENUE = 8         // What club keeps
CENTURY_MEMBER_COST = 200  // What member pays
CENTURY_REVENUE = 82       // What club keeps
```

## Usage

### Adding a New Tier
1. Navigate to "Membership" tab
2. Click "+ Add Tier"
3. Configure members, dues, and revenue streams
4. Toggle features on/off as needed

### Managing Budget
1. Navigate to "Budget" tab
2. Add categories with "+ Add Category"
3. Add line items with "+ Add Item"
4. Adjust quantities and unit costs

### Creating Fundraisers
1. Navigate to "Fundraisers" tab
2. Click "+ Add Fundraiser"
3. Set member cost (or $0 for pure profit events)
4. Set club profit per unit
5. Estimate quantity sold

### Analyzing Member Contributions
1. Navigate to "Member View" tab
2. Select a tier from the pills
3. View what members pay vs what club keeps
4. See monthly equivalents and budget share
5. Check net positive/negative per member

## Technology

- React 18+ with Hooks
- Inline styling (no external CSS required)
- Responsive layout
- Real-time calculations with useMemo
- No external dependencies beyond React

## Deployment

This application is set up for automatic deployment to GitHub Pages.

### GitHub Pages Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Automatic Deployment**:
   - The workflow will automatically deploy when you push to the `main` branch
   - You can also manually trigger deployment from the Actions tab
   - Your site will be available at: `https://troy0101.github.io/MembershipModeler/`

3. **Manual Build**:
   ```bash
   npm install
   npm run build
   ```

The build process creates an optimized production bundle in the `build/` directory.

## License

MIT License - Feel free to use and modify for your organization.

## Contributing

Contributions welcome! Please feel free to submit issues or pull requests.
