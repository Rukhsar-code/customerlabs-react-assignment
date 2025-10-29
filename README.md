# CustomerLabs React Assignment – Segment Builder

## 📋 Project Overview
This project implements the **"Saving Segment"** functionality as described in the CustomerLabs React screening test.

It includes:
- Segment creation drawer with schema selection
- Support for User & Group traits
- Dynamic dropdowns preventing duplicate schema selection
- Working "Save Segment" POST API via Node.js proxy
- Teal themed UI matching assignment design

## 🛠️ Tech Stack
- React.js (Functional Components + Hooks)
- Node.js + Express (for proxy)
- CSS3 (custom styling, no UI library)

## 🚀 Run Instructions
1. Clone the repository  
   ```bash
   git clone https://github.com/YOUR_USERNAME/customerlabs-react-assignment.git
   cd customerlabs-react-assignment
2. Install dependencies
   npm install
3. Start the proxy server
   node server.js
4. Start the React app
   npm start
5. Open http://localhost:3000
   in your browser
6. Add schemas → Save the segment → Verify JSON on Webhook.site.

🧾 Webhook URL

POST requests are sent via proxy to:
https://webhook.site/44a5140e-9315-40d2-a780-14eec0f5c881

Output Example:
{
  "segment_name": "Active Users",
  "schema": [
    { "first_name": "First Name" },
    { "account_name": "Account Name" }
  ]
}