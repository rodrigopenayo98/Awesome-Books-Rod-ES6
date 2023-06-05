export default function Navigation() {
  const itemOne = document.getElementById('item1');
  const itemTwo = document.getElementById('item2');
  const itemThree = document.getElementById('item3');
  const list = document.getElementById('list');
  const addNew = document.getElementById('add-new');
  const contact = document.getElementById('contact');

  itemOne.addEventListener('click', () => {
    list.classList.remove('hidden');
    addNew.classList.add('hidden');
    contact.classList.add('hidden');
  });

  itemTwo.addEventListener('click', () => {
    addNew.classList.remove('hidden');
    list.classList.add('hidden');
    contact.classList.add('hidden');
  });

  itemThree.addEventListener('click', () => {
    contact.classList.remove('hidden');
    list.classList.add('hidden');
    addNew.classList.add('hidden');
  });

  const navLinks = document.querySelectorAll('#nav-books a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navLinks.forEach((link) => link.classList.remove('active'));
      link.classList.add('active');
    });
  });
}