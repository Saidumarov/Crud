let marrid = document.getElementById("isMarried");
let salary = document.getElementById("salary");
let adresSlect = document.getElementById("adresSlect");
let positions = document.getElementById("positions");
let job = document.getElementById("job");
let last = document.getElementById("last");
let first = document.getElementById("first");
let date = document.getElementById("date");
let save = document.getElementById("save");
let result = document.getElementById("result");
let marrid1 = document.getElementById("isMarried1");
let salary1 = document.getElementById("salary1");
let adresSlect1 = document.getElementById("adresSlect1");
let positions1 = document.getElementById("positions1");
let job1 = document.getElementById("job1");
let last1 = document.getElementById("last1");
let first1 = document.getElementById("first1");
let date1 = document.getElementById("date1");
let editbtn = document.getElementById("edit");
let personID = null;
// add

save.addEventListener("click", () => {
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let obj = {
    id: person.length + 1,
    marrid: marrid.checked,
    salary: salary.value,
    adresSlect: adresSlect.value,
    positions: positions.value,
    job: job.value,
    last: last.value,
    first: first.value,
    date: date.value,
  };
  let arry = [...person, obj];
  localStorage.setItem("person", JSON.stringify(arry));
  fetchData(arry);
});

// get

let person = JSON.parse(localStorage.getItem("person")) || [];

const fetchData = (data) => {
  let ui = "";
  data?.map((el) => {
    return (ui += `
             <tr>
              <th scope="row">${el?.id}</th>
              <td>${el?.first}</td>
              <td>${el?.last}</td>
              <td>${el?.adresSlect}</td>
              <td>${el?.job}</td>
              <td>${el?.positions}</td>
              <td>${el?.salary}$</td>
              <td>${el?.date}</td>
              <td>${el?.marrid ? "Yes" : "No"}</td>
              <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal1" onclick="edit(${
                  el?.id
                })">Edit</button>
                <button type="button" class="btn btn-danger" onclick="delet(${
                  el?.id
                })">Delete</button>
              </td>
            </tr>
            
            `);
  });
  result.innerHTML = ui;
};

fetchData(person);

// dalete

const delet = (id) => {
  if (confirm("Delete employee")) {
    let person = JSON.parse(localStorage.getItem("person")) || [];
    let obj = person?.filter((el) => el?.id !== id);
    localStorage.setItem("person", JSON.stringify(obj));
    fetchData(obj);
  }
};

const edit = (id) => {
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let personEdit = person.find((el) => el?.id === id);
  first1.value = personEdit?.first;
  last1.value = personEdit?.last;
  date1.value = personEdit?.date;
  marrid1.checked = personEdit?.marrid;
  job1.value = personEdit?.job;
  adresSlect1.value = personEdit?.adresSlect;
  salary1.value = personEdit?.salary;
  positions1.value = personEdit?.positions;
  editbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let updateobj = {
      id: personEdit?.id,
      first: first1.value,
      last: last1.value,
      date: date1.value,
      marrid: marrid1.checked,
      job: job1.value,
      adresSlect: adresSlect1.value,
      salary: salary1.value,
      positions: positions1.value,
    };
    let person = JSON.parse(localStorage.getItem("person")) || [];
    let newperson = person?.map((el) => {
      return el?.id === personEdit?.id ? updateobj : el;
    });
    localStorage.setItem("person", JSON.stringify(newperson));
    fetchData(newperson);
  });
};

// job filter

let jobFilter = document.getElementById("jobFilter");

jobFilter.addEventListener("change", (e) => {
  let value = e.target.value;
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let newperson = person?.filter((el) => {
    return value === "all" ? el : el?.job === value;
  });
  fetchData(newperson);
});

// Positions Filter

let PositionsFilter = document.getElementById("positionsfilter");

PositionsFilter.addEventListener("change", (e) => {
  let value = e.target.value;
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let newperson = person?.filter((el) => {
    return value === "all" ? el : el?.positions === value;
  });
  fetchData(newperson);
});

// Positions Filter

let AddressFilter = document.getElementById("addressFilter");

AddressFilter.addEventListener("change", (e) => {
  let value = e.target.value;
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let newperson = person?.filter((el) => {
    return value === "all" ? el : el?.adresSlect === value;
  });
  fetchData(newperson);
});

// Salary Filter

let SalaryFilter = document.getElementById("salaryFilter");

SalaryFilter.addEventListener("change", (e) => {
  let value = e.target.value;
  console.log(value);
  let person = JSON.parse(localStorage.getItem("person")) || [];
  if (value === "hig") {
    person.sort((a, b) => b?.salary - a?.salary);
  } else if (value === "all") {
    person;
  } else {
    person.sort((a, b) => a?.salary - b?.salary);
  }

  fetchData(person);
});

// Search
let search = document.getElementById("search");

search.addEventListener("input", (e) => {
  let value = e.target.value;
  let person = JSON.parse(localStorage.getItem("person")) || [];
  let search = person?.filter((el) => {
    return (
      el?.last?.toLowerCase().includes(value) ||
      el?.first?.toLowerCase().includes(value) ||
      el?.job?.toLowerCase().includes(value)
    );
  });
  fetchData(search);
});
