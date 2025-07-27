// Income & Expense Calculator - Main Application Logic (INR)

// Global state
const entries = [];
let currentEditId = null;
let currentFilter = 'all';

// Sample transactions data
const sampleTransactions = [];

// DOM Elements
let form, descriptionInput, amountInput, typeRadios, addBtn, resetBtn, filterRadios, entryList, emptyState;
let totalIncomeEl, totalExpenseEl, netBalanceEl;

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); // Debug log
    
    // Wait a bit for elements to be fully rendered
    setTimeout(() => {
        initializeElements();
        loadFromStorage();
        render();
        attachEventListeners();
        console.log('Application initialized'); // Debug log
    }, 100);
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    form = document.getElementById('transaction-form');
    descriptionInput = document.getElementById('description');
    amountInput = document.getElementById('amount');
    typeRadios = document.querySelectorAll('input[name="type"]');
    addBtn = document.getElementById('add-btn');
    resetBtn = document.getElementById('reset-btn');
    filterRadios = document.querySelectorAll('input[name="filter"]');
    entryList = document.getElementById('entry-list');
    emptyState = document.getElementById('empty-state');
    
    // Stat display elements
    totalIncomeEl = document.getElementById('total-income');
    totalExpenseEl = document.getElementById('total-expense');
    netBalanceEl = document.getElementById('net-balance');
    
    // Log what elements were found
    console.log('Elements initialized:', {
        form: !!form,
        descriptionInput: !!descriptionInput,
        amountInput: !!amountInput,
        addBtn: !!addBtn,
        resetBtn: !!resetBtn,
        entryList: !!entryList,
        emptyState: !!emptyState,
        totalIncomeEl: !!totalIncomeEl,
        totalExpenseEl: !!totalExpenseEl,
        netBalanceEl: !!netBalanceEl
    });
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        console.log('Form submit listener attached');
    } else {
        console.error('Form element not found!');
    }
    
    // Add button click (backup)
    if (addBtn) {
        addBtn.addEventListener('click', function(e) {
            console.log('Add button clicked');
            if (form) {
                e.preventDefault();
                handleFormSubmit(e);
            }
        });
        console.log('Add button listener attached');
    }
    
    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetForm();
        });
        console.log('Reset button listener attached');
    }
    
    // Filter change
    if (filterRadios && filterRadios.length > 0) {
        filterRadios.forEach(radio => {
            radio.addEventListener('change', handleFilterChange);
        });
        console.log('Filter listeners attached:', filterRadios.length);
    }
}

/**
 * Handle form submission for both add and update operations
 */
function handleFormSubmit(e) {
    console.log('Form submit handler called'); // Debug log
    
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (!descriptionInput || !amountInput) {
        console.error('Input elements not found');
        alert('Form inputs not properly initialized. Please refresh the page.');
        return;
    }
    
    const description = descriptionInput.value.trim();
    const amountValue = amountInput.value.trim();
    const amount = parseFloat(amountValue);
    
    console.log('Form values:', { description, amountValue, amount }); // Debug log
    
    // Get selected type
    const typeElement = document.querySelector('input[name="type"]:checked');
    if (!typeElement) {
        alert('Please select a transaction type.');
        return;
    }
    const type = typeElement.value;
    
    console.log('Selected type:', type); // Debug log
    
    // Validation
    if (!description) {
        alert('Please enter a description.');
        descriptionInput.focus();
        return;
    }
                                                            
    if (!amountValue || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0.');
        amountInput.focus();
        return;
    }
    
    console.log('Validation passed, processing transaction...'); // Debug log
    
    try {
        if (currentEditId) {
            updateEntry(currentEditId, description, amount, type);
            console.log('Transaction updated');
        } else {
            addEntry(description, amount, type);
            console.log('Transaction added');
        }
        
        resetForm();
        console.log('Form reset completed');
    } catch (error) {
        console.error('Error processing form:', error);
        alert('An error occurred while processing your transaction. Please try again.');
    }
}

/**
 * Add a new entry to the list
 */
function addEntry(description, amount, type) {
    const entry = {
        id: generateId(),
        description: description,
        amount: parseFloat(amount),
        type: type,
        date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };
    
    entries.push(entry);
    console.log('Transaction added to array:', entry);
    console.log('Total transactions now:', entries.length);
    
    saveToStorage();
    render();
}

/**
 * Update an existing entry
 */
function updateEntry(id, description, amount, type) {
    const entryIndex = entries.findIndex(entry => entry.id === id);
    if (entryIndex !== -1) {
        entries[entryIndex] = {
            ...entries[entryIndex],
            description: description,
            amount: parseFloat(amount),
            type: type
        };
        console.log('Transaction updated:', entries[entryIndex]);
        saveToStorage();
        render();
    }
}

/**
 * Delete an entry from the list
 */
function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        const entryIndex = entries.findIndex(entry => entry.id === id);
        if (entryIndex !== -1) {
            const deletedEntry = entries[entryIndex];
            entries.splice(entryIndex, 1);
            console.log('Transaction deleted:', deletedEntry);
            saveToStorage();
            render();
        }
    }
}

/**
 * Start editing an entry
 */
