# Income & Expense Calculator (INR)

A fully functional web-based Income & Expense Calculator built with HTML, CSS, and JavaScript. This application allows users to track their financial transactions with complete CRUD operations and data persistence using localStorage.

## 🌟 Features

### Core Functionality
- **Add Transactions**: Create new income and expense entries with description, amount, and type
- **View Transactions**: Display all transactions in a clean, organized list
- **Edit Transactions**: Modify existing entries with inline editing
- **Delete Transactions**: Remove unwanted transactions with confirmation
- **Filter Options**: View All, Income Only, or Expense Only transactions using radio buttons

### Financial Overview
- **Real-time Calculations**: Automatic calculation of totals as you add/edit/delete entries
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions  
- **Net Balance**: Difference between income and expenses
- **Indian Rupee Support**: All amounts displayed with ₹ currency symbol

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Data Persistence**: All data saved to localStorage - no data loss on page refresh
- **Reset Functionality**: Clear input fields with a single click
- **Clean UI**: Intuitive and user-friendly interface
- **Pre-loaded Sample Data**: Includes sample transactions for demonstration

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, layout, and responsive design
- **Vanilla JavaScript**: Core functionality and DOM manipulation
- **localStorage API**: Client-side data persistence

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation
1. Download or clone the project files
2. Open `index.html` in your preferred web browser
3. Start adding your income and expense transactions!

## 📱 How to Use

### Adding Transactions
1. Enter a description for your transaction
2. Input the amount in Indian Rupees (₹)
3. Select transaction type (Income or Expense)
4. Click "Add Transaction" button

### Managing Transactions
- **Edit**: Click the "Edit" button next to any transaction
- **Delete**: Click the "Delete" button to remove a transaction
- **Filter**: Use radio buttons to show All, Income, or Expense transactions
- **Reset**: Click "Reset" to clear the input form

### Viewing Summary
The top section displays:
- **Total Income**: Sum of all income entries
- **Total Expenses**: Sum of all expense entries
- **Net Balance**: Your overall financial position

## 📁 Project Structure

```
income-expense-calculator/
│
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 💾 Data Storage

- All transaction data is stored locally in your browser using localStorage
- Data persists between browser sessions
- No server or database required
- Data is automatically saved when you add, edit, or delete transactions

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:
- **Desktop**: Grid layout with optimal spacing
- **Tablet**: Adjusted layout for medium screens
- **Mobile**: Stacked layout for easy touch interaction

## 🎨 Sample Data

The application comes with pre-loaded sample transactions:
- **Income**: Salary (₹50,000), Freelance Work (₹15,000)
- **Expenses**: Groceries (₹2,500), Transportation (₹800)

You can delete these samples and add your own transactions.

## 🔧 Customization

### Adding New Features
The modular code structure makes it easy to add new features:
- Modify `script.js` for new functionality
- Update `style.css` for design changes
- Extend `index.html` for new UI elements

### Currency Change
To change from INR to another currency:
1. Update the currency symbol in `script.js`
2. Modify placeholder text in `index.html`
3. Update the title and labels as needed

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Microsoft Edge
- Modern mobile browsers

## 📝 Future Enhancements

Potential features for future versions:
- Export data to CSV/PDF
- Multiple currency support
- Category-based expense tracking
- Monthly/yearly reports
- Cloud synchronization
- Budget planning tools

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙋‍♂️ Support

If you encounter any issues or have questions:
- Check that JavaScript is enabled in your browser
- Ensure you're using a modern web browser
- Clear browser cache if experiencing issues
- Check browser console for error messages

## 🏷️ Version

Current Version: 2.0 (INR Support)
- v1.0: Basic Income & Expense Calculator
- v2.0: Added Indian Rupee currency support and enhanced UI

---

**Happy Financial Tracking! 💰**
