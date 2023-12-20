const table = document.querySelector(".table");
const USERS_API = "https://64340de21c5ed06c958dd2da.mockapi.io/users/";
const formInp = document.querySelectorAll(".form input");
const addBtn = document.querySelector(".form button");

let data = {};
getUsers();
formInp.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const { name, value } = e.target;
    data[name] = value;
  });
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(data);
  if (!!Object.keys(data).length) {
    fetch(USERS_API, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => {
        clearInp();
        getUsers();
        data = {};
      });
  }
});

function getUsers() {
  fetch(USERS_API)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      table.innerHTML = ` <tr>
      <th>ФИО</th>
      <th>Возраст</th>
      <th>Работа</th>
      <th>Опыт работы</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>`;
      displayTable(data);
    });
}

function displayTable(data) {
  data.map((user) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdJob = document.createElement("td");
    const tdExperience = document.createElement("td");
    const tdDelete = document.createElement("td");
    const tdEdit = document.createElement("td");
    const input = document.createElement("input");
    tdName.textContent = user.name;
    tdAge.textContent = user.age;
    tdJob.textContent = user.job;
    tdExperience.textContent = user.experience;
    tdDelete.textContent = "Delete";
    tdDelete.addEventListener("click", () => deleteUser(user.id));
    let isEdit = false;
    tdEdit.textContent = "Edit";
    tdEdit.addEventListener("click", () => {
      isEdit = !isEdit;
      if (isEdit) {
        tdEdit.textContent = "Save";
        tdEdit.style.background = "skyblue";

        const inpName = document.createElement("input");
        inpName.defaultValue = user.name;
        tdName.textContent = "";
        inpName.style.background = "none";
        inpName.style.border = "none";
        tdName.append(inpName);

        const inpAge = document.createElement("input");
        inpAge.defaultValue = user.age;
        tdAge.textContent = "";
        inpAge.style.background = "none";
        inpAge.style.border = "none";
        tdAge.append(inpAge);

        const inpExp = document.createElement("input");
        inpExp.defaultValue = user.experience;
        tdExperience.textContent = "";
        inpExp.style.background = "none";
        inpExp.style.border = "none";
        tdExperience.append(inpExp);

        const inpJob = document.createElement("input");
        inpJob.defaultValue = user.job;
        tdJob.textContent = "";
        inpJob.style.background = "none";
        inpJob.style.border = "none";
        tdJob.append(inpJob);

        tdEdit.addEventListener("click", () => {
          const newUserData = {
            name: inpName.value,
            age: inpAge.value,
            experience: inpExp.value,
            job: inpJob.value,
          };

          editUser(user.id, newUserData);
        });
      }
    });
    tdEdit.style.color = "#fff";
    tdEdit.style.background = "#98D8AA";
    tdEdit.style.cursor = "pointer";
    tdEdit.style.color = "#fff";
    tdDelete.style.color = "#fff";
    tdDelete.style.background = "#BE3144";
    tdDelete.style.cursor = "pointer";
    tr.append(tdName);
    tr.append(tdAge);
    tr.append(tdJob);
    tr.append(tdExperience);
    tr.append(tdDelete);
    tr.append(tdEdit);
    table.append(tr);
  });
}

function deleteUser(id) {
  fetch(USERS_API + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      getUsers();
    });
}
function editUser(id, newUserData) {
  fetch(USERS_API + id, {
    method: "PUT",
    body: JSON.stringify(newUserData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      getUsers(data);
    });
}
function clearInp() {
  formInp.forEach((input) => {
    input.value = "";
  });
}