function editEntry(id) {
    const entry = entries.find(entry => entry.id === id);
    if (entry) {
        // Populate form with entry data
        if (descriptionInput) descriptionInput.value = entry.description;
        if (amountInput) amountInput.value = entry.amount.toString();
        
        // Set the correct type radio button
        const typeRadio = document.querySelector(`input[name="type"][value="${entry.type}"]`);
        if (typeRadio) {
            typeRadio.checked = true;
        }
        
        // Update UI for edit mode
        currentEditId = id;
        if (addBtn) addBtn.textContent = 'Update Transaction';
        if (form) form.classList.add('form-updating');
        
        // Scroll to form
        const entryForm = document.getElementById('entry-form');
        if (entryForm) {
            entryForm.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
}

/**
 * Reset form to initial state
 */
function resetForm() {
    if (form) {
        form.reset();
    }
    
    currentEditId = null;
    if (addBtn) addBtn.textContent = 'Add Transaction';
    if (form) form.classList.remove('form-updating');
    
    // Reset to income by default
    const incomeRadio = document.querySelector('input[name="type"][value="income"]');
    if (incomeRadio) {
        incomeRadio.checked = true;
    }
    
    // Clear any focus
    if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
    }
}

/**
 * Handle filter change
 */
function handleFilterChange(e) {
    currentFilter = e.target.value;
    console.log('Filter changed to:', currentFilter);
    render();
}

/**
 * Get filtered entries based on current filter
 */
function getFilteredEntries() {
    switch (currentFilter) {
        case 'income':
            return entries.filter(entry => entry.type === 'income');
        case 'expense':
            return entries.filter(entry => entry.type === 'expense');
        default:
            return [...entries];
    }
}

/**
 * Calculate totals for all entries
 */
function calculateTotals() {
    const totals = entries.reduce((acc, entry) => {
        if (entry.type === 'income') {
            acc.income += entry.amount;
        } else if (entry.type === 'expense') {
            acc.expense += entry.amount;
        }
        return acc;
    }, { income: 0, expense: 0 });
    
    totals.balance = totals.income - totals.expense;
    return totals;
}

/**
 * Update the statistics display
 */
function updateStats() {
    const totals = calculateTotals();
    
    if (totalIncomeEl) {
        totalIncomeEl.textContent = formatCurrency(totals.income);
    }
    if (totalExpenseEl) {
        totalExpenseEl.textContent = formatCurrency(totals.expense);
    }
    if (netBalanceEl) {
        netBalanceEl.textContent = formatCurrency(totals.balance);
        
        // Update balance color based on positive/negative
        netBalanceEl.className = 'stat-value';
        if (totals.balance > 0) {
            netBalanceEl.classList.add('positive');
        } else if (totals.balance < 0) {
            netBalanceEl.classList.add('negative');
        }
    }
    
    console.log('Stats updated:', totals);
}

/**
 * Render the entire application
 */
function render() {
    console.log('Rendering application...');
    renderEntries();
    updateStats();
}

/**
 * Render the entry list
 */
function renderEntries() {
    const filteredEntries = getFilteredEntries();
    
    if (!entryList) {
        console.error('Entry list element not found');
        return;
    }
    
    // Clear existing entries
    entryList.innerHTML = '';
    
    console.log('Rendering transactions, filtered count:', filteredEntries.length);
    
    if (filteredEntries.length === 0) {
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    // Sort entries by ID (newest first since ID is timestamp-based)
    const sortedEntries = [...filteredEntries].sort((a, b) => {
        return b.id.localeCompare(a.id);
    });
    
    // Create list items for each entry
    sortedEntries.forEach((entry, index) => {
        console.log(`Creating list item ${index + 1}:`, entry);
        const listItem = createEntryListItem(entry);
        entryList.appendChild(listItem);
    });
    
    console.log('Rendered transactions successfully');
}

/**
 * Create a single entry list item
 */
function createEntryListItem(entry) {
    const li = document.createElement('li');
    li.className = `entry-item ${entry.type}`;
    li.dataset.id = entry.id;
    
    const sign = entry.type === 'income' ? '+' : '-';
    const amountClass = entry.type === 'income' ? 'positive' : 'negative';
    
    li.innerHTML = `
        <div class="entry-content">
            <div class="entry-description">${escapeHtml(entry.description)}</div>
            <div class="entry-amount ${amountClass}">${sign}${formatCurrency(entry.amount)}</div>
            <div class="entry-date">${entry.date}</div>
        </div>
        <div class="entry-actions">
            <button class="btn btn--sm btn--edit" onclick="editEntry('${entry.id}')" aria-label="Edit ${escapeHtml(entry.description)}">
                Edit
            </button>
            <button class="btn btn--sm btn--delete" onclick="deleteEntry('${entry.id}')" aria-label="Delete ${escapeHtml(entry.description)}">
                Delete
            </button>
        </div>
    `;
    
    return li;
}

/**
 * Generate a unique ID for entries
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format number as Indian Rupee currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(Math.abs(amount));
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Save entries to localStorage
 */
function saveToStorage() {
    try {
        localStorage.setItem('incomeExpenseEntriesINR', JSON.stringify(entries));
        console.log('Data saved to localStorage:', entries.length, 'transactions');
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

/**
 * Load entries from localStorage
 */
function loadFromStorage() {
    try {
        const stored = localStorage.getItem('incomeExpenseEntriesINR');
        if (stored) {
            const parsedEntries = JSON.parse(stored);
            entries.length = 0; // Clear existing entries
            entries.push(...parsedEntries);
            console.log('Data loaded from localStorage:', entries.length, 'transactions');
        } else {
            // Load sample data if no stored data exists
            entries.length = 0;
            entries.push(...sampleTransactions);
            console.log('No stored data found, loaded sample transactions:', entries.length);
            saveToStorage(); // Save sample data
        }
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        // Load sample data on error
        entries.length = 0;
        entries.push(...sampleTransactions);
        console.log('Error loading data, using sample transactions:', entries.length);
    }
}

// Make functions available globally for onclick handlers
window.editEntry = editEntry;
window.deleteEntry = deleteEntry;