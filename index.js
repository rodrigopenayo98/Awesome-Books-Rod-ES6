import { DateTime } from './node_modules/luxon/src/luxon.js';
import Navigation from './modules/navigation.js';
import initializeBookList from './modules/initializeBookList.js';

initializeBookList();
Navigation();

function formatDate(date) {
  return date.toLocaleString({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
}

function updateDateTime() {
  const currentDate = DateTime.now();
  const formattedDate = formatDate(currentDate);
  const dateTimeElement = document.getElementById('date-time');
  dateTimeElement.textContent = formattedDate;
}

updateDateTime();

setInterval(updateDateTime, 1000);
