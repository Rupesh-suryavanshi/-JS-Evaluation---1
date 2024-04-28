document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    let currentFilterBy = '';
    let currentFilterValue = '';
    let currentSort = '';
    let currentOrder = '';
  
    
    const departmentSelect = document.getElementById('department');
    const genderSelect = document.getElementById('gender');
    const sortSelect = document.getElementById('sort');
    const prevButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const employeeData = document.getElementById('employeedata');
  
    //I did fetch employee details from here (10 employees/pages)
    function fetchEmployees() {
      let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10?page=${currentPage}&limit=10`;
  
      if (currentFilterBy && currentFilterValue) {
        url += `&filterBy=${currentFilterBy}&filterValue=${currentFilterValue}`;
      }
  
      if (currentSort && currentOrder) {
        url += `&sort=${currentSort}&order=${currentOrder}`;
      }
  




      fetch(url)
        .then(response => response.json())
        .then(responseData => {
          const data = responseData.data;
          if (Array.isArray(data)) {
            const totalPages = responseData.totalPages;
  
          
            employeeData.innerHTML = '';
  
    
            data.forEach((employee, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${(currentPage - 1) * 10 + index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.gender}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
              `;
              employeeData.appendChild(row);
            });
  
      
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
          } else {
            console.error('Error fetching data:', data);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  

    departmentSelect.addEventListener('change', function () {
      currentFilterBy = 'department';
      currentFilterValue = this.value;
      currentPage = 1;
      fetchEmployees();
    });
  


    genderSelect.addEventListener('change', function () {
      currentFilterBy = 'gender';
      currentFilterValue = this.value;
      currentPage = 1;
      fetchEmployees();
    });
  
    sortSelect.addEventListener('change', function () {
      currentSort = 'salary';
      currentOrder = this.value;
      currentPage = 1;
      fetchEmployees();
    });
  

    prevButton.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        fetchEmployees();
      }
    });
  
    nextButton.addEventListener('click', function () {
      currentPage++;
      fetchEmployees();
    });
  

    fetchEmployees();
  });
  