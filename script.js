const usersTable = document.getElementById('users-table');
const userDetails = document.getElementById('user-details');

// Функция для получения данных с API
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
  
}

// Функция для отображения пользователей на странице
function renderUsers(users) {
  const tableRows = users.map(user => `
    <tr data-user-id="\${user.id}">
      <td>\${user.id}</td>
      <td>\${user.name}</td>
      <td>\${user.email}</td>
    </tr>
  `).join('');
  usersTable.querySelector('tbody').innerHTML = tableRows;
}

// Функция для получения подробной информации о пользователе
async function getUserDetails(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/\${userId}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(error);
  }
}

// Функция для отображения подробной информации о пользователе на странице
function renderUserDetails(user) {
  userDetails.innerHTML = `
    <article>
      <h2>\${user.name}</h2>
      <p>Email: \${user.email}</p>
      <p>Телефон: \${user.phone}</p>
      <p>Адрес: \${user.address.street}, \${user.address.suite}, \${user.address.city}</p>
    </article>
  `;
}

// Обработчик клика на строке таблицы с пользователем
usersTable.addEventListener('click', async event => {
  const row = event.target.closest('tr');
  if (row && row.dataset.userId) {
    const userId = row.dataset.userId;
    const user = await getUserDetails(userId);
    renderUserDetails(user);
  }
});

// Отображение пользователей при загрузке страницы
getUsers().then(renderUsers);
