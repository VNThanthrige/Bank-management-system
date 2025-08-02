// Select DOM elements
const calendarDates = document.getElementById('calendarDates');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventModal = document.getElementById('eventModal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // 0-indexed (0 = Jan)

// Sample events (keyed by 'YYYY-MM-DD') with title and description
const events = {
  '2025-07-15': { title: 'Web Dev Lecture', description: 'Lecture about React basics.' },
  '2025-07-20': { title: 'Database Exam', description: 'Midterm exam for Database Systems.' },
  '2025-07-23': { title: 'Project Submission', description: 'Submit final project for Data Structures.' }
};

// Month names for display
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Render calendar for the given month/year
function renderCalendar(year, month) {
  calendarDates.innerHTML = '';

  // First day of the month (0 = Sunday, we want Monday start, so shift accordingly)
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay(); // Sunday = 0, Monday = 1...
  startDay = (startDay === 0) ? 7 : startDay; // Convert Sunday (0) to 7 so week starts Mon

  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Number of days in previous month for leading empty days
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Show current month-year text
  currentMonthEl.textContent = `${monthNames[month]} ${year}`;

  // Fill in the leading days from previous month if startDay > 1 (Mon)
  for(let i = startDay - 1; i > 0; i--) {
    const dayNum = prevMonthDays - i + 1;
    const cell = document.createElement('div');
    cell.classList.add('date-cell', 'other-month');
    cell.textContent = dayNum;
    calendarDates.appendChild(cell);
  }

  // Fill in current month days
  for(let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('date-cell');
    cell.textContent = day;

    // Format date key for events lookup
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Highlight today
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      cell.classList.add('today');
    }

    // If event exists on this date, highlight and add click listener
    if(events[dateKey]) {
      cell.style.backgroundColor = '#ffeaa7';
      cell.style.cursor = 'pointer';

      cell.addEventListener('click', () => {
        openModal(events[dateKey]);
      });
    }

    calendarDates.appendChild(cell);
  }

  // Fill trailing days from next month to complete grid (total cells multiple of 7)
  const totalCells = calendarDates.children.length;
  const cellsToAdd = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

  for(let i = 1; i <= cellsToAdd; i++) {
    const cell = document.createElement('div');
    cell.classList.add('date-cell', 'other-month');
    cell.textContent = i;
    calendarDates.appendChild(cell);
  }
}

// Open event modal
function openModal(event) {
  modalTitle.textContent = event.title;
  modalDesc.textContent = event.description;
  eventModal.classList.remove('hidden');
}

// Close modal
function closeModal() {
  eventModal.classList.add('hidden');
}

// Navigation handlers
prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if(currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentYear, currentMonth);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if(currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentYear, currentMonth);
});

closeBtn.addEventListener('click', closeModal);
eventModal.addEventListener('click', (e) => {
  if(e.target === eventModal) closeModal();
});

// Initial render
renderCalendar(currentYear, currentMonth);
